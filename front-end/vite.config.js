import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { FE_HOST, FE_PORT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: FE_HOST,
    port: FE_PORT,
    strictPort: true,
    open: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
