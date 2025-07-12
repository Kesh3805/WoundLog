export type ThemeId =
  | 'gothic-cathedral'
  | 'brooding-castle'
  | 'crimson-court'
  | 'noir-alley'
  | 'astral-fade'
  | 'psych-ward'
  | 'dream-garden'
  | 'digital-temple'
  | 'bone-smoke'
  | 'cassette-heart'
  | 'seance-room'
  | 'neon-scar'
  | 'asylum-mirror'
  | 'silk-static'
  | 'fairy-rot'
  | 'oracle-terminal'
  | 'forest-memory'
  | 'voidpunk'
  | 'candlecore'
  | 'saltwater-psalms'
  | 'floral-scream'
  | 'glass-mind'
  | 'rusting-heaven'
  | 'noir-nightfall'
  | 'pastel-hell'
  | 'cyber-necropolis'
  | 'dustbowl-diary'
  | 'marble-silence'
  | 'nuclear-candyland';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  cta: string;
  colors: { bg: string; accent: string; text: string; [key: string]: string };
  fonts: { header: string; body: string };
  textures?: { bg?: string; overlay?: string };
  icons?: string[];
  animations?: { [key: string]: string };
  sounds?: { [key: string]: string };
  aiStyle?: { promptModifier: string; tone: string };
  microUX?: { [key: string]: string };
  lore?: { rituals?: string[]; easterEggs?: string[] };
  tags: string[];
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'gothic-cathedral': {
    id: 'gothic-cathedral',
    name: 'Gothic Cathedral',
    cta: 'You don’t write in light. You etch yourself into the dark stone of memory.',
    colors: {
      bg: '#0A0A0A',
      accent: '#BB1E1E',
      text: '#E6E6E6',
      heading: '#F9F6F0',
      border: '#333333',
      tagHover: '#1A1A1A',
      lockGlow: '#4C0D0D',
    },
    fonts: {
      header: "var(--font-unifraktur)",
      body: "var(--font-lora)"
    },
    textures: {
      bg: 'stone',
      overlay: 'candle-flicker',
    },
    icons: ['cross', 'quill', 'gargoyle'],
    animations: {
      delete: 'fade-to-ash',
      save: 'wax-stamp',
      ai: 'scroll-reveal',
      section: 'fade-in-dim',
      caret: 'flicker-red',
      buttonHover: 'deep-red-glow',
      lock: 'shimmer-blur',
    },
    sounds: {
      background: '/sounds/cathedral-wind.mp3',
      type: '/sounds/quill.mp3',
      save: '/sounds/stamp.mp3',
      delete: '/sounds/burn.mp3',
      ai: '/sounds/choir.mp3',
    },
    aiStyle: {
      promptModifier: 'solemn and dramatic',
      tone: 'intimate',
    },
    microUX: {
      input: 'parchment-panel',
      button: 'red-glow',
      tag: 'black-chip',
      lock: 'shimmer-seal',
    },
    lore: {
      rituals: [
        'writing by candlelight',
        'sealing entries with wax',
        'burning regrets in the shrine',
      ],
      easterEggs: [
        'find the hidden inscription in the stained glass',
      ],
    },
    tags: ['grief', 'rage', 'confession', 'mourning'],
  },
  'brooding-castle': {
    id: 'brooding-castle',
    name: 'Brooding Castle',
    cta: 'Within these glassy halls, your shadows find a voice. Write, and let the storm pass through you.',
    colors: {
      bg: 'linear-gradient(135deg, #18141a 0%, #0a0a0a 60%, #1a0d13 100%)',
      card: '#18141a',
      border: '#3a1a2c',
      heading: '#f5f3f7',
      accent: '#e0d6e6',
      secondary: '#bfaec9',
      text: '#f5f3f7',
      buttonFrom: '#6b1839',
      buttonVia: '#2c0b0e',
      buttonTo: '#3a1a2c',
      buttonHoverFrom: '#a8325e',
      buttonHoverTo: '#2c0b0e',
    },
    fonts: {
      header: 'Playfair Display, EB Garamond, serif',
      body: 'Inter, DM Sans, Outfit, sans-serif',
    },
    textures: {
      bg: 'castle-stone',
      overlay: 'grain',
    },
    icons: ['moon', 'castle', 'quill'],
    animations: {
      buttonHover: 'purple-glow',
      card: 'fade-in-glass',
      section: 'slide-down',
    },
    sounds: {
      background: '/sounds/castle-wind.mp3',
      type: '/sounds/quill.mp3',
      save: '/sounds/echo.mp3',
    },
    aiStyle: {
      promptModifier: 'brooding and poetic',
      tone: 'reflective',
    },
    microUX: {
      input: 'glass-panel',
      button: 'purple-glow',
      tag: 'castle-chip',
      lock: 'moon-seal',
    },
    lore: {
      rituals: [
        'writing by moonlight in a silent hall',
        'listening to the wind in the towers',
        'sealing secrets in glass',
      ],
      easterEggs: [
        'find the hidden echo in the grain overlay',
      ],
    },
    tags: ['solitude', 'reflection', 'storm', 'healing'],
  },
  'crimson-court': {
    id: 'crimson-court',
    name: 'Crimson Court',
    cta: 'Bleed with elegance. Cry in gold. You are royal in ruin.',
    colors: {
      bg: '#1A0D0D',
      text: '#F5F5F5',
      heading: '#FFD700',
      accent: '#8B0000',
      shadow: '#2E1E1E',
      divider: '#3D2C2C',
    },
    fonts: {
      header: "var(--font-playfair)",
      body: "var(--font-crimson)"
    },
    textures: {
      bg: 'parchment',
      overlay: 'velvet',
    },
    icons: ['crown', 'quill', 'wax-seal'],
    animations: {
      typing: 'ink-blot',
      save: 'wax-seal',
      delete: 'melt-wax',
      ai: 'scroll-slide',
      quote: 'gold-shadow',
    },
    sounds: {
      background: '/sounds/violin.mp3',
      save: '/sounds/wax.mp3',
      burn: '/sounds/ember.mp3',
      ai: '/sounds/harp.mp3',
    },
    aiStyle: {
      promptModifier: 'noble and melancholic',
      tone: 'regal',
    },
    microUX: {
      input: 'gold-quill-cursor',
      button: 'red-glow',
      tag: 'gold-chip',
      lock: 'velvet-seal',
    },
    lore: {
      rituals: [
        'journaling at a candlelit desk in a royal chamber',
        'using a gold quill',
        'sealing entries with wax',
      ],
      easterEggs: [
        'find the hidden message in the royal bulletin',
      ],
    },
    tags: ['betrayal', 'nostalgia', 'glory', 'loneliness'],
  },
  'noir-alley': {
    id: 'noir-alley',
    name: 'Noir Alley',
    cta: 'This city forgets, but you don’t have to.',
    colors: { bg: '#23232b', accent: '#ff4fa3', text: '#e0e0e0', neon: '#ff4fa3', steel: '#6c6c7a' },
    fonts: { header: 'Special Elite', body: 'Special Elite' },
    textures: { bg: 'neon', overlay: 'rain' },
    icons: ['cigarette', 'trench-coat', 'revolver'],
    animations: { typing: 'terminal-flicker', fog: 'hover-fog' },
    sounds: { ambient: 'jazz', fx: 'rain', siren: 'distant' },
    aiStyle: { promptModifier: 'mysterious and dangerous', tone: 'sinister' },
    microUX: {
      input: 'neon-glow',
      button: 'neon-pulse',
      dropdown: 'neon-slide',
    },
    lore: {
      rituals: ['drinking whiskey in dimly lit bars', 'using a revolver for a final shot'],
      easterEggs: ['find the hidden message in the neon signs'],
    },
    tags: ['regret', 'isolation', 'truth', 'addiction'],
  },
  'astral-fade': {
    id: 'astral-fade',
    name: 'Astral Fade',
    cta: 'Let your feelings float between stars.',
    colors: { bg: '#181a2a', accent: '#b8a1e3', text: '#e0e6f8', silver: '#bfc9d1' },
    fonts: { header: 'Orbitron', body: 'Inter' },
    textures: { bg: 'galaxy', overlay: 'particles' },
    icons: ['moon', 'planet', 'constellation'],
    animations: { orbit: 'hover-orbit' },
    sounds: { ambient: 'synth', wind: 'cosmic' },
    aiStyle: { promptModifier: 'ethereal and soothing', tone: 'meditative' },
    microUX: {
      input: 'star-glow',
      button: 'star-pulse',
      dropdown: 'star-slide',
    },
    lore: {
      rituals: ['meditating under the stars', 'writing in a journal by moonlight'],
      easterEggs: ['discover the hidden message in the cosmic patterns'],
    },
    tags: ['numbness', 'awe', 'emptiness', 'vastness'],
  },
  'psych-ward': {
    id: 'psych-ward',
    name: 'Psych Ward',
    cta: 'You are not the illness. But you are the witness.',
    colors: { bg: '#e6f2e6', accent: '#b11226', text: '#222', green: '#a3bfa3', white: '#f8f8f8' },
    fonts: { header: 'Permanent Marker', body: 'IBM Plex Mono' },
    textures: { bg: 'lined-paper', overlay: 'glitch' },
    icons: ['bandage', 'pill', 'warning'],
    animations: { text: 'jitter', flicker: 'occasional' },
    sounds: { ambient: 'beep', fx: 'whisper', heart: 'heartbeat' },
    aiStyle: { promptModifier: 'haunted and paranoid', tone: 'anxious' },
    microUX: {
      input: 'glitch-effect',
      button: 'creaky-button',
      dropdown: 'creaky-slide',
    },
    lore: {
      rituals: ['writing in a locked room', 'using a pen that writes backwards'],
      easterEggs: ['find the hidden message in the patient\'s diary'],
    },
    tags: ['obsession', 'mania', 'hallucination', 'numb'],
  },
  'dream-garden': {
    id: 'dream-garden',
    name: 'Dream Garden',
    cta: 'Grow something from the ache.',
    colors: { bg: '#f8e6f2', accent: '#e6b8c9', text: '#3a3a3a', mint: '#b8e6d1', cream: '#f8f6e6' },
    fonts: { header: 'Dancing Script', body: 'Lora' },
    textures: { bg: 'floral', overlay: 'blur' },
    icons: ['flower', 'butterfly', 'dew'],
    animations: { petal: 'fall', underline: 'grow' },
    sounds: { ambient: 'birdsong', fx: 'wind-chime' },
    aiStyle: { promptModifier: 'peaceful and serene', tone: 'tranquil' },
    microUX: {
      input: 'leaf-glow',
      button: 'leaf-pulse',
      dropdown: 'leaf-slide',
    },
    lore: {
      rituals: ['planting a seed in a dream garden', 'watering a plant with moonlight'],
      easterEggs: ['discover the hidden message in the garden\'s secrets'],
    },
    tags: ['longing', 'recovery', 'softness', 'hope'],
  },
  'digital-temple': {
    id: 'digital-temple',
    name: 'Digital Temple',
    cta: 'Transcribe the soul in source code.',
    colors: { bg: '#0a0a0a', accent: '#00ffb3', text: '#e0e0e0', chrome: '#bfc9d1', jade: '#00ffb3' },
    fonts: { header: 'Orbitron', body: 'JetBrains Mono' },
    textures: { bg: 'neon-grid', overlay: 'scanlines' },
    icons: ['rune', 'ai', 'pillar'],
    animations: { typing: 'terminal', glyph: 'glow' },
    sounds: { ambient: 'synth', fx: 'binaural' },
    aiStyle: { promptModifier: 'intelligent and powerful', tone: 'authoritative' },
    microUX: {
      input: 'matrix-glow',
      button: 'matrix-pulse',
      dropdown: 'matrix-slide',
    },
    lore: {
      rituals: ['programming in a digital temple', 'debugging a complex algorithm'],
      easterEggs: ['find the hidden message in the code'],
    },
    tags: ['disconnection', 'clarity', 'transcendence'],
  },
  'bone-smoke': {
    id: 'bone-smoke',
    name: 'Bone & Smoke',
    cta: 'Even broken words are proof you’re still here.',
    colors: { bg: '#eae6da', accent: '#b11226', text: '#232323', beige: '#eae6da', charcoal: '#232323', rust: '#b11226' },
    fonts: { header: 'Oswald', body: 'JetBrains Mono' },
    textures: { bg: 'concrete', overlay: 'burn' },
    icons: ['scar', 'axe', 'barbed-wire'],
    animations: { char: 'fade', hover: 'glitch' },
    sounds: { ambient: 'wind', fx: 'static', fire: 'crackle' },
    aiStyle: { promptModifier: 'ancient and mysterious', tone: 'arcane' },
    microUX: {
      input: 'smoke-effect',
      button: 'smoke-pulse',
      dropdown: 'smoke-slide',
    },
    lore: {
      rituals: ['burning bones in a bone-smoke ritual', 'using a bone-carved quill'],
      easterEggs: ['discover the hidden message in the ashes'],
    },
    tags: ['survival', 'detachment', 'history', 'collapse'],
  },
  'cassette-heart': {
    id: 'cassette-heart',
    name: 'Cassette Heart',
    cta: 'This entry is sponsored by sadness and eyeliner.',
    colors: { bg: '#e6d6f8', accent: '#ffb8e6', text: '#232323', lavender: '#b8a1e3', pink: '#ffb8e6', black: '#232323' },
    fonts: { header: 'Bungee', body: 'IBM Plex Mono' },
    textures: { bg: 'vhs', overlay: 'pixel' },
    icons: ['heart', 'skull', 'headphones'],
    animations: { zoom: 'slow', float: 'emoji' },
    sounds: { ambient: 'lofi', fx: 'tape-hiss' },
    aiStyle: { promptModifier: 'nostalgic and melancholic', tone: 'melodic' },
    microUX: {
      input: 'vhs-glow',
      button: 'vhs-pulse',
      dropdown: 'vhs-slide',
    },
    lore: {
      rituals: ['playing a vinyl record in a seance room', 'using a cassette tape for a message'],
      easterEggs: ['discover the hidden message in the cassette tape'],
    },
    tags: ['teenage angst', 'nostalgia', 'silence'],
  },
  'seance-room': {
    id: 'seance-room',
    name: 'Séance Room',
    cta: 'The dead don’t speak. They echo.',
    colors: {
      bg: '#0C0C12',
      text: '#EAEAEA',
      accent: '#9B5DE5',
      secondary: '#5D9CEC',
      fog: '#1A1A1A',
      divider: '#30303A',
    },
    fonts: {
      header: "var(--font-cormorant)",
      body: "var(--font-spectral)"
    },
    textures: {
      bg: 'fog',
      overlay: 'candlelight',
    },
    icons: ['candle', 'bell', 'scroll'],
    animations: {
      save: 'candle-flare',
      delete: 'fold-into-fog',
      ai: 'summon-words',
      typing: 'ghostly-glow',
    },
    sounds: {
      background: '/sounds/seance-bg.mp3',
      save: '/sounds/chime.mp3',
      burn: '/sounds/fade.mp3',
      ai: '/sounds/choir.mp3',
      type: '/sounds/whisper.mp3',
    },
    aiStyle: {
      promptModifier: 'haunted and elegant',
      tone: 'spiritual',
    },
    microUX: {
      input: 'mist-trail',
      button: 'spectral-glow',
      tag: 'ghost-chip',
      lock: 'candle-ignite',
    },
    lore: {
      rituals: [
        'journaling by candlelight in a haunted room',
        'summoning memories with a feather pen',
      ],
      easterEggs: [
        'find the echo in the fog overlay',
      ],
    },
    tags: ['haunt', 'spirit', 'echo', 'memory'],
  },
  'neon-scar': {
    id: 'neon-scar',
    name: 'Neon Scar',
    cta: 'Love is a system error. Pain is just electric.',
    colors: {
      bg: '#0F001F',
      text: '#F2F2F2',
      accent: '#FF008C',
      neon: '#00FFFF',
      glitch: '#AA00FF',
      overlay: '#222222',
    },
    fonts: {
      header: "var(--font-orbitron)",
      body: "var(--font-jetbrains)"
    },
    textures: {
      bg: 'scanline',
      overlay: 'glitch-noise',
    },
    icons: ['heart', 'chip', 'monitor'],
    animations: {
      typing: 'neon-cursor-trail',
      save: 'pulse-glow',
      delete: 'glitch-out',
      ai: 'terminal-type',
      button: 'glow-on-hover',
      background: 'scanline-animate',
    },
    sounds: {
      background: '/sounds/analog-loop.mp3',
      save: '/sounds/zap.mp3',
      burn: '/sounds/glitch.mp3',
      ai: '/sounds/ping.mp3',
    },
    aiStyle: {
      promptModifier: 'raw and synthwave',
      tone: 'cyberpunk',
    },
    microUX: {
      input: 'glitch-typewriting',
      button: 'neon-glow',
      tag: 'pixel-chip',
      lock: 'static-encrypt',
    },
    lore: {
      rituals: [
        'writing into the glitching memory of a past you tried to erase',
        'locking entries in encrypted static',
      ],
      easterEggs: [
        'hover to reveal hidden monitor messages',
      ],
    },
    tags: ['pain', 'system', 'electric', 'glitch'],
  },
  'asylum-mirror': {
    id: 'asylum-mirror',
    name: 'Asylum Mirror',
    cta: 'This is not therapy. This is the holding cell.',
    colors: { bg: '#eaeaea', accent: '#b8e6b8', text: '#232323', green: '#a3bfa3', beige: '#eae6da' },
    fonts: { header: 'VT323', body: 'IBM Plex Mono' },
    textures: { bg: 'film-grain', overlay: 'scan' },
    icons: ['padded-wall', 'syringe', 'cracked-glass'],
    animations: { flicker: 'sudden', tilt: 'stress' },
    sounds: { ambient: 'flatline', fx: 'glitch' },
    aiStyle: { promptModifier: 'anxious and paranoid', tone: 'anxious' },
    microUX: {
      input: 'mirror-glow',
      button: 'mirror-pulse',
      dropdown: 'mirror-slide',
    },
    lore: {
      rituals: ['looking into a mirror for a message', 'performing a ritual in a padded cell'],
      easterEggs: ['discover the hidden message in the cracked glass'],
    },
    tags: ['anxiety', 'depersonalization', 'scream'],
  },
  'silk-static': {
    id: 'silk-static',
    name: 'Silk & Static',
    cta: 'Love never ended. It corrupted.',
    colors: { bg: '#f8e6f2', accent: '#e6b8c9', text: '#3a3a3a', rose: '#e6b8c9', ivory: '#f8f6e6', grey: '#bfc9d1', red: '#b11226' },
    fonts: { header: 'Libre Baskerville', body: 'JetBrains Mono' },
    textures: { bg: 'satin', overlay: 'pixel' },
    icons: ['lipstick', 'wire', 'tear'],
    animations: { sway: 'hover', glitch: 'delete' },
    sounds: { ambient: 'opera', fx: 'signal-loss' },
    aiStyle: { promptModifier: 'romantic and passionate', tone: 'passionate' },
    microUX: {
      input: 'silk-glow',
      button: 'silk-pulse',
      dropdown: 'silk-slide',
    },
    lore: {
      rituals: ['writing a love letter in silk', 'using a silk ribbon for a binding'],
      easterEggs: ['discover the hidden message in the silk ribbon'],
    },
    tags: ['romance', 'distortion', 'denial'],
  },
  'fairy-rot': {
    id: 'fairy-rot',
    name: 'Fairy Rot',
    cta: 'Even fairytales rot under silence.',
    colors: { bg: '#e6f8e6', accent: '#b8e6b8', text: '#3a3a3a', pastel: '#e6b8c9', earth: '#bfa14a', orange: '#ffb84d' },
    fonts: { header: 'Marck Script', body: 'Lora' },
    textures: { bg: 'moss', overlay: 'petal' },
    icons: ['mushroom', 'bone', 'wilted-bouquet'],
    animations: { wilt: 'delete' },
    sounds: { ambient: 'harp', fx: 'insect', wood: 'creak' },
    aiStyle: { promptModifier: 'decaying and haunting', tone: 'melancholic' },
    microUX: {
      input: 'moss-glow',
      button: 'moss-pulse',
      dropdown: 'moss-slide',
    },
    lore: {
      rituals: ['writing in a decaying library', 'using a bone-carved quill'],
      easterEggs: ['discover the hidden message in the wilted bouquet'],
    },
    tags: ['decay', 'nostalgia', 'quiet rage'],
  },
  'oracle-terminal': {
    id: 'oracle-terminal',
    name: 'Oracle Terminal',
    cta: 'The machine doesn’t predict. It remembers.',
    colors: { bg: '#18141a', accent: '#b8a1e3', text: '#e0e6f8', indigo: '#4b5974', gold: '#bfa14a', green: '#00ffb3' },
    fonts: { header: 'Share Tech Mono', body: 'Orbitron' },
    textures: { bg: 'glyphs', overlay: 'runes' },
    icons: ['eye', 'pyramid', 'altar'],
    animations: { hex: 'block', prophecy: 'float' },
    sounds: { ambient: 'synth', fx: 'binary' },
    aiStyle: { promptModifier: 'intelligent and powerful', tone: 'authoritative' },
    microUX: {
      input: 'matrix-glow',
      button: 'matrix-pulse',
      dropdown: 'matrix-slide',
    },
    lore: {
      rituals: ['programming in a digital temple', 'debugging a complex algorithm'],
      easterEggs: ['find the hidden message in the code'],
    },
    tags: ['transcendence', 'logic', 'prophecy'],
  },
  'forest-memory': {
    id: 'forest-memory',
    name: 'Forest Memory',
    cta: 'The trees remember what you forgot.',
    colors: {
      bg: '#1B2D2A',
      text: '#E0F2E9',
      accent: '#5E8C61',
      burn: '#7B5E57',
      overlay: '#A3D2CA',
    },
    fonts: {
      header: "var(--font-librebaskerville)",
      body: "var(--font-lora)"
    },
    textures: {
      bg: 'bark',
      overlay: 'leaves',
    },
    icons: ['leaf', 'tree', 'rune'],
    animations: {
      save: 'bark-sink',
      delete: 'leaf-scatter',
      ai: 'carve-in',
      typing: 'leaf-fall',
    },
    sounds: {
      background: '/sounds/forest.mp3',
      save: '/sounds/tree-creak.mp3',
      burn: '/sounds/leaf.mp3',
      ai: '/sounds/rustle.mp3',
      type: '/sounds/wood-scratch.mp3',
    },
    aiStyle: {
      promptModifier: 'tranquil and natural',
      tone: 'gentle',
    },
    microUX: {
      input: 'bark-texture',
      button: 'moss-glow',
      tag: 'leaf-chip',
      lock: 'rune-seal',
    },
    lore: {
      rituals: [
        'carving thoughts into bark',
        'watching leaves scatter secrets',
      ],
      easterEggs: [
        'find the glowing rune in the bark',
      ],
    },
    tags: ['grief', 'healing', 'nature', 'memory'],
  },
  'voidpunk': {
    id: 'voidpunk',
    name: 'Voidpunk',
    cta: 'Break the loop. Write to prove you exist.',
    colors: { bg: '#23232b', accent: '#ff4fa3', text: '#e0e0e0', void: '#6c6c7a', red: '#ff4fa3', grey: '#bfc9d1' },
    fonts: { header: 'Anonymous Pro', body: 'Anonymous Pro' },
    textures: { bg: 'digital-noise', overlay: 'null-grid' },
    icons: ['eye-cross', 'null', 'redacted'],
    animations: { clip: 'load' },
    sounds: { ambient: 'null', fx: 'fractal' },
    aiStyle: { promptModifier: 'derealized and numb', tone: 'apathetic' },
    microUX: {
      input: 'null-glow',
      button: 'null-pulse',
      dropdown: 'null-slide',
    },
    lore: {
      rituals: ['writing in a void', 'performing a ritual with a null-grid'],
      easterEggs: ['discover the hidden message in the null-grid'],
    },
    tags: ['derealization', 'rebellion', 'numbness'],
  },
  'candlecore': {
    id: 'candlecore',
    name: 'Candlecore',
    cta: 'Some wounds heal in candlelight.',
    colors: { bg: '#f8e6d6', accent: '#bfa14a', text: '#3a3a3a', brass: '#bfa14a', brown: '#bfa14a', wax: '#f8f6e6' },
    fonts: { header: 'Merriweather', body: 'Merriweather' },
    textures: { bg: 'wax', overlay: 'tarot' },
    icons: ['tarot', 'tea-cup', 'moon'],
    animations: { candle: 'flicker', spark: 'trail' },
    sounds: { ambient: 'fire', fx: 'wind' },
    aiStyle: { promptModifier: 'intuition and comfort', tone: 'tranquil' },
    microUX: {
      input: 'wax-glow',
      button: 'wax-pulse',
      dropdown: 'wax-slide',
    },
    lore: {
      rituals: ['burning a candle in a candlecore', 'using a tea cup for a message'],
      easterEggs: ['discover the hidden message in the tea cup'],
    },
    tags: ['intuition', 'comfort', 'quiet reflection'],
  },
  'saltwater-psalms': {
    id: 'saltwater-psalms',
    name: 'Saltwater Psalms',
    cta: 'Every memory is a tide. Every word is salt.',
    colors: {
      bg: '#F6FAFB',
      text: '#2B2B2B',
      accent: '#FF6B6B', // coral as accent
      coral: '#FF6B6B',
      blue: '#3A86FF',
      soft: '#F0FBFF',
      border: '#D3DCE6',
    },
    fonts: {
      header: "var(--font-cormorant)",
      body: "var(--font-librefranklin)"
    },
    textures: {
      bg: 'seafoam',
      overlay: 'coast',
    },
    icons: ['shell', 'bottle', 'wave'],
    animations: {
      save: 'wave-roll',
      delete: 'salt-dissolve',
      ai: 'low-tide-type',
      typing: 'ripple-cursor',
    },
    sounds: {
      background: '/sounds/ocean-soft.mp3',
      save: '/sounds/drop-seal.mp3',
      burn: '/sounds/dissolve.mp3',
      ai: '/sounds/sea-echo.mp3',
      type: '/sounds/ink-brush.mp3',
    },
    aiStyle: {
      promptModifier: 'introspective and healing',
      tone: 'mournful',
    },
    microUX: {
      input: 'ripple',
      button: 'coral-glow',
      tag: 'ocean-chip',
      lock: 'coral-seal',
    },
    lore: {
      rituals: [
        'journaling in a sunlit coastal ruin',
        'sealing entries with a coral wax',
      ],
      easterEggs: [
        'find the message in a bottle',
      ],
    },
    tags: ['grief', 'healing', 'ocean', 'memory'],
  },
  'floral-scream': {
    id: 'floral-scream',
    name: 'Floral Scream',
    cta: 'Even roses rot. Even softness hurts.',
    colors: {
      bg: '#FFF4F4',
      text: '#2E2E2E',
      accent: '#D90368',
      pink: '#FF80AB',
      red: '#700023',
      green: '#008F5D',
    },
    fonts: {
      header: "var(--font-dancingscript)",
      body: "var(--font-manrope)"
    },
    textures: {
      bg: 'petal',
      overlay: 'bloom',
    },
    icons: ['rose', 'thorn', 'petal'],
    animations: {
      save: 'flower-collapse',
      delete: 'petal-burst',
      ai: 'petal-type-fall',
      typing: 'petal-fall',
    },
    sounds: {
      background: '/sounds/garden.mp3',
      save: '/sounds/bloom.mp3',
      burn: '/sounds/glass-flower.mp3',
      ai: '/sounds/petal-fall.mp3',
      type: '/sounds/marker.mp3',
    },
    aiStyle: {
      promptModifier: 'explosive and emotional',
      tone: 'chaotic',
    },
    microUX: {
      input: 'petal-shake',
      button: 'magenta-glow',
      tag: 'flower-chip',
      lock: 'thorn-bloom',
    },
    lore: {
      rituals: [
        'journaling in a flower bed that bites',
        'unlocking with a thorned rose',
      ],
      easterEggs: [
        'find the blooming GIF in the Bleed Wall',
      ],
    },
    tags: ['pain', 'beauty', 'explosion', 'emotion'],
  },
  'glass-mind': {
    id: 'glass-mind',
    name: 'Glass Mind',
    cta: 'You are transparent. You are fragile. You reflect everything but hold nothing.',
    colors: {
      bg: '#FAFAFA',
      text: '#1E1E1E',
      tint: '#C4F0F9',
      silver: '#A2A9B0',
      red: '#D72638',
      accent: '#C4F0F9', // Use glass blue tint as accent
    },
    fonts: {
      header: "var(--font-intertight)",
      body: "var(--font-spacegrotesk)"
    },
    textures: {
      bg: 'frosted-glass',
      overlay: 'reflection',
    },
    icons: ['glass', 'prism', 'crack'],
    animations: {
      save: 'glass-slide-in',
      delete: 'crack-shatter',
      ai: 'reflect-type',
      typing: 'glass-shimmer-cursor',
    },
    sounds: {
      background: '/sounds/glass-ambience.mp3',
      save: '/sounds/ping.mp3',
      burn: '/sounds/crack.mp3',
      ai: '/sounds/shimmer.mp3',
      type: '/sounds/tap.mp3',
    },
    aiStyle: {
      promptModifier: 'cold and clear',
      tone: 'analytical',
    },
    microUX: {
      input: 'glass-cursor',
      button: 'blue-glow',
      tag: 'prism-chip',
      lock: 'frosted-fade',
    },
    lore: {
      rituals: [
        'journaling into a glass wall',
        'reflecting on brittle emotion',
      ],
      easterEggs: [
        'find the hidden crack in the glass',
      ],
    },
    tags: ['clarity', 'fragility', 'reflection', 'cold'],
  },
  'rusting-heaven': {
    id: 'rusting-heaven',
    name: 'Rusting Heaven',
    cta: 'This is what happens when paradise breaks down.',
    colors: {
      bg: '#1A1A1A',
      text: '#E6E6E6',
      rust: '#A94438',
      gold: '#D1A954',
      smoke: '#4B4B4B',
      accent: '#A94438', // Use rust as accent
    },
    fonts: {
      header: "var(--font-unifraktur)",
      body: "var(--font-spectralsc)"
    },
    textures: {
      bg: 'stone',
      overlay: 'cracks',
    },
    icons: ['angel', 'chain', 'wing'],
    animations: {
      save: 'gold-ash-drift',
      delete: 'rust-explode',
      ai: 'ancient-type',
      typing: 'rust-flicker',
    },
    sounds: {
      background: '/sounds/cathedral-decay.mp3',
      save: '/sounds/iron-thud.mp3',
      burn: '/sounds/chain-break.mp3',
      ai: '/sounds/choir-static.mp3',
      type: '/sounds/chain-scratch.mp3',
    },
    aiStyle: {
      promptModifier: 'melancholic and industrial',
      tone: 'decayed',
    },
    microUX: {
      input: 'rust-particle',
      button: 'gold-glow',
      tag: 'plaque-chip',
      lock: 'decay-shimmer',
    },
    lore: {
      rituals: [
        'journaling in cathedral ruins',
        'watching rusted angels fall',
      ],
      easterEggs: [
        'find the broken wing in the cracks',
      ],
    },
    tags: ['decay', 'entropy', 'collapse', 'beauty'],
  },
  'noir-nightfall': {
    id: 'noir-nightfall',
    name: 'Noir Nightfall',
    cta: 'Some wounds don’t heal. They hide in the shadows and smoke.',
    colors: {
      bg: '#0F0F0F',
      text: '#ECECEC',
      accent: '#B11226',
      shadow: '#3A3A3A',
      neon: '#00FFE0',
    },
    fonts: {
      header: "var(--font-librebaskerville)",
      body: "var(--font-sourcesans)",
    },
    textures: {
      bg: 'parchment',
      overlay: 'smoke',
    },
    icons: ['typewriter', 'safe', 'neon-sign'],
    animations: {
      save: 'file-slide',
      delete: 'smoke-fade',
      ai: 'neon-flicker',
      typing: 'typewriter-blink',
    },
    sounds: {
      background: '/sounds/noir-rain.mp3',
      save: '/sounds/file-close.mp3',
      burn: '/sounds/lighter-flame.mp3',
      ai: '/sounds/neon-buzz.mp3',
      type: '/sounds/typewriter.mp3',
    },
    aiStyle: {
      promptModifier: 'cinematic and confessional',
      tone: 'noir',
    },
    microUX: {
      input: 'red-cursor',
      button: 'crimson-glow',
      tag: 'case-chip',
      lock: 'neon-keypad',
    },
    lore: {
      rituals: [
        'journaling in a detective’s office',
        'confessing to yourself in the shadows',
      ],
      easterEggs: [
        'find the timestamp overlay in the Bleed Wall',
      ],
    },
    tags: ['regret', 'shadow', 'confession', 'smoke'],
  },
  'pastel-hell': {
    id: 'pastel-hell',
    name: 'Pastel Hell',
    cta: 'It’s cute. It hurts. It smiles while bleeding.',
    colors: {
      bg: '#FFF0F6',
      text: '#333333',
      accent: '#FF008C',
      pink: '#FF008C',
      blue: '#A0F1FF',
      yellow: '#FFFC85',
      burn: '#700058',
    },
    fonts: {
      header: "var(--font-fredoka)",
      body: "var(--font-quicksand)"
    },
    textures: {
      bg: 'cotton',
      overlay: 'glitter',
    },
    icons: ['lollipop', 'sticker', 'diary'],
    animations: {
      save: 'confetti-burst',
      delete: 'glitter-melt',
      ai: 'rainbow-type',
      typing: 'bubble-pop',
    },
    sounds: {
      background: '/sounds/toybox-loop.mp3',
      save: '/sounds/sticker.mp3',
      burn: '/sounds/pop-glitter.mp3',
      ai: '/sounds/musicbox.mp3',
      type: '/sounds/bubble.mp3',
    },
    aiStyle: {
      promptModifier: 'cute and chaotic',
      tone: 'unhinged',
    },
    microUX: {
      input: 'glitter-cursor',
      button: 'hotpink-glow',
      tag: 'candy-chip',
      lock: 'rainbow-lock',
    },
    lore: {
      rituals: [
        'crying into glitter',
        'unlocking with a lollipop spinner',
      ],
      easterEggs: [
        'find the animated sticker edge in the Journal',
      ],
    },
    tags: ['cute', 'pain', 'glitter', 'emotion'],
  },
  'cyber-necropolis': {
    id: 'cyber-necropolis',
    name: 'Cyber Necropolis',
    cta: 'A graveyard in the cloud. The servers never forget.',
    colors: {
      bg: '#0A0E14',
      text: '#E4E4E4',
      magenta: '#FF00C8',
      lime: '#00FFA3',
      plasma: '#3C91E6',
      red: '#FF3C38',
      accent: '#FF00C8', // neon magenta as accent
    },
    fonts: {
      header: "var(--font-orbitron)",
      body: "var(--font-ubuntumono)"
    },
    textures: {
      bg: 'pixel-grid',
      overlay: 'glitch',
    },
    icons: ['chip', 'server', 'datastream'],
    animations: {
      save: 'compress-to-chip',
      delete: 'data-strip-wipe',
      ai: 'neon-type-surge',
      typing: 'glitch-trail',
    },
    sounds: {
      background: '/sounds/data-rumble.mp3',
      save: '/sounds/save-ping.mp3',
      burn: '/sounds/corrupt.mp3',
      ai: '/sounds/synth-echo.mp3',
      type: '/sounds/keyboard-static.mp3',
    },
    aiStyle: {
      promptModifier: 'cyberpunk and decayed',
      tone: 'synthetic',
    },
    microUX: {
      input: 'glitch-border',
      button: 'neon-glow',
      tag: 'data-chip',
      lock: 'holo-lock',
    },
    lore: {
      rituals: [
        'journaling in a memory palace built on broken code',
        'unlocking neon-locked hologram UI',
      ],
      easterEggs: [
        'hover to reveal raw data state in Bleed Wall',
      ],
    },
    tags: ['cyber', 'grief', 'memory', 'glitch'],
  },
  'dustbowl-diary': {
    id: 'dustbowl-diary',
    name: 'Dustbowl Diary',
    cta: 'This is a place where time forgot. And you’re writing just to remember.',
    colors: {
      bg: '#FCF7ED',
      text: '#2D1E12',
      rust: '#A35D29',
      field: '#7E7263',
      amber: '#FFD17C',
      dark: '#1E140A',
      accent: '#A35D29', // rust as accent
    },
    fonts: {
      header: "var(--font-bitter)",
      body: "var(--font-ptserif)"
    },
    textures: {
      bg: 'lined-paper',
      overlay: 'ragged-edge',
    },
    icons: ['notebook', 'lantern', 'crow'],
    animations: {
      save: 'fold-into-journal',
      delete: 'dust-scatter',
      ai: 'handwritten-glow',
      typing: 'pencil-drag',
    },
    sounds: {
      background: '/sounds/wind-howl.mp3',
      save: '/sounds/canvas-snap.mp3',
      burn: '/sounds/dust-crush.mp3',
      ai: '/sounds/lantern-whisper.mp3',
      type: '/sounds/graphite.mp3',
    },
    aiStyle: {
      promptModifier: 'sepia and survival',
      tone: 'nostalgic',
    },
    microUX: {
      input: 'paper-flicker',
      button: 'amber-glow',
      tag: 'scrap-chip',
      lock: 'soil-seal',
    },
    lore: {
      rituals: [
        'writing on a torn-up field notebook',
        'unlocking with animated paper seal',
      ],
      easterEggs: [
        'find the chalk mark in analytics',
      ],
    },
    tags: ['memory', 'survival', 'dust', 'nostalgia'],
  },
  'marble-silence': {
    id: 'marble-silence',
    name: 'Marble Silence',
    cta: 'Grief carved into stone. Beauty without noise.',
    colors: {
      bg: '#F7F7F5',
      text: '#1D1D1D',
      gray: '#AFAFAF',
      gold: '#D4AF37',
      dark: '#3A3A3A',
      accent: '#D4AF37', // gold as accent
    },
    fonts: {
      header: "var(--font-playfair)",
      body: "var(--font-ebgaramond)"
    },
    textures: {
      bg: 'marble',
      overlay: 'vein',
    },
    icons: ['column', 'urn', 'plaque'],
    animations: {
      save: 'marble-etch',
      delete: 'stone-crack',
      ai: 'inscribe-glow',
      typing: 'serif-flicker',
    },
    sounds: {
      background: '/sounds/hall-reverb.mp3',
      save: '/sounds/chisel-click.mp3',
      burn: '/sounds/stone-break.mp3',
      ai: '/sounds/choir-glow.mp3',
      type: '/sounds/stylus.mp3',
    },
    aiStyle: {
      promptModifier: 'elegant and restrained',
      tone: 'serene',
    },
    microUX: {
      input: 'marble-cursor',
      button: 'gold-glow',
      tag: 'plaque-chip',
      lock: 'vault-door',
    },
    lore: {
      rituals: [
        'wandering through a marble mausoleum',
        'inscribing grief into stone',
      ],
      easterEggs: [
        'find the column animation in LockBox',
      ],
    },
    tags: ['grief', 'beauty', 'silence', 'memory'],
  },
  'nuclear-candyland': {
    id: 'nuclear-candyland',
    name: 'Nuclear Candyland',
    cta: 'This is what happens when the world ends... cutely.',
    colors: {
      bg: '#FFFCFD',
      text: '#2E2E2E',
      pink: '#FF00FF',
      green: '#39FF14',
      purple: '#9C27B0',
      yellow: '#FFEA00',
      accent: '#FF00FF', // nuclear pink as accent
    },
    fonts: {
      header: "var(--font-rubikglitch)",
      body: "var(--font-nunito)"
    },
    textures: {
      bg: 'marshmallow',
      overlay: 'vhs',
    },
    icons: ['sticker', 'geiger', 'emoji'],
    animations: {
      save: 'warp-glitch',
      delete: 'confetti-melt',
      ai: 'arcade-type',
      typing: 'neon-flicker',
    },
    sounds: {
      background: '/sounds/vaporwave-loop.mp3',
      save: '/sounds/warp-portal.mp3',
      burn: '/sounds/synth-pop.mp3',
      ai: '/sounds/bit-type.mp3',
      type: '/sounds/bubble-pop.mp3',
    },
    aiStyle: {
      promptModifier: 'vaporwave and hyperpop',
      tone: 'absurd',
    },
    microUX: {
      input: 'sticker-bounce',
      button: 'toxic-glow',
      tag: 'vhs-chip',
      lock: 'geiger-unlock',
    },
    lore: {
      rituals: [
        'writing in a post-apocalyptic sugar world',
        'unlocking with radio static',
      ],
      easterEggs: [
        'find the animated emoji in the Journal',
      ],
    },
    tags: ['apocalypse', 'cute', 'glitch', 'neon'],
  },
}; 