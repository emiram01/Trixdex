/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', 'Segoe UI Symbol', '"Noto Color Emoji"'],
      },
      fontWeight: {
        medium: 600,
        semibold: 700,
        bold: 800,
        extrabold: 900,
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(red|green|lime|blue|cyan|yellow|orange|amber|emerald|pink|purple|indigo|slate|stone|)-(400|500)/,
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

