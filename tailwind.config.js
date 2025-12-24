/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': '250px 1fr',
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto', 
      },
    },
  },
  plugins: [],
}
