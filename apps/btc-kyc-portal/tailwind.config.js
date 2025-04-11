const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'btc-green': {
          light: '#15803d',
          DEFAULT: '#166534',
          dark: '#14532d',
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        "primary": "#16a34a",
        "primary-content": "#ffffff",
        "secondary": "#0f766e",
        "secondary-content": "#ffffff",
        "accent": "#0284c7",
        "accent-content": "#ffffff",
        "neutral": "#1f2937",
        "neutral-content": "#ffffff",
        "base-100": "#ffffff",
        "base-200": "#f9fafb",
        "base-300": "#f3f4f6",
        "base-content": "#1f2937",
      },
      dark: {
        "primary": "#16a34a",
        "primary-content": "#ffffff",
        "secondary": "#0f766e",
        "secondary-content": "#ffffff",
        "accent": "#0284c7",
        "accent-content": "#ffffff",
        "neutral": "#e5e7eb",
        "neutral-content": "#1f2937",
        "base-100": "#1f2937",
        "base-200": "#111827",
        "base-300": "#0f172a",
        "base-content": "#f9fafb",
      }
    }],
    darkTheme: "dark",
  },
};
