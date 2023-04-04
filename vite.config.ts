import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port:6170
  },
  plugins: [
    vue(),
     AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '~': path.join(__dirname, './src/assets'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".css",
      ".scss",
    ],
  },
  build: {
    sourcemap: false, //是否构建source map 文件
    minify: "terser", //esnext强制降级为es2019
    terserOptions: {
      compress: {
        drop_console: true, //打包移除console
      },
    },
    //打包文件按照类型分文件夹显示
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name].js",
        entryFileNames: "js/[name].js",
        assetFileNames: "[ext]/[name].[ext]",
        // manualChunks(id) {
        //   //静态资源分拆打包
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },
  },
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: '@import "./src/styles/common.scss";',
      }
    },
  },
})
