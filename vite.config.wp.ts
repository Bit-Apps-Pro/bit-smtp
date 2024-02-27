/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import path from 'path'
import { type Alias, type UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import * as tsconfig from './tsconfig.json'

export default defineConfig({
  // config
  root: 'frontend/src',
  base: '/',

  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  resolve: { alias: readAliasFromTsConfig() },

  server: {
    cors: true,
    strictPort: true,
    port: 3000,
    hmr: {
      host: 'localhost'
    }
  }
} as UserConfigExport)

function readAliasFromTsConfig(): Alias[] {
  // eslint-disable-next-line prefer-regex-literals
  const pathReplaceRegex = new RegExp(/\/\*$/, '')
  return Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [fromPaths, toPaths]) => {
    const find = fromPaths.replace(pathReplaceRegex, '')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const toPath = toPaths[0].replace(pathReplaceRegex, '')
    const replacement = path.resolve(__dirname, toPath)
    aliases.push({ find, replacement })
    return aliases
  }, [] as Alias[])
}

