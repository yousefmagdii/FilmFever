/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins, sans-serif',
        madimi: 'Madimi One, sans-serif',
        truculenta: 'Truculenta, sans-serif',
      },
      colors: {
        lgray: '#313131',
        lblue: '#53ACFF',
        bg: '#202020',
        sidebg: '#181818',
        sborder: '#3f3e3e',
        grayfont: '#979797',
        nfRed: '#E50914',
      },
      scale: { 200: '--tw-scale-x:2 --tw-scale-y:2; ' },
    },
  },
  plugins: [],
};
