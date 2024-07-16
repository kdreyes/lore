/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3e92cc',
        secondary: '#28587B',
        accent: '#FFFFFF',
        background: '#F0F4F8',
        text: '#2E3A59',
        muted: '#9AA5B1',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
