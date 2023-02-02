import { resolve } from 'path'

export default {
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/scripts/js-sampler.ts'),
            name: 'jssampler',
            fileName: 'js-sampler',
        },
    },
}