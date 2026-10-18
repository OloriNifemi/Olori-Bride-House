import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration: React support + Tailwind CSS
export default defineConfig({
  plugins: [react(), tailwindcss()],
})