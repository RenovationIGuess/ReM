/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#40A9FF',
      danger: '#FF4D4F',
      bgDefault: '#FAFAFA',
      bgPrimary: '#FFFFFF',
      btnDefault: '#E6F7FF',
      btnActive: '#BAE7FF',
      textPrimary: '#096DD9',
      borderDefault: '#D9D9D9',
      backDrop: '#00000040'
    }
  },
  plugins: [],
  important: true
}
