/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dusk: '#0f0f1a',
        midnight: '#07070f',
        orchid: '#a855f7',
        ember: '#fb7185',
        lagoon: '#22d3ee',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(248,113,113,0.35), transparent 45%), radial-gradient(circle at 30% 20%, rgba(59,130,246,0.25), transparent 40%)',
      },
      boxShadow: {
        neon: '0 20px 60px rgba(34,211,238,0.25)',
        aurora: '0 30px 80px rgba(168,85,247,0.25)',
      },
    },
  },
  plugins: [],
}

