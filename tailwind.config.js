/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2F54EB',
        background: '#D5DDFB',
        secondary: '#E8E8E8',
        border: '#BABABA',
        text: '#09112F',
        secondaryText: '#707070',
        green: '#22C55E',
      },
    },
  },
  plugins: [],
};
