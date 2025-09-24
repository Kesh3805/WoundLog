"use client";
import React from "react";
import GlassCard from "./GlassCard";
import { heartBleedPost, unheartBleedPost } from '../lib/bleedApi';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from './ThemeContext';
import { useToast } from './ToastContext';

// Report post function
async function reportBleedPost(id: string, reason: string, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(`http://localhost:4000/bleed/${id}/report`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ reason })
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  
  return res.json();
}

export default function BleedPostCard({ post, onPostDeleted }: { post: any; onPostDeleted?: (postId: string) => void }) {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  
  // Decode token to get userId
  let userId: string | null = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.userId;
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
  }
  
  const [hearted, setHearted] = React.useState(
    Array.isArray(post.heartedBy) && userId ? post.heartedBy.map(String).includes(userId) : false
  );
  const [heartCount, setHeartCount] = React.useState(post.heartCount ?? 0);
  const [loading, setLoading] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportReason, setReportReason] = React.useState('');
  const [reporting, setReporting] = React.useState(false);
  
  // Update state when post prop changes
  React.useEffect(() => {
    setHearted(Array.isArray(post.heartedBy) && userId ? post.heartedBy.map(String).includes(userId) : false);
    setHeartCount(post.heartCount ?? 0);
  }, [post.heartedBy, post.heartCount, userId]);
  
  async function handleHeart() {
    if (loading || !userId) {
      return;
    }
    
    // Check if this is a featured post - handle locally only
    if (post._id.startsWith('featured-')) {
      setHearted(!hearted);
      setHeartCount((prev: number) => hearted ? Math.max(0, prev - 1) : prev + 1);
      showToast(hearted ? 'Post unhearted.' : 'Post hearted!', 'success');
      return;
    }
    
    setLoading(true);
    
    // Store original state for rollback
    const originalHearted = hearted;
    const originalCount = heartCount;
    
    try {
      let updated;
      if (hearted) {
        // Optimistically update UI
        setHearted(false);
        setHeartCount((prev: number) => Math.max(0, prev - 1));
        
        try {
          updated = await unheartBleedPost(post._id, token || undefined);
        } catch (err: any) {
          // If the error is about not having hearted, sync with backend state
          if (err.message.includes('You have not hearted this post')) {
            // Backend says we haven't hearted, so update our local state to match
            setHearted(false);
            setHeartCount(post.heartCount ?? 0);
            showToast('Post was not hearted. State synchronized.', 'success');
            return;
          }
          throw err; // Re-throw other errors
        }
        
        // Update with server response
        setHearted(Array.isArray(updated.heartedBy) && userId ? updated.heartedBy.map(String).includes(userId) : false);
        setHeartCount(updated.heartCount ?? 0);
        
        showToast(
          'Post unhearted.',
          'success',
          'Undo',
          async () => {
            setLoading(true);
            try {
              const rehearted = await heartBleedPost(post._id, token || undefined);
              setHearted(Array.isArray(rehearted.heartedBy) && userId ? rehearted.heartedBy.map(String).includes(userId) : false);
              setHeartCount(rehearted.heartCount ?? 0);
            } finally {
              setLoading(false);
            }
          }
        );
      } else {
        // Optimistically update UI
        setHearted(true);
        setHeartCount((prev: number) => prev + 1);
        
        try {
          updated = await heartBleedPost(post._id, token || undefined);
        } catch (err: any) {
          // If the error is about already having hearted, sync with backend state
          if (err.message.includes('You have already hearted this post')) {
            // Backend says we already hearted, so update our local state to match
            setHearted(true);
            setHeartCount(post.heartCount ?? 0);
            showToast('Post was already hearted. State synchronized.', 'success');
            return;
          }
          throw err; // Re-throw other errors
        }
        
        // Update with server response
        setHearted(Array.isArray(updated.heartedBy) && userId ? updated.heartedBy.map(String).includes(userId) : false);
        setHeartCount(updated.heartCount ?? 0);
      }
    } catch (err: any) {
      // Rollback optimistic updates on error
      setHearted(originalHearted);
      setHeartCount(originalCount);
      
      console.error('Heart error:', err);
      let errorMessage = 'Failed to update heart';
      
      try {
        const errorObj = JSON.parse(err.message);
        errorMessage = errorObj.error || errorMessage;
      } catch {
        errorMessage = err.message || errorMessage;
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleReport() {
    if (reporting) return;
    
    // Prevent reporting of featured posts
    if (post._id.startsWith('featured-')) {
      showToast('Featured posts cannot be reported.', 'error');
      setShowReportModal(false);
      setReportReason('');
      return;
    }
    
    setReporting(true);
    try {
      const result = await reportBleedPost(post._id, reportReason, token || undefined);
      if (result.deleted) {
        onPostDeleted?.(post._id);
      }
      setShowReportModal(false);
      setReportReason('');
      alert(result.message || 'Post reported successfully');
    } catch (err: any) {
      alert(err.message || 'Failed to report post');
    } finally {
      setReporting(false);
    }
  }
  return (
    <GlassCard
      className={`relative group overflow-hidden p-6 rounded-3xl shadow-2xl border-2 transition-all duration-300 hover:scale-[1.025] hover:shadow-accent/30 ${hearted ? 'border-accent bg-accent/10' : 'border-transparent bg-white/10 dark:bg-black/30'}`}
      style={{
        fontFamily: theme.fonts.body,
        boxShadow: hearted ? `0 4px 24px 0 ${theme.colors.accent}33` : undefined,
        borderColor: hearted ? theme.colors.accent : 'transparent',
        background: hearted ? `${theme.colors.accent}22` : undefined,
      }}
    >
      {/* Blurred excerpt overlay for tactile feel */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur group-hover:backdrop-blur-0 group-hover:bg-transparent transition-all duration-300 z-10 pointer-events-none" />
      <div className="relative z-20">
        <div className="flex gap-2 mb-2 flex-wrap items-center">
          {/* Category Badge */}
          {post.category && (
            <span
              className="px-2 py-1 rounded-full text-xs font-inter font-semibold shadow-sm border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                fontFamily: theme.fonts.body,
              }}
            >
              {post.category}
            </span>
          )}
          
          {/* Emotion Tags */}
          {(post.emotionTags || ["Longing"]).map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-inter font-semibold shadow-sm border"
              style={{
                background: `${theme.colors.accent}22`,
                color: theme.colors.accent,
                borderColor: theme.colors.accent,
                fontFamily: theme.fonts.header,
                letterSpacing: 0.5,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="font-poetic text-lg mb-4 relative leading-relaxed cursor-pointer transition-all duration-300 whitespace-pre-line"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            lineHeight: 1.6,
            filter: 'blur(2px)',
            opacity: 0.8,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.filter = 'blur(0px)';
            (e.currentTarget as HTMLElement).style.opacity = '1';
            (e.currentTarget as HTMLElement).style.webkitLineClamp = 'unset';
            (e.currentTarget as HTMLElement).style.maxHeight = 'none';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.filter = 'blur(2px)';
            (e.currentTarget as HTMLElement).style.opacity = '0.8';
            (e.currentTarget as HTMLElement).style.webkitLineClamp = '3';
          }}
          title="Hover to reveal content"
        >
          {post.content || "...a wound shared in shadows..."}
          {/* Subtle gradient fade at bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none transition-opacity duration-300"
            style={{ 
              background: `linear-gradient(to bottom, transparent, ${theme.colors.bg || '#1a1a1a'})`,
              opacity: 0.7
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-full font-poetic font-semibold shadow border transition-all duration-200 text-lg"
              style={{
                color: hearted ? theme.colors.accent : theme.colors.text,
                borderColor: theme.colors.accent,
                background: hearted ? `${theme.colors.accent}22` : 'transparent',
                fontFamily: theme.fonts.header,
                boxShadow: hearted ? `0 2px 12px 0 ${theme.colors.accent}22` : undefined,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onClick={handleHeart}
              disabled={loading || !userId}
              title={hearted ? 'Unheart (remove your heart)' : 'Heart this post'}
            >
              <span className="transition-all duration-200" style={{ fontSize: 22 }}>{hearted ? '❤️' : '🤍'}</span>
              <span className="ml-1 text-base font-inter" style={{ color: theme.colors.accent }}>{heartCount}</span>
              <span className="text-xs ml-2 font-inter opacity-70">I feel this</span>
            </button>
            
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-lg font-inter text-xs shadow border transition-all duration-200 hover:bg-red-500/20"
              style={{
                color: '#ff4444',
                borderColor: '#ff4444',
                background: 'transparent',
                fontFamily: theme.fonts.body,
              }}
              onClick={() => {
                setShowReportModal(true);
              }}
              title="Report this post"
            >
              <span className="text-xs">🚨</span>
            </button>
          </div>
          
          <span className="text-xs text-white/40 font-inter" style={{ fontFamily: theme.fonts.body }}>
            {new Date(post.createdAt || Date.now()).toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Simple Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
          <div className="bg-white/90 rounded-lg p-6 max-w-sm w-full mx-4 border border-gray-300 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Report Post</h3>
            <textarea
              className="w-full p-3 rounded bg-white/80 text-[#1a1a1a] font-inter mb-4 resize-none border border-gray-400 focus:border-red-400 focus:outline-none"
              placeholder="Reason (optional)"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows={2}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                }}
                className="px-3 py-2 rounded font-inter bg-gray-300 text-[#1a1a1a] hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={reporting}
                className="px-3 py-2 rounded font-inter font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {reporting ? '...' : 'Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
} 

// Skeleton loading card for posts
export function BleedPostCardSkeleton() {
  return (
    <div className="relative group overflow-hidden p-6 rounded-3xl shadow-2xl border-2 bg-white/10 dark:bg-black/30 animate-pulse">
      <div className="flex gap-2 mb-2 flex-wrap items-center">
        <div className="w-16 h-6 rounded-full bg-gray-300/30 dark:bg-gray-700/30" />
        <div className="w-20 h-6 rounded-full bg-gray-300/30 dark:bg-gray-700/30" />
      </div>
      <div className="h-8 w-3/4 rounded-lg bg-gray-300/30 dark:bg-gray-700/30 mb-2" />
      <div className="h-4 w-1/2 rounded-lg bg-gray-300/20 dark:bg-gray-700/20 mb-4" />
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-8 rounded-full bg-gray-300/30 dark:bg-gray-700/30" />
          <div className="w-8 h-8 rounded-full bg-gray-300/30 dark:bg-gray-700/30" />
        </div>
        <div className="w-24 h-4 rounded bg-gray-300/20 dark:bg-gray-700/20" />
      </div>
    </div>
  );
} 