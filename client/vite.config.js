import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@apis': '/src/apis',
      '@store': '/src/store',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@contexts': '/src/contexts',
      '@ui': '/@/components/ui',
      '@images': '/public/assets/images',
    },
  },
  base: './',
})
