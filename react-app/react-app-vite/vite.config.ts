import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// gzip压缩
import viteCompression from 'vite-plugin-compression';
import vitePluginImp from 'vite-plugin-imp'
import dayjs from 'dayjs';
import pkg from './package.json';

const { version: APP_VERSION } = pkg;
const vars = path.resolve(__dirname, './src/style/var.less');

// https://vitejs.dev/config/
export default (configEnv) => {
    const { mode } = configEnv;
    const env = loadEnv(mode, process.cwd());
    // 增加环境变量
    env.APP_VERSION = APP_VERSION;
    env.APP_BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return defineConfig({
        server: {
            open: true,
            port: 3007,
            host: '0.0.0.0'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        },
        plugins: [
            react(),
            viteCompression(),
            vitePluginImp({
                optimize: true,
                libList: [
                    {
                        libName: 'antd',
                        libDirectory: 'es',
                        style: (name) => `antd/es/${name}/style`
                    }
                ]
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    globalVars: {
                        hack: `true; @import "${vars}"`
                    },
                    modifyVars: {},
                    javascriptEnabled: true
                }
            }
        },
        define: {
            'process.env': JSON.stringify(env)
        },
    })
}
