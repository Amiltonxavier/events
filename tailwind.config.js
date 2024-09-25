/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#5A5A66'
      },
      gridTemplateColumns: {
        'custom': '30% 25% 25% 25% 20% 5%'
      },
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
        '50%': { opacity: '0.5%', transform: 'translateY(20px) scale(1)' },
        '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out'
      }
    },
  },
  plugins: [],
}
