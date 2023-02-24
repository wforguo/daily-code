/// <reference types="vite/client" />
declare const __DEV__: boolean

interface ImportMetaEnv {
    VITE_CESIUM_BASE_URL: string
}

interface Window {
    CESIUM_BASE_URL: string
}
