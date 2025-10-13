/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ لازم تكون كده علشان السويتش يشتغل
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
