import { defineConfig } from 'vite';

export default defineConfig({
    // Base public path when served in production
    base: process.env.NODE_ENV === 'production' ? '/d-dcarl.github.io/' : '/',

    // Configure the server
    server: {
        port: 5173,
        open: true,
    },

    // Configure build options
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        sourcemap: true,
    },

    // CSS preprocessors
    css: {
        preprocessorOptions: {
            scss: {
                // Removed additionalData that was causing circular import
            },
        },
    },
}); 