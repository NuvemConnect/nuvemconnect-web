/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f7fe',
          100: '#e2effc',
          200: '#bfdef8',
          300: '#86c3f3',
          400: '#45a5eb',
          500: '#1d89da',
          600: '#0f67b1',
          700: '#0e5696',
          800: '#104c78',
          900: '#133e67',
          950: '#0d2844'
        },
        neutral: {
          50: '#f5f7f9',
          100: '#e9edf0',
          200: '#d8dfe5',
          300: '#bdc9d3',
          400: '#aab9c5',
          500: '#8698ab',
          600: '#74859c',
          700: '#68768d',
          800: '#586275',
          900: '#49515f',
          950: '#2f333c'
        },
        success: {
          50: '#f3f8ed',
          100: '#e3f0d7',
          200: '#c8e2b4',
          300: '#a8cf87',
          400: '#85bb60',
          500: '#689f43',
          600: '#4a772f',
          700: '#3d612a',
          800: '#354e26',
          900: '#2e4423',
          950: '#16240f'
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fce78b',
          300: '#fbd34e',
          400: '#f9bf26',
          500: '#f4a41a',
          600: '#d87807',
          700: '#b3540a',
          800: '#91410f',
          900: '#773510',
          950: '#451a03'
        },
        error: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc0c0',
          300: '#ff9494',
          400: '#ff5757',
          500: '#ff2323',
          600: '#fa0000',
          700: '#d70000',
          800: '#b10303',
          900: '#920a0a',
          950: '#500000'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif']
      },
      fontSize: {
        title: '32px',
        subtitle: '24px',
        text: '16px',
        subtext: '14px',
        mini: '12px'
      },
      telas: {
        mini: '320px',
        pequeno: '640px',
        medio: '768px',
        largo: '1024px',
        extraLargo: '1280px',
        full: '1536px'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '834px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: []
};
