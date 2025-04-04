import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ld57/',
  publicDir: 'assets',
  build: {
    assetsInlineLimit: 0
  },
})
