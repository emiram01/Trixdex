/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(red|green|lime|blue|cyan|yellow|orange|amber|emerald|pink|purple|indigo|slate|stone|)-(400|500)/,
    },
  ],
  future: {
    hoverOnlyWhenSupported: false,
  },
  plugins: [],
}

