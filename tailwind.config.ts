/** Fenntartott hely: a jelenlegi UI `app/globals.css` tokenekre épül; a spec szerinti Tailwind integrációhoz. */
const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
export default config;
