import { defineConfig } from 'vite'

export default defineConfig({
  // base: '/ld57/',  // uncomment for local stuff, e.g. npm run preview
  base: '',           // uncomment for github pages
  publicDir: 'assets',
  build: {
    assetsInlineLimit: 0
  },
})
