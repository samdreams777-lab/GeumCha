/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Seoul Korean Cuisine Color System
        'seoul-black': '#111111',
        'seoul-charcoal': '#1B1B1B',
        'seoul-surface': '#242424',
        'seoul-text': '#F5F2EA',
        'seoul-text-muted': '#B7B3AA',
        'seoul-red': '#8E2525',
        'seoul-gold': '#C69A5B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'sans-vi': ['Be Vietnam Pro', 'Inter', 'system-ui', 'sans-serif'],
        'korean': ['Noto Sans KR', 'sans-serif'],
      },
      fontSize: {
        'mobile-body': ['16px', { lineHeight: '1.6' }],
        'mobile-body-lg': ['18px', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
