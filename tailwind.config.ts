import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#00a884',     // Refined teal / emerald accent
          accentHover: '#008f70',
          linear: '#5e6ad2',     // Muted secondary accent
          linearHover: '#4e5ac2'
        },
        // Warm neutral theme backgrounds and elevations
        dark: {
          bg: '#121110',         // Warm charcoal background
          surface: '#1c1b19',    // Warm surface elevation 1
          elevated: '#242220',   // Warm surface elevation 2
          border: 'rgba(230, 223, 213, 0.08)'
        },
        light: {
          bg: '#FCFAF6',         // Warm off-white / ivory
          surface: '#FFFFFF',    // Pure white for primary cards
          elevated: '#F5F1E8',   // Soft warm beige panels
          border: '#E6DFD5'      // Soft warm gray border
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      },
      animation: {
        'grid-pulse': 'grid-pulse 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'spotlight': 'spotlight 2s ease forwards'
      },
      keyframes: {
        'grid-pulse': {
          '0%, 100%': { opacity: '0.08' },
          '50%': { opacity: '0.2' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'spotlight': {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -40%) scale(1)'
          }
        }
      }
    }
  },
  plugins: []
}
