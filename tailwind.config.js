/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#D1DDE4',
          100: '#BDD2E3',
          200: '#AACAE2',
          300: '#95C0E0',
          400: '#80B6DF',
          500: '#6DAEDF',
          600: '#59A5DE',
          700: '#459CDC',
          800: '#3192DB',
          900: '#1D89DA',
        },
        neutral: {
          50: '#F3F3F3',
          100: '#CDD0D5',
          200: '#838C9B',
          300: '#6A7686',
          400: '#38475E',
          500: '#091A36',
        },
        tertiary: {
          50: '#F9FAFB',
          100: '#E7EAED',
          200: '#75808B'
        },
        white: {
          50: '#FFFFFF',
          100: '#F9FAFB'
        },
        warning: {
          50: '#FDEDD1',
          100: '#F9D18C',
          200: '#F4A41A'
        },
        error: {
          50: '#FFDDDD',
          100: '#FF5757',
          200: '#FF5757'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        subtext: '14px',
        text: '16px',
        textLarge: '18px',
        subheading: '20px',
        subheadingLarge: '23px',
        subtitle: '28px',
        subtitleLarge: '33px',
        title: '40px',
        titleLarge: '44px'
      }
    },
    screens: {
      'sm': '360px',
      'md': '768px',
      'lg': '834px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: []
};
