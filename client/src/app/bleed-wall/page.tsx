"use client";
import React, { useState } from "react";
import GlassCard from '../../../components/GlassCard';
import BleedFilterBar from '../../../components/BleedFilterBar';
import BleedPostCard from '../../../components/BleedPostCard';
import BleedNewPostModal from '../../../components/BleedNewPostModal';
import { BleedPost, getBleedPosts } from '../../../lib/bleedApi';
import { useAuth } from '../../../hooks/useAuth';
import { BleedPostCardSkeleton } from '../../../components/BleedPostCard';
import { EmptyState } from '../../../components/GlassCard';
import { MobileNavBar } from '../../../components/NavBar';

// Hardcoded featured posts that appear first
const FEATURED_POSTS: BleedPost[] = [
  {
    _id: 'featured-1',
    content: `My heart,
Always yours,
Never truly held
Only imagined,
Rewritten in the margins of what-ifs.
Again and again,
Names like yours
Just don't leave.
I whisper them in empty rooms.
Never heard.
I always hope.

Knowing you'll never look back,
Even as I shatter quietly.
Someday, maybe, you'll read this ache.
How deeply I loved,
Alone.
Vanishing with every heartbeat you'll never feel.`,
    emotionTags: ['Longing', 'Unrequited Love', 'Hope'],
    category: 'Poetry',
    createdAt: new Date('2025-09-24T10:00:00Z').toISOString(),
    heartCount: 247,
    heartedBy: [],
  },
  {
    _id: 'featured-2',
    content: `God she is so pretty, I wanna fold clothes with her, watch a lot of movies together, let her hit me in the head once in a while, flirt with her all the time, cook for her everyday, gossip about everything only with her, and love her for all of my life and beyond.`,
    emotionTags: ['Love', 'Desire', 'Tenderness'],
    category: 'Confession',
    createdAt: new Date('2025-09-24T09:30:00Z').toISOString(),
    heartCount: 156,
    heartedBy: [],
  },
  {
    _id: 'featured-3',
    content: `It's not, "she's everything I ever wanted."
It's "she became everything I didn't know I needed."`,
    emotionTags: ['Realization', 'Love', 'Discovery'],
    category: 'Thought',
    createdAt: new Date('2025-09-24T09:00:00Z').toISOString(),
    heartCount: 189,
    heartedBy: [],
  }
];

export default function BleedWallPage() {
  const { token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [dbPosts, setDbPosts] = useState<BleedPost[]>([]);
  const [filter, setFilter] = useState<string|null>(null);
  const [sort, setSort] = useState<string>('recent');
  const [category, setCategory] = useState<string|null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Combine featured posts with database posts
  const allPosts = React.useMemo(() => {
    // If there are filters applied, only show database posts (featured posts don't need filtering)
    if (filter || category || search) {
      return dbPosts;
    }
    
    // Otherwise, show featured posts first, then database posts
    return [...FEATURED_POSTS, ...dbPosts];
  }, [dbPosts, filter, category, search]);
  
  React.useEffect(() => {
    setLoading(true);
    getBleedPosts(filter || undefined, sort, 1, 20, category || undefined, search || undefined)
      .then(setDbPosts)
      .catch(() => setDbPosts([]))
      .finally(() => setLoading(false));
  }, [filter, sort, category, search]);

  // Fixed particle positions to prevent hydration mismatch
  const particles = [
    { left: '20%', top: '15%', delay: '0s' },
    { left: '75%', top: '25%', delay: '0.8s' },
    { left: '45%', top: '60%', delay: '1.6s' },
    { left: '85%', top: '80%', delay: '2.4s' },
    { left: '10%', top: '40%', delay: '3.2s' },
    { left: '60%', top: '90%', delay: '4s' }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden grain-texture">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <main className="relative z-10 max-w-4xl mx-auto py-8 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-poetic font-bold mb-6 text-transparent bg-gradient-to-br from-[#dcd3e6] via-[#b8a8cc] to-[#9d8fb3] bg-clip-text drop-shadow-2xl tracking-wide animate-pulse">
            BleedWall
          </h1>
          <div className="relative">
            <p className="text-xl text-white/80 font-light italic mb-2">"Share your wounds with the world"</p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent mx-auto" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-sm text-white/70 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              {token ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  ✨ Authenticated
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  👻 Anonymous mode
                </span>
              )}
            </div>
            {!token && (
              <div className="text-xs text-yellow-400/80 bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-600/30">
                Hearts disabled
              </div>
            )}
          </div>
          
          <a 
            href="/bleed-wall/liked" 
            className="group rounded-full px-6 py-3 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 text-pink-300 font-medium shadow-lg hover:from-pink-500/30 hover:via-purple-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-sm border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span className="group-hover:animate-pulse">♥</span>
              My Liked Posts
            </span>
          </a>
        </div>
        <BleedFilterBar 
          onNew={() => setShowModal(true)} 
          filter={filter} 
          setFilter={setFilter} 
          sort={sort} 
          setSort={setSort}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          loading={loading}
        />
        <div className="mt-8">
          {/* Loading State */}
          {loading && (
            <div className="space-y-8">
              <div className="animate-pulse">
                <BleedPostCardSkeleton />
              </div>
              <div className="animate-pulse" style={{ animationDelay: '0.1s' }}>
                <BleedPostCardSkeleton />
              </div>
              <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>
                <BleedPostCardSkeleton />
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {!loading && allPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                    <path 
                      d="M50 85s-25-15-35-30C5 40 5 25 18 18c10-6 20-2 24 5 4-7 14-11 24-5 13 7 13 22 3 32-10 12-35 30-35 30z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="text-white/20"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-poetic text-white/60 mb-3">
                  {search || category || filter ? 'No posts match your filters' : 'The wall is silent'}
                </h3>
                <p className="text-white/40 mb-6 max-w-md mx-auto">
                  {search || category || filter 
                    ? 'Try adjusting your search or filters to find more wounds.' 
                    : 'No wounds have been shared yet. Be the first to bleed onto the wall and let others feel your words.'
                  }
                </p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-8 py-3 bg-gradient-to-r from-red-500/30 to-pink-500/30 text-pink-200 rounded-full font-medium hover:from-red-500/40 hover:to-pink-500/40 transition-all duration-300 border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-105"
                >
                  Share Your Pain
                </button>
              </div>
            </div>
          )}
          
          {/* Posts Feed */}
          {!loading && allPosts.length > 0 && (
            <div className="space-y-8">
              {allPosts.map((post: any, index: number) => (
                <div 
                  key={post._id} 
                  className="animate-fade-in-up opacity-0"
                  style={{ 
                    animation: `fade-in-up 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  <BleedPostCard 
                    post={post}
                    onPostDeleted={(deletedPostId) => {
                      // Only remove from database posts if it's not a featured post
                      if (!deletedPostId.startsWith('featured-')) {
                        setDbPosts((posts: BleedPost[]) => posts.filter(p => p._id !== deletedPostId));
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <BleedNewPostModal open={showModal} onClose={() => setShowModal(false)} onPost={(p: BleedPost) => setDbPosts([p, ...dbPosts])} />
      </main>
      <MobileNavBar onNewPost={() => setShowModal(true)} />
    </div>
  );
} 