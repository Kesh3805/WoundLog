"use client";
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { useTheme } from './ThemeContext';

interface BleedFilterBarProps {
  onNew: () => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  sort: string;
  setSort: (sort: string) => void;
  category: string | null;
  setCategory: (category: string | null) => void;
  search: string;
  setSearch: (search: string) => void;
  loading?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📝' },
  { id: 'Poetry', label: 'Poetry', icon: '📜' },
  { id: 'Rant', label: 'Rant', icon: '😤' },
  { id: 'Confession', label: 'Confession', icon: '🤐' },
  { id: 'Story', label: 'Story', icon: '📖' },
  { id: 'Thought', label: 'Thought', icon: '💭' },
  { id: 'Other', label: 'Other', icon: '📌' },
];

const EMOTIONS = ['Guilt', 'Numb', 'Longing', 'Hope', 'Anger', 'Sadness', 'Joy'];

export default function BleedFilterBar({ 
  onNew, 
  filter, 
  setFilter, 
  sort, 
  setSort, 
  category, 
  setCategory, 
  search, 
  setSearch,
  loading = false 
}: BleedFilterBarProps) {
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <GlassCard className="p-4 mb-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 dark:bg-black/30 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            style={{ fontFamily: theme.fonts.body }}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">🔍</span>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent font-inter"
          >
            <span>🔧</span>
            Filters
          </button>
          <button
            onClick={onNew}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-accent text-white font-inter font-semibold disabled:opacity-50"
          >
            {loading ? '...' : 'New Post'}
          </button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Category:</span>
              <select
                value={category || 'all'}
                onChange={(e) => setCategory(e.target.value === 'all' ? null : e.target.value)}
                className="px-3 py-1 rounded-lg bg-white text-black border border-gray-300 text-sm focus:outline-none focus:border-accent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id} style={{ color: '#000', backgroundColor: '#fff' }}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotions */}
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Emotion:</span>
              <select
                value={filter || 'all'}
                onChange={(e) => setFilter(e.target.value === 'all' ? null : e.target.value)}
                className="px-3 py-1 rounded-lg bg-white text-black border border-gray-300 text-sm focus:outline-none focus:border-accent"
              >
                <option value="all" style={{ color: '#000', backgroundColor: '#fff' }}>All Emotions</option>
                {EMOTIONS.map(emotion => (
                  <option key={emotion} value={emotion} style={{ color: '#000', backgroundColor: '#fff' }}>{emotion}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1 rounded-lg bg-white text-black border border-gray-300 text-sm focus:outline-none focus:border-accent"
              >
                <option value="recent" style={{ color: '#000', backgroundColor: '#fff' }}>Recent</option>
                <option value="top" style={{ color: '#000', backgroundColor: '#fff' }}>Most Hearts</option>
              </select>
            </div>
          </div>

          <button
            onClick={onNew}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-accent text-white font-inter font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'New Post'}
          </button>
        </div>

        {/* Mobile Filters (Stacked) */}
        <div className="md:hidden flex flex-col gap-4 pb-24">
          <div>
            <label className="block text-white/60 text-sm mb-1">Category</label>
            <select
              value={category || 'all'}
              onChange={(e) => setCategory(e.target.value === 'all' ? null : e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-300 text-base mb-2"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} style={{ color: '#000', backgroundColor: '#fff' }}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Emotion</label>
            <select
              value={filter || 'all'}
              onChange={(e) => setFilter(e.target.value === 'all' ? null : e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-300 text-base mb-2"
            >
              <option value="all" style={{ color: '#000', backgroundColor: '#fff' }}>All Emotions</option>
              {EMOTIONS.map(emotion => (
                <option key={emotion} value={emotion} style={{ color: '#000', backgroundColor: '#fff' }}>{emotion}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-300 text-base mb-2"
            >
              <option value="recent" style={{ color: '#000', backgroundColor: '#fff' }}>Recent</option>
              <option value="top" style={{ color: '#000', backgroundColor: '#fff' }}>Most Hearts</option>
            </select>
          </div>
          <button
            onClick={onNew}
            disabled={loading}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-accent text-white font-inter font-semibold text-base shadow-lg disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'New Post'}
          </button>
        </div>
      </div>
    </GlassCard>
  );
} 