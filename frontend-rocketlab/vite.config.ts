// vite.config.js (ou vite.config.ts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssVitePlugin from '@tailwindcss/vite' // 1. Importe o plugin @tailwindcss/vite

export default defineConfig({
  plugins: [
    react(),
    tailwindcssVitePlugin(), // 2. Adicione o plugin @tailwindcss/vite aqui
  ],
  // 3. REMOVA toda a seção 'css: { postcss: { ... } }' que você tinha antes
})