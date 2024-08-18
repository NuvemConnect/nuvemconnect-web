/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': '#1d89da',
        'baseBlack': '#2f333c',
        'baseWhite': '#f5f7f9',
        'success': '#689f43',
        'warning': '#f4a41a',
        'error': '#d94e5d'
      },
      hovers: {
        'primary': '#1d89da',
        'baseBlack': '#2f333c',
        'baseWhite': '#f5f7f9',
        'success': '#689f43',
        'warning': '#f4a41a',
        'error': '#d94e5d'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'pretendard': ['Pretendard', 'sans-serif']
      },
      fontSize: {
        'titulo': '32px',
        'subtitulo': '24px',
        'texto': '16px',
        'subtexto': '14px',
        'mini': '12px',
      },
      telas: {
        'mini': '320px',
        'pequeno': '640px',
        'medio': '768px',
        'largo': '1024px',
        'extraLargo': '1280px',
        'full': '1536px',
      },

    }
  },
  plugins: []
};

