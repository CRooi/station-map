import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        vue(),
        AutoImport({
            // targets to transform
            include: [
                /\.[tj]sx?$/,
                /\.vue$/,
                /\.vue\?vue/,
                /\.md$/,
            ],

            // global imports to register
            imports: [
                // 插件预设支持导入的api
                'vue',
                'vue-router',
                'pinia'
                // 自定义导入的api
            ],

            // Generate corresponding .eslintrc-auto-import.json file.
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },

            // Filepath to generate corresponding .d.ts file.
            // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
            // Set `false` to disable.
            dts: './auto-imports.d.ts',
        })
    ],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
