import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        copyPublicDir: false,
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/scripts/js-sampler.ts'),
            formats: ['es', 'umd', 'cjs'],
            name: 'jsSampler',
            fileName: (format) => `js-sampler.${format}.js`
        },
    },
})