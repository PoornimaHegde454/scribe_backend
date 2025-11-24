export type MediaCard = {
  id: string
  title: string
  logline: string
  badges: string[]
  mood: 'Bliss Pulse' | 'High Voltage' | 'Slow Burn' | 'Neon Noir'
  rating: number
  runtime: string
  image: string
  palette: string
}

export type Spotlight = {
  title: string
  subtitle: string
  synopsis: string
  ctaPrimary: string
  ctaSecondary: string
  still: string
  rating: string
  mood: string
}

export const heroSpotlight: Spotlight = {
  title: 'VORTEX // LUMINANCE',
  subtitle: 'Original Sci-Opera | Streaming in Spatial HDR',
  synopsis:
    'An orchestra of light, memory, and melancholic love — handcrafted by award-winning futurist Mira Solis. Travel between realities accompanied by a bespoke Hans Zimmer x AR Rahman score.',
  ctaPrimary: 'Begin Immersion',
  ctaSecondary: 'Watch Resonance',
  still:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  rating: 'IMAX Enhanced',
  mood: 'Transcendent - Luminous - 8K Dolby Vision',
}

export const curatedRows: Array<{
  id: string
  title: string
  tagline: string
  items: MediaCard[]
}> = [
  {
    id: 'pulse',
    title: 'Pulse of the Universe',
    tagline: 'Mythic sci-fi epics with emotional horsepower',
    items: [
      {
        id: 'pulse-1',
        title: 'Eclipse Sonata',
        logline: 'Two pulse pilots rewind time to save a city carved above the clouds.',
        badges: ['Dolby Atmos', 'Multi-Lingual'],
        mood: 'High Voltage',
        rating: 9.4,
        runtime: '128m',
        image:
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
        palette: 'from-emerald-400/30 to-sky-500/10',
      },
      {
        id: 'pulse-2',
        title: 'Neon Rains',
        logline: 'Detectives decode rain patterns that predict future memories.',
        badges: ['4K HDR', 'Prime Studio'],
        mood: 'Neon Noir',
        rating: 8.8,
        runtime: '118m',
        image:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        palette: 'from-fuchsia-500/30 to-indigo-500/10',
      },
      {
        id: 'pulse-3',
        title: 'Mirage Bloom',
        logline: 'A botanist raises a sentient forest that can dream for humanity.',
        badges: ['IMAX', 'Award Buzz'],
        mood: 'Slow Burn',
        rating: 9.1,
        runtime: '142m',
        image:
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
        palette: 'from-lime-400/30 to-teal-500/10',
      },
      {
        id: 'pulse-4',
        title: 'Starless Tide',
        logline: 'Pirates surf gravity wells to steal constellations.',
        badges: ['Dolby Vision', '3D Audio'],
        mood: 'High Voltage',
        rating: 8.7,
        runtime: '131m',
        image:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        palette: 'from-cyan-400/30 to-blue-600/10',
      },
    ],
  },
  {
    id: 'serenade',
    title: 'Velvet Serenade',
    tagline: 'Hyper-romantic dramas draped in neon noir aesthetics',
    items: [
      {
        id: 'serenade-1',
        title: 'Paper Planets',
        logline: 'Two archivists forge constellations out of lost love letters.',
        badges: ['Spatial Audio', 'Prime Premiere'],
        mood: 'Bliss Pulse',
        rating: 9.2,
        runtime: '112m',
        image:
          'https://images.unsplash.com/photo-1472145246862-b24cf25c0038?auto=format&fit=crop&w=800&q=80',
        palette: 'from-rose-400/30 to-amber-400/10',
      },
      {
        id: 'serenade-2',
        title: 'Ghostly Halos',
        logline: 'A conductor hears the afterlife inside vinyl grooves.',
        badges: ['Sundance Winner', 'Dolby Vision'],
        mood: 'Slow Burn',
        rating: 8.9,
        runtime: '125m',
        image:
          'https://images.unsplash.com/photo-1504203700686-f21e703e7f26?auto=format&fit=crop&w=800&q=80',
        palette: 'from-purple-500/30 to-slate-900/30',
      },
      {
        id: 'serenade-3',
        title: 'Opaline Hearts',
        logline: 'An android choreographer learns what longing tastes like.',
        badges: ['Prime Original', 'IMAX Enhanced'],
        mood: 'Bliss Pulse',
        rating: 9.6,
        runtime: '138m',
        image:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
        palette: 'from-pink-500/30 to-violet-500/10',
      },
      {
        id: 'serenade-4',
        title: 'Arc Light Waltz',
        logline: "Dancers paint auroras across Jupiter's storms.",
        badges: ['4K HDR', 'Live Orchestra'],
        mood: 'Bliss Pulse',
        rating: 8.5,
        runtime: '95m',
        image:
          'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
        palette: 'from-amber-300/30 to-red-500/20',
      },
    ],
  },
]

export const luminousDrops = [
  {
    title: 'Atmos Mission',
    detail: 'Realtime concerts streaming from stratospheric balloons.',
    accent: 'LIVE',
  },
  {
    title: 'Prime Pulse Sync',
    detail: 'Link your watch party with biometrics for adaptive color grading.',
    accent: 'SYNC',
  },
  {
    title: 'Netflix Neon Labs',
    detail: 'Experimental short films arriving every midnight.',
    accent: 'LAB',
  },
]

export const criticGrid = [
  {
    title: 'The Glass Thread',
    quote: '“A hypnotic meditation drenched in ultraviolet emotion.”',
    critic: 'IndieWire',
    score: 96,
  },
  {
    title: 'Chronicles of Dust',
    quote: '“If Denis Villeneuve shot a love letter to Tarkovsky.”',
    critic: 'Empire',
    score: 94,
  },
  {
    title: 'Haunt Frequency',
    quote: '“Horror as an ocean tide — graceful, terrifying, inevitable.”',
    critic: 'Polygon',
    score: 91,
  },
  {
    title: 'Blue Ember Choir',
    quote: '“A space-musical infused with heart and shimmering chaos.”',
    critic: 'Rolling Stone',
    score: 97,
  },
]

export const pulseStats = [
  { label: 'Immersions Tonight', value: '182K', delta: '+18%' },
  { label: 'Live Co-Watch Pods', value: '3,204', delta: '+42%' },
  { label: 'AI Mood Match %', value: '98.1', delta: 'precision' },
]

