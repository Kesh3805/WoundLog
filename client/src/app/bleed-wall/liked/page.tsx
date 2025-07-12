"use client";
import React, { useState } from "react";
import GlassCard, { EmptyState } from '../../../../components/GlassCard';
import { MobileNavBar } from '../../../../components/NavBar';
import BleedFilterBar from '../../../../components/BleedFilterBar';
import BleedPostCard, { BleedPostCardSkeleton } from '../../../../components/BleedPostCard';
import BleedNewPostModal from '../../../../components/BleedNewPostModal';
import { BleedPost, getLikedPosts } from '../../../../lib/bleedApi';
import { useAuth } from '../../../../hooks/useAuth';

export default function BleedWallPage() {
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<BleedPost[]>([]);
  const [filter, setFilter] = useState<string|null>(null);
  const [sort, setSort] = useState<string>('recent');
  const [category, setCategory] = useState<string|null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Fetch liked posts on mount and when token changes
  React.useEffect(() => {
    if (!token) return;
    setLoading(true);
    getLikedPosts(token).then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  }, [token]);

  // Remove post from UI and refetch liked posts after unliking
  const handlePostDeleted = (id: string) => {
    setPosts(posts => posts.filter(p => p._id !== id));
    if (token) {
      setLoading(true);
      getLikedPosts(token).then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#190a14] via-[#0c0c10] to-black relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* TODO: Grain, radial gradient, parallax */}
      </div>
      <main className="relative z-10 max-w-3xl mx-auto py-12 px-2 md:px-0">
        <h1 className="text-center text-5xl font-poetic font-bold mb-8 text-[#dcd3e6] drop-shadow-lg tracking-wide animate-fade-in">BleedWall</h1>
        <div className="flex justify-end mb-4">
          <a href="/bleed-wall/liked" className="rounded-xl px-5 py-2 bg-accent/20 text-accent font-poetic shadow hover:bg-accent/40 transition-all">♥ My Liked Posts</a>
        </div>
        <BleedFilterBar 
          onNew={() => setShowModal(true)} 
          filter={filter} setFilter={setFilter} 
          sort={sort} setSort={setSort} 
          category={category} setCategory={setCategory}
          search={search} setSearch={setSearch}
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
          {/* Feed placeholder */}
          {!loading && posts.length === 0 ? (
            <GlassCard>
              <EmptyState
                illustration={
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 68s-18-12.5-26-22C7 39 7 28 16 22c7-5 15-2 18 4 3-6 11-9 18-4 9 6 9 17 2 24-8 9.5-26 22-26 22z" fill="#ea517e" fillOpacity="0.18" stroke="#ea517e" strokeWidth="2"/>
                    <circle cx="40" cy="40" r="38" stroke="#ea517e" strokeOpacity="0.12" strokeWidth="2" />
                  </svg>
                }
                message={'You haven’t felt a connection yet. When you do, your favorite wounds will appear here.'}
              />
            </GlassCard>
          ) : (
            !loading && posts.map(post => (
              <BleedPostCard key={post._id} post={post} onPostDeleted={handlePostDeleted} />
            ))
          )}
        </div>
        <BleedNewPostModal open={showModal} onClose={() => setShowModal(false)} onPost={p => setPosts([p, ...posts])} />
      </main>
      <MobileNavBar onNewPost={() => setShowModal(true)} />
    </div>
  );
} 