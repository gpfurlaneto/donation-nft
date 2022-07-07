/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'],
  theme: { 
    extend: {
      colors: {
        mustard: '#FDC709',
        rose: '#FF8896',
        'wallet-tap': '#AFAFAF',
        'profile-yellow': '#FFC701'
      },
      fontSize: {
        'wallet-tap': 10,
      },
    },
  },
  plugins: [],
}