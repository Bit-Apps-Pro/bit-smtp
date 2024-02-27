/// <reference types="vite/client" />
import commonjs from '@rollup/plugin-commonjs'
import react from '@vitejs/plugin-react'
import incstr from 'incstr'
import path from 'path'
import csso from 'postcss-csso'
import { Alias, defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'
import * as tsconfig from './tsconfig.json'

const nextId = incstr.idGenerator()
let chunkCount = 0
function hash() {
  return Math.round(Math.random() * (999 - 1) + 1)
}

function PwaConfig() {
  return {
    manifest: {
      name: 'App Name',
      short_name: 'App Name',
      description: 'Description of your app',
      theme_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      scope: '.',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
}

function readAliasFromTsConfig(): Alias[] {
  // eslint-disable-next-line prefer-regex-literals
  const pathReplaceRegex = new RegExp(/\/\*$/, '')
  return Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [fromPaths, toPaths]) => {
    const find = fromPaths.replace(pathReplaceRegex, '')
    // @ts-ignore
    const toPath = toPaths[0].replace(pathReplaceRegex, '')
    const replacement = path.resolve(__dirname, toPath)
    aliases.push({ find, replacement })
    return aliases
  }, [] as Alias[])
}

export default defineConfig(({ mode }): any => {
  const isProd = mode === 'production'
  return {
    root: 'frontend/src',
    base: mode === 'development' ? '/' : '',
    mode: 'development',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        },
        jsxRuntime: 'automatic'
      }),
      commonjs()
      // babel()
      // TODO: PWA not working
      // for PWA resources genarate icon from this link https://realfavicongenerator.net/ and FULL DOCS https://vite-plugin-pwa.netlify.app/
      // VitePWA({
      //   ...PwaConfig(),
      // }),
      // css: {
      //   preprocessorOptions: {
      //     modules:{

      //     }
      //   }
      // }
    ],
    // css: {
    //   modules: {
    //     // root: '.',
    //     generateScopedName: (name) => {
    //       let compressedClassName = nextId()
    //       if (Number.isInteger(Number(compressedClassName[0]))) {
    //         compressedClassName = `_${compressedClassName}`
    //       }
    //       return isProd ? compressedClassName : `${name}_${compressedClassName}`
    //     },
    //   },
    //   postcss: {
    //     // plugins: [csso()]
    //   }
    // },
    resolve: { alias: readAliasFromTsConfig() },

    build: {
      outDir: '../../assets',
      emptyOutDir: true,
      // emit manifest so PHP can find the hashed files
      // manifest: true,

      // target: 'es2015',
      // target: 'es2015',
      minify: false,
      // sourcemap: true,
      // assetsDir: './',
      rollupOptions: {
        input: path.resolve(__dirname, 'frontend/src/main.tsx'),
        output: {
          entryFileNames: 'main.js',
          compact: true,
          validate: true,
          generatedCode: {
            arrowFunctions: true
            // objectShorthand: true
          },
          // chunkFileNames: () => `bf-${hash()}${chunkCount++}.js`
          assetFileNames: (fInfo: { name: string }) => {
            const pathArr = fInfo?.name?.split('/')
            const fileName = pathArr?.[pathArr.length - 1]

            if (fileName === 'main.css') {
              return 'main.css'
            }
            if (fileName === 'logo.svg') {
              return 'logo.svg'
            }

            return `bf-${hash()}-${chunkCount++}.[ext]`
          }
        }
      },
      commonjsOptions: { transformMixedEsModules: true, include: [] }
    },
    test: {
      // globals: true,
      environment: 'jsdom'
      // setupFiles: './src/config/test.setup.ts'
      // since parsing CSS is slow
      // css: true,
    },
    server: {
      origin: 'http://localhost:3000',
      // required to load scripts from custom host
      cors: true,
      // we need a strict port to match on PHP side
      strictPort: true,
      port: 3000,
      hmr: { host: 'localhost' },
      commonjsOptions: { transformMixedEsModules: true }
    }
  }
})
