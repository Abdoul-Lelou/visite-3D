import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    watch: {
      usePolling: true, // Recommandé sur Linux pour éviter les erreurs de système de fichiers
    }
  }
})