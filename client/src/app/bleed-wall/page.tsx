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

export default function BleedWallPage() {
  const { token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<BleedPost[]>([]);
  const [filter, setFilter] = useState<string|null>(null);
  const [sort, setSort] = useState<string>('recent');
  const [category, setCategory] = useState<string|null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Debug: Log auth status
  console.log('BleedWallPage auth status:', { token: token ? 'present' : 'missing', user });
  
  React.useEffect(() => {
    setLoading(true);
    getBleedPosts(filter || undefined, sort, 1, 20, category || undefined, search || undefined)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [filter, sort, category, search]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* TODO: Grain, radial gradient, parallax */}
      </div>
      <main className="relative z-10 max-w-3xl mx-auto py-12 px-2 md:px-0">
        <h1 className="text-center text-5xl font-poetic font-bold mb-8 text-[#dcd3e6] drop-shadow-lg tracking-wide animate-fade-in">BleedWall</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-white/60">
            {token ? `Logged in as: ${user}` : 'Not logged in - hearts disabled'}
          </div>
          <a href="/bleed-wall/liked" className="rounded-xl px-5 py-2 bg-accent/20 text-accent font-poetic shadow hover:bg-accent/40 transition-all">♥ My Liked Posts</a>
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
        <div className="mt-8 space-y-8">
          {/* Loading State */}
          {loading && (
            <>
              <BleedPostCardSkeleton />
              <BleedPostCardSkeleton />
              <BleedPostCardSkeleton />
            </>
          )}
          
          {/* Posts Feed */}
          {!loading && posts.length === 0 && (
            <GlassCard>
              <EmptyState
                illustration={
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="animate-heart-pulse"
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      animation: 'heart-pulse 1.8s cubic-bezier(.4,0,.2,1) infinite',
                      transformOrigin: '50% 60%'
                    }}
                  >
                    <g transform="translate(2,0)">
                      <path d="M38 68s-18-12.5-26-22C5 39 5 28 14 22c7-5 15-2 18 4 3-6 11-9 18-4 9 6 9 17 2 24-8 9.5-26 22-26 22z" fill="#ea517e" fillOpacity="0.18" stroke="#ea517e" strokeWidth="2"/>
                    </g>
                    <circle cx="40" cy="40" r="38" stroke="#ea517e" strokeOpacity="0.12" strokeWidth="2" />
                  </svg>
                }
                message={search || category || filter ? 'No posts match your filters.' : 'No one has bled on this wall yet. Your story could be the first drop.'}
              />
            </GlassCard>
          )}
          
          {!loading && posts.map((post, index) => (
            <div 
              key={post._id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BleedPostCard 
                post={post} 
                onPostDeleted={(deletedPostId) => {
                  setPosts(posts.filter(p => p._id !== deletedPostId));
                }}
              />
            </div>
          ))}
        </div>
        <BleedNewPostModal open={showModal} onClose={() => setShowModal(false)} onPost={p => setPosts([p, ...posts])} />
      </main>
      <MobileNavBar onNewPost={() => setShowModal(true)} />
    </div>
  );
} 