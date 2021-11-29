module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      lato: 'lato',
    },
    extend: {
      colors: {
        'spun-pearl': {
          DEFAULT: '#AAABBC',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#EEEFF2',
          300: '#D8D8E0',
          400: '#C1C2CE',
          500: '#AAABBC',
          600: '#8B8CA3',
          700: '#6C6E89',
          800: '#54556A',
          900: '#3B3C4B',
        },
        'ship-cove': {
          DEFAULT: '#6C91C2',
          50: '#EEF2F8',
          100: '#DFE7F2',
          200: '#C3D2E6',
          300: '#A6BCDA',
          400: '#89A7CE',
          500: '#6C91C2',
          600: '#4874AE',
          700: '#385986',
          800: '#273F5E',
          900: '#172537',
        },
        'natural-gray': {
          DEFAULT: '#8B8982',
          50: '#E3E3E1',
          100: '#DAD9D7',
          200: '#C6C5C1',
          300: '#B2B1AC',
          400: '#9F9D97',
          500: '#8B8982',
          600: '#6E6D66',
          700: '#51504B',
          800: '#343330',
          900: '#171715',
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ['focus'],
    },
  },
  plugins: [],
};
