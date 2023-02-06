import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

export default defineConfig({
    base: '/js-sampler/',
    publicDir: false,
    build: {
        outDir: 'demo',
    },
})