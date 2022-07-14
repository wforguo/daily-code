const path = require('path');
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default (configEnv) => {
    const { command, mode } = configEnv;
    const env = loadEnv(mode, process.cwd());
    const isMock = mode === 'mock';
    const plugins = [vue()];
    if (isMock) {
        plugins.push(viteMockServe({
            // 配置mock位置
            mockPath: "./src/mock",
        }));
    }
    return defineConfig({
        server: {
            open: true,
            port: 30001,
            host: '0.0.0.0'
        },
        resolve: {
            alias: {
                '@/': `${pathSrc}/`,
            },
        },
        define: {
            'process.env': JSON.stringify({
                ...env,
            })
        },
        plugins
    })
};

