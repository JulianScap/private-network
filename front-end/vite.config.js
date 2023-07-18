import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { FE_HOST, FE_PORT, VITE_BACK_END } = process.env;

const backEndUrlPlugin = () => ({
  name: 'back-end-url',
  configureServer: (server) => {
    server.middlewares.use('/backend_uri', (_, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          uri: VITE_BACK_END,
        }),
      );
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [backEndUrlPlugin(), vue()],
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
