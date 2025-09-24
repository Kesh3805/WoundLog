"use client";
import React, { useState } from "react";
import Link from "next/link";
import BleedPostCard, { BleedPostCardSkeleton } from '../../../../components/BleedPostCard';
import { BleedPost, getLikedPosts } from '../../../../lib/bleedApi';
import { useAuth } from '../../../../hooks/useAuth';

export default function LikedPostsPage() {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState<BleedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'recent' | 'oldest'>('recent');

  // Fetch liked posts on mount and when token changes
  React.useEffect(() => {
    if (!token) return;
    setLoading(true);
    getLikedPosts(token)
      .then(setPosts)
      .catch((err) => {
        console.error('Failed to fetch liked posts:', err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Remove post from UI when unliked
  const handlePostDeleted = (id: string) => {
    setPosts(posts => posts.filter(p => p._id !== id));
  };

  // Sort posts based on filter
  const sortedPosts = React.useMemo(() => {
    const sorted = [...posts];
    switch (filter) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return sorted;
    }
  }, [posts, filter]);

  if (!token) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden grain-texture">
        <div className="absolute inset-0 bg-gradient-radial" />
        <main className="relative z-10 max-w-4xl mx-auto py-8 px-4 md:px-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path 
                  d="M50 85s-25-15-35-30C5 40 5 25 18 18c10-6 20-2 24 5 4-7 14-11 24-5 13 7 13 22 3 32-10 12-35 30-35 30z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-red-400/40"
                />
                <path d="M25 25L75 75M75 25L25 75" stroke="currentColor" strokeWidth="2" className="text-red-400/40"/>
              </svg>
            </div>
            <h2 className="text-3xl font-poetic text-white/70 mb-4">Authentication Required</h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              You need to be logged in to see your liked posts. Your heart's connections are waiting for you.
            </p>
            <Link 
              href="/login" 
              className="px-8 py-3 bg-gradient-to-r from-red-500/30 to-pink-500/30 text-pink-200 rounded-full font-medium hover:from-red-500/40 hover:to-pink-500/40 transition-all duration-300 border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden grain-texture">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: '4s',
            }}
          />
        ))}
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <main className="relative z-10 max-w-4xl mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              href="/bleed-wall"
              className="text-white/60 hover:text-white/90 transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to BleedWall
            </Link>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poetic font-bold mb-4 text-transparent bg-gradient-to-br from-[#f0a5c4] via-[#e87aa0] to-[#d65a7c] bg-clip-text drop-shadow-2xl tracking-wide">
            Your Hearted Wounds
          </h1>
          <p className="text-lg text-white/70 font-light italic mb-4">
            The posts that resonated with your soul
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{posts.length}</div>
              <div className="text-xs text-white/50">Hearts Given</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{user || 'Anonymous'}</div>
              <div className="text-xs text-white/50">Bleeding Heart</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        {posts.length > 0 && (
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/10">
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 font-medium">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { key: 'recent', label: 'Most Recent' },
                  { key: 'oldest', label: 'Oldest First' },
                  { key: 'all', label: 'Original Order' }
                ].map(option => (
                  <button
                    key={option.key}
                    onClick={() => setFilter(option.key as typeof filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filter === option.key
                        ? 'bg-pink-500/30 text-pink-200 border border-pink-500/50'
                        : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80 border border-transparent'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-8">
          {/* Loading State */}
          {loading && (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <BleedPostCardSkeleton />
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                  <path 
                    d="M50 85s-25-15-35-30C5 40 5 25 18 18c10-6 20-2 24 5 4-7 14-11 24-5 13 7 13 22 3 32-10 12-35 30-35 30z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-pink-400/30"
                  />
                  <circle 
                    cx="50" 
                    cy="45" 
                    r="25" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                    className="text-pink-400/20"
                  />
                </svg>
              </div>
              
              <h3 className="text-3xl font-poetic text-white/60 mb-4">No Hearts Given Yet</h3>
              <p className="text-white/40 mb-8 max-w-md mx-auto leading-relaxed">
                You haven't connected with any wounds yet. When a post touches your soul, 
                give it your heart and it will appear here as part of your emotional journey.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/bleed-wall"
                  className="px-8 py-3 bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-200 rounded-full font-medium hover:from-pink-500/40 hover:to-purple-500/40 transition-all duration-300 border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-105"
                >
                  Explore the BleedWall
                </Link>
                <div className="text-sm text-white/40">
                  or
                </div>
                <Link 
                  href="/journal"
                  className="px-6 py-2 text-white/60 hover:text-white/90 border border-white/20 hover:border-white/40 rounded-full transition-all duration-200"
                >
                  Write in Journal
                </Link>
              </div>
            </div>
          )}
          
          {/* Posts Feed */}
          {!loading && sortedPosts.length > 0 && (
            <div className="space-y-8">
              {sortedPosts.map((post: BleedPost, index: number) => (
                <div 
                  key={post._id} 
                  className="animate-fade-in-up opacity-0"
                  style={{ 
                    animation: `fade-in-up 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  <BleedPostCard 
                    post={post}
                    onPostDeleted={handlePostDeleted}
                  />
                </div>
              ))}
              
              {/* End message */}
              <div className="text-center py-8 opacity-60">
                <div className="w-8 h-8 mx-auto mb-3 opacity-50">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <p className="text-sm text-white/40">
                  You've reached the end of your hearted posts
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 