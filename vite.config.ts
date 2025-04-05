import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // base: '/ld57/',  // uncomment for local stuff, e.g. npm run preview
  base: '',           // uncomment for github pages
  publicDir: 'assets',
  build: {
    assetsInlineLimit: 0
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets/*',
          dest: ''
        }
      ]
    })
  ]
})
