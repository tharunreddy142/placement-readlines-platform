import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true,
    },
    build: {
        // Reduce noisy CI warnings on larger production bundles.
        chunkSizeWarningLimit: 1000,
    },
})
