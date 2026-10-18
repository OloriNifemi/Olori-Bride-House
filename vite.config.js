import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration: React support + Tailwind CSS v4
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Stop Vite from picking up an old PostCSS / Tailwind v3 setup
  // from a parent folder (e.g. "C:\Olori projects").
  // Tailwind v4 is handled entirely by the plugin above.
  css: {
    postcss: {
      plugins: [],
    },
  },
})