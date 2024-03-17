/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'sky': {
        100:'#e0f2fe',
        200:'#bae6fd',
        300:'#7dd3fc',
        400:'#38bdf8',
        500:'#0ea5e9',
        600:'#0284c7',
        700:'#0369a1',
        800:'#075985',
        900:'#0c4a6e'
      },

      

      'Orange':{
        100:'#ffedd5',
        200:'#fed7aa',
        300:'#fdba74',
        400:'#fb923c',
        500:'#f97316',
        600:'#ea580c',
        700:'#c2410c',
        800:'#9a3412',
        900:'#7c2d12'
      }
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('flowbite/plugin')
  ],
}

