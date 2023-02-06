import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

export default defineConfig({
    build: {
        copyPublicDir: false,
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/scripts/index.ts'),
            formats: ['es', 'umd', 'cjs'],
            name: 'jsSampler',
            fileName: (format) => `js-sampler.${format}.js`
        },
    },
    plugins: [
        dts({
            outputDir: 'dist/esm',
            insertTypesEntry: true,
        }),
    ],
})