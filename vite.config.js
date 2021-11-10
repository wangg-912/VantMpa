import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mpa from 'vite-plugin-mpa'
import { loadEnv } from './build/loadEnv'

import styleImport from 'vite-plugin-style-import';
const { VITE_BASE_URL } = loadEnv();
// https://vitejs.dev/config/
export default (_) => defineConfig({
  base: VITE_BASE_URL,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(__dirname, 'src/styles/variables.less')}";`,
        },
      },
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '192.168.2.44',
    port: 3099,
    /* proxy: {
      '/api': {
        target: 'http://192.168.2.16:8304',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }, */
  },
  build: {
    assetsDir: 'assets',
    manifest: false,
    outDir: 'dist',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_debugger: true,
        drop_console: true,
      },
    },
    brotliSize: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/css/[name].css',
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js'
      }
    }
  },
  plugins: [
    vue(),
    mpa({}),
    /* html({
      inject: {
        injectData: {
          title: VITE_TITLE,
        },
      },
    }), */
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/less`
        },
      ],
    }),],
  optimizeDeps: {
    include: ['vue', 'vuex', 'vant', 'axios']
  },
})
