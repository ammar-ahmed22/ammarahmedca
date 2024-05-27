const { nextui } = require('@nextui-org/react')
const svgToDataUri = require('mini-svg-data-uri')
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.875rem', '1.25rem'],
        sm: ['1rem', '1.5rem'],
        base: ['1.125rem', '1.75rem'],
        lg: ['1.25rem', '2rem'],
        xl: ['1.5rem', '2rem'],
        '2xl': ['1.875rem', '2.25rem'],
        '3xl': ['2.25rem', '2.5rem'],
        '4xl': ['3rem', '1'],
        '5xl': ['3.75rem', '1'],
        '6xl': ['4.5rem', '1'],
        '7xl': ['6rem', '1'],
        '8xl': ['8rem', '1'],
        '9xl': ['10rem', '1'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'ammarahmed',
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              50: '#f2ecff',
              100: '#d6caeb',
              200: '#bba7d9',
              300: '#a185c8',
              400: '#8962b6',
              500: '#72499d',
              600: '#55387b',
              700: '#392759',
              800: '#201737',
              900: '#0c0618',
              foreground: '#FFFFFF',
              DEFAULT: '#72499d',
            },
            secondary: {
              50: '#e6eeff',
              100: '#bbcafa',
              200: '#8ea3f1',
              300: '#627be9',
              400: '#3761e2',
              500: '#1e52c9',
              600: '#16499d',
              700: '#0d3b71',
              800: '#052946',
              900: '#00121c',
              foreground: '#000000',
              DEFAULT: '#627be9',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#f8ecff',
              100: '#dfcaeb',
              200: '#c5a7d9',
              300: '#aa85c8',
              400: '#8f62b6',
              500: '#72499d',
              600: '#5e387b',
              700: '#462759',
              800: '#2d1737',
              900: '#150618',
              foreground: '#FFFFFF',
              DEFAULT: '#aa85c8',
            },
            secondary: {
              50: '#e6e9ff',
              100: '#bbc2fa',
              200: '#8e9df1',
              300: '#627be9',
              400: '#374ae2',
              500: '#1e24c9',
              600: '#19169d',
              700: '#140d71',
              800: '#0c0546',
              900: '#05001c',
              foreground: '#000000',
              DEFAULT: '#627be9',
            },
          },
        },
      },
    }),
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-dot-thick': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      )
    },
  ],
}
