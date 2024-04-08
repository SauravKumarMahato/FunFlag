const withMT = require("@material-tailwind/react/utils/withMT");/** @type {import('tailwindcss').Config} */


module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['system-ui', 'ui-sans-serif' ],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {
      backgroundImage: {
        'my-image': 'url(frontend/funflag/src/assets/images/background.jpg)',
      }

    }
  },
  plugins: [],
});