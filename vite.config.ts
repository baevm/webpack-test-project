/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  root: '.',
  publicDir: './public',
  build: {
    outDir: './dist',
  },
  plugins: [react({ include: '**/*.{jsx,tsx}' }), svgr({})],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
