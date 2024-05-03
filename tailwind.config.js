const { nextui } = require('@nextui-org/react')

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
  ],
}
