/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        listContent: 'calc(100% - 1.5rem)'
      },
      minHeight: {
        listContent: 'calc(100% - 1.5rem)'
      },
      maxHeight: {
        listContent: 'calc(100% - 1.5rem)'
      }
    },
    colors: {
      primary: '#40A9FF',
      danger: '#FF4D4F',
      bgDefault: '#FAFAFA',
      bgPrimary: '#FFFFFF',
      btnDefault: '#E6F7FF',
      btnActive: '#BAE7FF',
      textPrimary: '#096DD9',
      borderDefault: '#D9D9D9',
      backDrop: '#00000040',
      'neutral-3': '#F5F5F5',
      'neutral-4': '#F0F0F0',
      noneSelected: 'rgba(0, 0, 0, 0.55)',
      disabled: 'rgba(0, 0, 0, 0.15)',
      unknow: 'rgba(0, 0, 0, 0.35)'
    }
  },
  plugins: [],
  important: true
}
