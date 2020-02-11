const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['rubik', ...defaultTheme.fontFamily.sans],
        serif: ['ibm-plex-serif', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [],
}
