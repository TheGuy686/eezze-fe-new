// https://www.tailwindtoolbox.com/guides/adding-fonts-to-tailwind-css
const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xxs: '360px',
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
    colors: {
      primary: '#012840',
      secondary: '#3f88c5',
      info: '#44bba4',
      success: '#27AE60',
      warning: '#E2B93B',
      error: '#EB5757',
      white: '#ffffff',
      blue: {
        1: '#E6F7FF'
      },
      black: {
        1: '#000000',
        2: '#1D1D1D',
        3: '#282828'
      },
      gray: {
        1: '#333333',
        2: '#4F4F4F',
        3: '#828282',
        4: '#BDBDBD',
        5: '#E0E0E0',
      },
    },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   white: colors.white,
    // },
    fontFamily: {
      inter: ['Inter', ...defaultTheme.fontFamily.sans], // => 'font-sans' class
    },
    fontSize: {
      ...defaultTheme.fontSize,
      xs: ['0.625rem', { lineHeight: '1' }], // 10px
      sm: ['0.75rem', { lineHeight: '1rem' }], // 12px
      base: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      lg: ['1rem', { lineHeight: '1.5rem' }], // 16px
    },
  },
  important: true,
}
