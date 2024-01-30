/* eslint-disable no-plusplus */
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const hash = () => {
  return getRandomBetween(1, 999)
}

const getPort = () => {
  return getRandomBetween(3000, 10000)
}

const getRandomBetween = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const getVersion = () => {
  let version = "1.0.0"
  if (fs.existsSync('readme.txt')) {
    const readme = fs.readFileSync('readme.txt').toString()
    const regex = /Stable\s+tag:\s+(\d+\.\d+\.?\d?)/
    const match = readme.match(regex)
    version = match ? match[1] : '1.0.0'
  }
  return version
}

const storePort = (mode) => {
  const portFile = path.resolve(__dirname, './port')
  if (mode !== 'development') {
    if (fs.existsSync(portFile)) {
      fs.rmSync(portFile)
    }
    return null
  }
  fs.writeFileSync(portFile, String(port))
}

let chunkCount = 0
const version = getVersion()
const port = getPort()

export default defineConfig(({ mode }) => ({

  plugins: [
    react(),
    storePort(mode)
  ],
  esbuild: {
    drop: mode === 'development' ? [] : ['console', 'debugger'],
  },
  root: 'frontend/src',
  base: mode === 'development' ? '/' : '',
  build: {
    outDir: '../../assets',
    emptyOutDir: true,

    // emit manifest so PHP can find the hashed files
    manifest: true,

    target: 'es2015',
    // minify: 'terser',

    // sourcemap: true,
    rollupOptions: {
      input: {
        'index.jsx': path.resolve(__dirname, 'frontend/src/index.jsx'),
      },
      output:
      {
        entryFileNames: ({ name }) => {
          return `index-${version}.js`
        },
        compact: true,
        validate: true,
        generatedCode: {
          arrowFunctions: true,
          // objectShorthand: true
        },
        chunkFileNames: () => `bs-${hash()}-${chunkCount++}.js`,
        assetFileNames: (fInfo) => {
          const pathArr = fInfo.name.split('/')
          const fileName = pathArr[pathArr.length - 1]
          if (fileName === 'main.css') {
            return `main-${newBuildHash}.css`
          }
          if (fileName === 'logo.svg') {
            return 'logo.svg'
          }

          return `bs-${hash()}-${chunkCount++}.[ext]`
        },
      }
      ,
    },
    commonjsOptions: { transformMixedEsModules: true },
  },

  server: {
    origin: `http://localhost:${port}`,
    // required to load scripts from custom host
    cors: true,
    // we need a strict port to match on PHP side
    strictPort: true,
    port: port,
    hmr: { host: 'localhost' },
    commonjsOptions: { transformMixedEsModules: true },
  },
}))

