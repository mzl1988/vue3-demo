import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'

import { resolve } from 'path'

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      viteCompression(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    // css: {
    //   //* 预编译支持less
    //   preprocessorOptions: {
    //     less: {
    //       additionalData: '@import "./src/styles/variables.less"',
    //     },
    //   },
    // },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,
    server: {
      port: 8080,
      open: true,
      cors: true,
    },
  })
}
