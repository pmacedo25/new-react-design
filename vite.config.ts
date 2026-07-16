import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      config: '/src/config',
      hooks: '/src/hooks',
      models: '/src/models',
      pages: '/src/pages',
      routes: '/src/routes',
      services: '/src/services',
      stores: '/src/stores',
      theme: '/src/theme',
      utils: '/src/utils',
    },
  },
})
