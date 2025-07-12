"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextStyle from "@tiptap/extension-text-style";
import { createLowlight } from "lowlight";
const lowlight = createLowlight();
import { useEffect, useRef, useState } from "react";
import { useTheme, getContrastColor, isLightColor } from "./ThemeContext";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
function countEmotionalPhrases(text: string) {
  // Simple: count lines/phrases with emotion words
  const EMOTION_WORDS = ["rage", "sad", "hope", "grief", "love", "shame", "joy", "fear", "calm", "nostalgia", "clarity", "pain", "bleed", "heal", "ghost", "lonely", "worth", "spiral", "survive"];
  return text.split(/\n|[.!?]/).filter(phrase => EMOTION_WORDS.some(w => phrase.toLowerCase().includes(w))).length;
}

export default function TiptapEditor({ value, onChange, burning = false, sealed = false, saving = false, forceTextWhite = false }: { value: string; onChange: (v: string) => void; burning?: boolean; sealed?: boolean; saving?: boolean; forceTextWhite?: boolean }) {
  const { theme } = useTheme();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      CodeBlockLowlight.configure({ lowlight }),
      TextStyle,
      Placeholder.configure({
        placeholder: "Let your wounds bleed into words...",
        showOnlyWhenEditable: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (!sealed) onChange(editor.getHTML());
    },
    editable: !sealed && !burning,
    editorProps: {
      attributes: {
        class: `outline-none min-h-[300px] w-full bg-transparent caret-pulse transition-all duration-500`,
        style: `color: ${forceTextWhite ? '#fff' : '#fff'}; font-family: ${theme.fonts.body}; caret-color: ${theme.colors.accent};`,
      },
      handleKeyDown(view, event) {
        if (sealed) return true;
        return false;
      },
    },
  });

  // Autosave every 10s
  useEffect(() => {
    if (!editor) return;
    const interval = setInterval(() => {
      setLastSaved(new Date());
      onChange(editor.getHTML());
    }, 10000);
    return () => clearInterval(interval);
  }, [editor, onChange]);

  // Flickering cursor effect
  useEffect(() => {
    if (!editor) return;
    // Set body font and color for all text
    editor.commands.setMark('textStyle', { fontFamily: theme.fonts.body, color: forceTextWhite ? '#fff' : theme.colors.text });
    // Set header font for headings
    const style = document.createElement("style");
    style.innerHTML = `
      .caret-pulse { caret-color: ${theme.colors.accent}; animation: caret-flicker 1.1s steps(1) infinite; }
      @keyframes caret-flicker { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
        font-family: ${theme.fonts.header} !important;
        color: ${theme.colors.heading} !important;
      }
      .ProseMirror {
        font-family: ${theme.fonts.body} !important;
        color: ${forceTextWhite ? '#fff' : theme.colors.text} !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [theme.colors.accent, theme.colors.text, theme.colors.heading, theme.fonts.body, theme.fonts.header, editor, forceTextWhite]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Word/emotion density
  const plainText = editor?.getText() || "";
  const wordCount = countWords(plainText);
  const emotionCount = countEmotionalPhrases(plainText);

  return (
    <div className="relative w-full">
      <div
        className={`rounded-2xl bg-white/5 dark:bg-black/20 border border-accent/30 shadow-lg p-6 min-h-[300px] font-mono text-lg focus:outline-none ${sealed ? 'lockbox-sealed' : ''}`}
        style={{
          boxShadow: `0 2px 32px 0 ${theme.colors.accent}22`,
          borderColor: theme.colors.accent,
          opacity: burning ? 0.3 : sealed ? 0.7 : 1,
          filter: burning ? 'blur(2px) grayscale(0.7)' : sealed ? 'blur(2px) brightness(0.7)' : undefined,
          background: undefined,
        }}
      >
        <EditorContent editor={editor} />
        {burning && <div className="absolute inset-0 bg-black/60 pointer-events-none animate-burnAsh" />}
        {sealed && <div className="absolute inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-md flex items-center justify-center pointer-events-none"><span className="text-4xl animate-spin">🔒</span></div>}
      </div>
      <div className="flex justify-between items-center mt-2 text-xs opacity-70 font-inter" style={{ color: forceTextWhite ? '#fff' : '#fff' }}>
        <span>{wordCount} words</span>
        <span>{emotionCount} emotional phrases found</span>
        {lastSaved && <span>Autosaved</span>}
      </div>
      <style>{`
        .animate-burnAsh { animation: burnAsh 1.2s linear forwards; }
        @keyframes burnAsh { 0% { opacity: 0; } 40% { opacity: 0.7; } 100% { opacity: 0; } }
      `}</style>
    </div>
  );
} 