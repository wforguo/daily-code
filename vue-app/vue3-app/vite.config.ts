import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
const { name: title } = require('./package.json')

// https://vitejs.dev/config/
export default (configEnv: any) => {
    const { command, mode } = configEnv
    const env = loadEnv(mode, process.cwd())
    const isMock = mode === 'mock'
    const plugins = [vue(), vueJsx()]
    if (isMock) {
        plugins.push(
            viteMockServe({
                // 配置mock位置
                mockPath: './src/mock'
            })
        )
    }
    return defineConfig({
        base: process.env.NODE_ENV === 'production' ? `/${title}` : '/',
        server: {
            open: true,
            port: 30001,
            host: '0.0.0.0'
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', 'axios', 'vue-router', 'element-plus', 'pinia'],
                output: {
                    dir: `../../dist/${title}/`,
                    // format: 'cjs',
                    // entryFileNames: 'main-app.js',
                    manualChunks(id, { getModuleInfo }) {
                        // 打包依赖
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                        const reg = /(.*)\/src\/components\/(.*)/
                        if (reg.test(id)) {
                            // @ts-ignore
                            const importersLen = getModuleInfo(id).importers.length
                            // 被多处引用
                            if (importersLen > 1) {
                                return 'common'
                            }
                        }
                    },
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        },
        define: {
            'process.env': JSON.stringify({
                ...env
            })
        },
        plugins
    })
}
