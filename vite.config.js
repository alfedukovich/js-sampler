import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/scripts/js-sampler.ts'),
            name: 'jssampler',
            fileName: (format) => `js-sampler.${format}.js`
        },
    },
})