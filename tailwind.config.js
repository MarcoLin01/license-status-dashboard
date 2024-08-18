/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      backgroundColor: {
        'custom-dark': '#101827',
      },
      colors: {
        chart: {
          yellow: {
            DEFAULT: 'rgb(255, 205, 86)',
            light: 'rgba(255, 205, 86, 0.5)',
          },
          blue: {
            DEFAULT: 'rgb(54, 162, 235)',
            light: 'rgba(54, 162, 235, 0.5)',
          },
          red: {
            DEFAULT: 'rgb(255, 99, 132)',
            light: 'rgba(255, 99, 132, 0.5)',
          },
          green: {
            DEFAULT: 'rgb(75, 192, 192)',
            light: 'rgba(75, 192, 192, 0.5)',
          },
          gray: {
            DEFAULT: 'rgb(201, 203, 207)',
            light: 'rgba(201, 203, 207, 0.5)',
          },
        },
      },
    },
  },
}
