"use client";
import { useTheme, getContrastColor } from "../../../components/ThemeContext";
import TiptapEditor from "../../../components/TiptapEditor";
import { useState, useEffect, memo, useCallback, useRef } from "react";
import { useToast } from "../../../components/ToastContext";
import CryptoJS from "crypto-js";
import ThemeBackground from "../../../components/ThemeBackground";
import GrainOverlay from "../../../components/GrainOverlay";
import { useAuth } from "../../../hooks/useAuth";
import { getEntries, createEntry, updateEntry, deleteEntry, getGeminiResponse } from "../../../lib/api";
import GlassCard from "../../../components/GlassCard";
import React from "react";

export default function JournalPage() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  
  // Editor state
  const [editorValue, setEditorValue] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [burning, setBurning] = useState(false);
  
  // LockBox state
  const [locked, setLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [showLockInput, setShowLockInput] = useState(false);
  const [encrypted, setEncrypted] = useState<string | null>(null);
  const [unlockInput, setUnlockInput] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Entry management
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [isNewEntry, setIsNewEntry] = useState(true);
  const [entryTitle, setEntryTitle] = useState("");
  const [lastSavedContent, setLastSavedContent] = useState(""); // Track last saved content
  // Mood removed for minimal version
  
  // Auto-save state
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // --- Sidebar Resizing State ---
  const [sidebarWidth, setSidebarWidth] = useState(320); // px, default w-80
  const [resizing, setResizing] = useState(false);
  const initialMouseX = useRef(0);
  const initialWidth = useRef(320);

  // Mouse event handlers for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;
      const delta = e.clientX - initialMouseX.current;
      const newWidth = Math.min(Math.max(initialWidth.current + delta, 220), 500);
      setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      setResizing(false);
      document.body.style.cursor = '';
    };
    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [resizing]);

  // Timeline removed for minimal version

  // Callbacks - must be defined before useEffect to maintain hook order
  const handleSelectEntry = useCallback((entry: any) => {
    console.log('Selecting entry:', entry); // Debug log
    setSelectedEntry(entry);
    setIsNewEntry(false);
    setEntryTitle(entry.title || "");
    // Mood removed for minimal version
    
    if (entry.isEncrypted) {
      setLocked(true);
      setEncrypted(entry.encryptedData);
      setEditorValue("");
      setLastSavedContent(""); // No content saved for encrypted entries
    } else {
      setLocked(false);
      setEncrypted(null);
      // Force update the editor content
      setTimeout(() => {
        setEditorValue(entry.content || "");
        setLastSavedContent(entry.content || ""); // Track the loaded content
      }, 100);
    }
    setAiResponse(null);
  }, []);

  const loadEntries = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getEntries(token);
      console.log('Loaded entries:', data); // Debug log
        if (Array.isArray(data)) setEntries(data);
        else if (data && Array.isArray(data.entries)) setEntries(data.entries);
        else setEntries([]);
    } catch (error) {
      console.error('Failed to load entries:', error);
      setEntries([]);
    }
  }, [token]);

  // Load entries on mount
  useEffect(() => {
    if (!token) return;
    loadEntries();
  }, [token, loadEntries]);

  // Helper function to generate title from content
  const generateTitle = (content: string): string => {
    if (!content.trim()) return 'Untitled Entry';
    
    // Split by lines and find the first non-empty line
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return 'Untitled Entry';
    
    const firstLine = lines[0].trim();
    
    // Remove HTML tags if present
    const cleanLine = firstLine.replace(/<[^>]*>/g, '').trim();
    
    // Limit to 50 characters and add ellipsis if needed
    if (cleanLine.length <= 50) return cleanLine;
    return cleanLine.substring(0, 47) + '...';
  };

  // Helper function to get the final title (manual or auto-generated)
  const getFinalTitle = (content: string): string => {
    // If user provided a manual title, use it
    if (entryTitle.trim()) {
      return entryTitle.trim();
    }
    // Otherwise auto-generate from content
    return generateTitle(content);
  };

  // Auto-save functionality
  useEffect(() => {
    if (!editorValue.trim() || !token || burning) return; // Don't auto-save while burning or if empty
    // Only auto-save if content has actually changed and is not empty
    if (editorValue === lastSavedContent || !editorValue.trim()) return;
    
    const timeout = setTimeout(async () => {
      try {
        setAutoSaveStatus('saving');
        
        const entryData = {
          title: getFinalTitle(editorValue),
          content: editorValue,
          isEncrypted: locked,
          encryptedData: locked && encrypted ? encrypted : undefined,
          emotionTags: [],
          // Mood removed for minimal version
        };
        
        if (isNewEntry) {
          // Create new entry
          const savedEntry = await createEntry(token, entryData);
          setSelectedEntry(savedEntry);
          setIsNewEntry(false);
          setLastSavedContent(editorValue); // Track saved content
        } else if (selectedEntry) {
          // Update existing entry
          await updateEntry(token, selectedEntry._id, entryData);
          setLastSavedContent(editorValue); // Track saved content
        }
        
        setLastSaved(new Date());
        setAutoSaveStatus('saved');
        await loadEntries(); // Refresh the list
      } catch (error) {
        setAutoSaveStatus('error');
        console.error('Auto-save failed:', error);
      }
    }, 10000); // Auto-save after 10 seconds of inactivity (much less frequent)

    return () => clearTimeout(timeout);
  }, [editorValue, token, isNewEntry, selectedEntry, locked, encrypted, loadEntries, burning, getFinalTitle, lastSavedContent, // Mood removed for minimal version
  ]);

  if (!token) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#18141a] via-[#0a0a0a] to-[#1a0d13]">
        <div className="max-w-lg w-full mx-auto p-10 rounded-3xl shadow-2xl bg-[#18141a]/90 dark:bg-[#18141a]/95 backdrop-blur-md border border-[#3a1a2c] flex flex-col items-center gap-6">
          <h1 className="font-poetic text-4xl md:text-5xl text-center mb-2">Sign in to Journal</h1>
          <p className="font-poetic text-lg text-center mb-6 opacity-80">You must be logged in to use your private journal.</p>
          <div className="flex gap-4">
            <a href="/login" className="px-6 py-2 rounded-xl glassy-btn font-inter shadow-lg border border-white/10 bg-white/10 dark:bg-black/30 backdrop-blur-md hover:bg-white/20 hover:dark:bg-black/40 transition text-white">Login</a>
            <a href="/register" className="px-6 py-2 rounded-xl glassy-btn font-inter shadow-lg border border-white/10 bg-white/10 dark:bg-black/30 backdrop-blur-md hover:bg-white/20 hover:dark:bg-black/40 transition text-white">Register</a>
          </div>
        </div>
      </div>
    );
  }

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setEditorValue("");
    setEntryTitle("");
    setIsNewEntry(true);
    setLocked(false);
    setEncrypted(null);
    setAiResponse(null);
    // Mood removed for minimal version
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!token) return;
    
    // Confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this entry? This action cannot be undone.");
    if (!confirmed) return;
    
    try {
      await deleteEntry(token, entryId);
      
      showToast("Entry deleted.", "success");
      await loadEntries(); // Refresh the list
      
      // If we deleted the currently selected entry, clear the editor
      if (selectedEntry?._id === entryId) {
        setSelectedEntry(null);
        setEditorValue("");
        setIsNewEntry(true);
      }
    } catch (error) {
      showToast("Failed to delete entry.", "error");
    }
  };

  const handleLock = () => {
    setShowLockInput(true);
  };

  const confirmLock = () => {
    if (!lockPassword) return;
    const encrypted = CryptoJS.AES.encrypt(editorValue, lockPassword).toString();
    setEncrypted(encrypted);
    setEditorValue("");
    setLocked(true);
    setShowLockInput(false);
    setLockPassword("");
    showToast("Entry locked in your LockBox.", "success");
  };

  const handleUnlock = () => {
    setUnlocking(true);
    setTimeout(() => {
      try {
        const bytes = CryptoJS.AES.decrypt(encrypted!, unlockInput);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error();
        setEditorValue(decrypted);
        setEncrypted(null);
        setLocked(false);
        setUnlockInput("");
        showToast("Unlocked. Your words return from the void.", "success");
      } catch {
        showToast("Incorrect password. The LockBox remains sealed.", "error");
      }
      setUnlocking(false);
    }, 900);
  };

  const handleAI = async () => {
    setAiLoading(true);
    setAiResponse(null);
    try {
      // Compose a poetic prompt based on the current entry
      const prompt = editorValue.trim()
        ? `Reply poetically, as if you are a gentle, wise companion, to this journal entry:\n\n"${editorValue.trim()}"\n\nKeep it brief, beautiful, and comforting.`
        : `Share a poetic, comforting thought for someone journaling about their wounds and healing.`;
      const response = await getGeminiResponse(prompt);
      setAiResponse(response);
    } catch (err) {
      showToast("AI failed to respond. Please try again.", "error");
    } finally {
      setAiLoading(false);
  }
  };

  const handleBurn = async () => {
    setBurning(true);
    
    // If there's a selected entry, delete it from database
    if (selectedEntry && !isNewEntry) {
      try {
        await deleteEntry(token, selectedEntry._id);
        showToast("Entry burned from memory.", "success");
      } catch (error) {
        showToast("Failed to burn entry.", "error");
      }
    }
    
    setTimeout(() => {
      setEditorValue("");
      setEntryTitle("");
      setSelectedEntry(null);
      setIsNewEntry(true);
      setLocked(false);
      setEncrypted(null);
      setBurning(false);
      
      // Refresh the entries list
      loadEntries();
    }, 1200);
  };

  const handleSave = async () => {
    if (!token || !editorValue.trim()) {
      showToast("Nothing to save.", "error");
      return;
    }

    setSaving(true);
    try {
      const entryData = {
        title: getFinalTitle(editorValue),
        content: editorValue,
        isEncrypted: locked,
        encryptedData: locked && encrypted ? encrypted : undefined,
        emotionTags: [],
        // Mood removed for minimal version
      };

      if (selectedEntry && !isNewEntry) {
        await updateEntry(token, selectedEntry._id, entryData);
        setLastSavedContent(editorValue);
        showToast("Entry updated. Your words are preserved.", "success");
      } else {
        const savedEntry = await createEntry(token, entryData);
        setSelectedEntry(savedEntry);
        setIsNewEntry(false);
        setLastSavedContent(editorValue);
        showToast("Entry saved. Your words are safe.", "success");
      }

      await loadEntries();
      setLastSaved(new Date());
      setAutoSaveStatus('saved');
      // After saving, reset to a new entry (close current)
      setSelectedEntry(null);
      setEditorValue("");
      setEntryTitle("");
      setIsNewEntry(true);
      setLocked(false);
      setEncrypted(null);
      setAiResponse && setAiResponse(null); // Defensive: if still present
    } catch (error) {
      showToast("Failed to save entry. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Sort entries by date
  const sortedEntries = [...entries]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 20);

    return (
    <div className="min-h-screen w-full overflow-y-auto" style={{ background: theme.textures?.bg || theme.colors.bg }}>
      <ThemeBackground />
      <GrainOverlay />
      
      <div className="relative z-10 min-h-screen flex">
        <GlassCard
          className="min-h-screen relative flex flex-col bg-white/10 dark:bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto shadow-2xl"
          style={{
            boxShadow: '0 8px 32px 0 #0004',
            borderRadius: '0 2rem 2rem 0',
            width: sidebarWidth,
            minWidth: 220,
            maxWidth: 500,
            transition: resizing ? 'none' : 'width 0.2s cubic-bezier(.4,2,.6,1)',
            userSelect: resizing ? 'none' : 'auto',
          }}
        >
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-2xl font-poetic font-bold mb-2 relative animate-fade-in" style={{ color: theme.colors.accent, fontFamily: theme.fonts.header, letterSpacing: 1 }}>
                Your Entries
                <span className="block w-12 h-1 rounded-full mt-2 mx-auto bg-gradient-to-r from-accent to-transparent animate-underline" style={{ background: `linear-gradient(90deg, ${theme.colors.accent}, transparent)` }}></span>
              </h2>
              <button
                onClick={handleNewEntry}
                className="floating-btn px-6 py-3 rounded-full font-poetic font-semibold shadow-lg border border-accent/30 bg-white/30 dark:bg-black/40 backdrop-blur-md hover:bg-accent/20 hover:scale-105 active:scale-95 transition-all duration-200 mb-4 mt-2 text-accent"
                style={{
                  color: theme.colors.accent,
                  fontFamily: theme.fonts.header,
                  boxShadow: `0 4px 24px 0 ${theme.colors.accent}22`,
                  borderColor: theme.colors.accent
                }}
              >
                <span className="mr-2">＋</span> New Entry
              </button>
            </div>
            <div className="space-y-4">
          {sortedEntries.length === 0 ? (
                <div className="text-center py-8 text-white/60 italic">
                  No entries yet. Start writing your story.
                </div>
              ) : (
                sortedEntries.map((entry, idx) => (
                  <React.Fragment key={entry._id}>
                    <GlassCard
                      className={`p-4 rounded-xl cursor-pointer border-2 flex flex-col gap-1 shadow-md transition-all duration-200 group relative ${
                        selectedEntry?._id === entry._id
                          ? 'border-accent bg-accent/10 scale-105 shadow-accent/30 animate-active-border'
                          : 'border-transparent bg-white/10 hover:bg-accent/10 hover:border-accent/40 group-hover:scale-105 group-hover:shadow-accent/30'
                      }`}
                      style={{
                        fontFamily: theme.fonts.header,
                        boxShadow: selectedEntry?._id === entry._id ? `0 4px 24px 0 ${theme.colors.accent}33` : undefined
                      }}
                      onClick={() => handleSelectEntry(entry)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-poetic font-bold text-lg truncate flex-1" style={{ color: theme.colors.accent }}>
                          {entry.title || 'Untitled Entry'}
                        </h3>
                        {entry.isEncrypted && (
                          <span className="text-lg ml-2" title="Locked">🔒</span>
                        )}
                      </div>
                      <p className="text-xs text-white/60 mb-1 font-inter">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-white/40 line-clamp-2 mb-1 font-inter">
                        {entry.content ? entry.content.replace(/<[^>]*>/g, '').substring(0, 100) : 'No content'}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-white/30 font-inter">
                          {entry.content?.split(' ').length || 0} words
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteEntry(entry._id);
                          }}
                          className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded transition-colors opacity-70 hover:opacity-100"
                          title="Delete entry"
                        >
                          🗑️
                        </button>
                      </div>
                      {/* Animated active border */}
                      {selectedEntry?._id === entry._id && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded bg-gradient-to-b from-accent to-transparent animate-fade-in" style={{ background: `linear-gradient(180deg, ${theme.colors.accent}, transparent)` }}></span>
                      )}
                    </GlassCard>
                    {/* Divider between entries */}
                    {idx < sortedEntries.length - 1 && <div className="w-3/4 mx-auto h-px bg-white/10 my-2" />}
                  </React.Fragment>
                ))
              )}
            </div>
        </GlassCard>
        {/* Resize Handle */}
        <div
          onMouseDown={e => {
            setResizing(true);
            initialMouseX.current = e.clientX;
            initialWidth.current = sidebarWidth;
          }}
          className="group flex items-center cursor-col-resize select-none"
          style={{ width: 16, marginLeft: -8, zIndex: 30, height: '100vh' }}
          aria-label="Resize sidebar"
          tabIndex={0}
          role="separator"
        >
          <div className="mx-auto h-24 w-2 rounded-full bg-accent/60 group-hover:bg-accent transition-all duration-200 shadow-lg" style={{ background: theme.colors.accent, opacity: 0.7 }}></div>
        </div>
        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto bg-gradient-to-br from-white/5 via-black/10 to-black/30 dark:from-black/10 dark:to-black/40 relative">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 
                className="text-5xl font-poetic font-bold mb-4 drop-shadow-lg relative animate-slide-down"
                style={{ color: theme.colors.accent, fontFamily: theme.fonts.header, letterSpacing: 1 }}
              >
                Confront Yourself
                <span className="block w-24 h-1 rounded-full mt-3 mx-auto bg-gradient-to-r from-accent to-transparent animate-underline" style={{ background: `linear-gradient(90deg, ${theme.colors.accent}, transparent)` }}></span>
              </h1>
      </div>
            {/* Title Input */}
            <GlassCard className="mb-6 animate-fade-in-slow">
              <div className="max-w-2xl mx-auto">
                <label className="block text-sm font-medium text-white/80 mb-2 font-inter">
                  Entry Title (optional - will auto-generate if left empty)
                </label>
            <input
                  type="text"
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  placeholder="Enter a title for your entry..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-black/30 border border-accent/50 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-colors font-poetic shadow"
                  style={{ fontFamily: theme.fonts.body }}
                />
                {entryTitle.trim() && (
                  <p className="text-xs text-white/60 mt-1 font-inter">
                    Using manual title: "{entryTitle.trim()}"
                  </p>
                )}
                {!entryTitle.trim() && editorValue.trim() && (
                  <p className="text-xs text-white/60 mt-1 font-inter">
                    Auto-generated title: "{generateTitle(editorValue)}"
                  </p>
                )}
          </div>
            </GlassCard>
            {/* Editor */}
            <GlassCard className="mb-6 animate-fade-in-slow">
              <div className="relative rounded-3xl p-2 md:p-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-accent/60">
                <TiptapEditor 
                  value={editorValue} 
                  onChange={setEditorValue} 
                  burning={burning} 
                  sealed={locked} 
                  saving={saving} 
                  forceTextWhite 
                />
                {/* Floating stats bar */}
                <div className="absolute bottom-2 right-4 bg-black/60 text-white/80 px-4 py-1 rounded-full shadow font-inter text-xs flex items-center gap-4 animate-fade-in-slow" style={{backdropFilter: 'blur(6px)'}}>
                  <span>{editorValue.split(/\s+/).filter(Boolean).length} words</span>
                </div>
          </div>
            </GlassCard>
            {/* Action Buttons */}
            <GlassCard className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-in-slow bg-white/10 dark:bg-black/20">
          <button
                onClick={handleBurn}
                disabled={burning || locked || saving}
                className="px-6 py-3 rounded-xl font-poetic font-semibold shadow-lg border border-accent/30 bg-white/20 dark:bg-black/40 backdrop-blur-md hover:bg-red-600/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                style={{
                  color: '#ff4444',
                  fontFamily: theme.fonts.header,
                  boxShadow: `0 4px 24px 0 #ff444422`,
                  borderColor: '#ff4444'
                }}
              >
                <span>🔥</span> Burn Memory
          </button>
              <button
                onClick={handleSave}
                disabled={locked || burning || saving}
                className="px-6 py-3 rounded-xl font-poetic font-semibold shadow-lg border border-accent/30 bg-white/20 dark:bg-black/40 backdrop-blur-md hover:bg-green-600/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
      style={{
                  color: '#22cc88',
                  fontFamily: theme.fonts.header,
                  boxShadow: `0 4px 24px 0 #22cc8822`,
                  borderColor: '#22cc88'
                }}
              >
                <span>💾</span> Save & Close
              </button>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
} 