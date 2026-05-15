import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.pdf'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Ensure small chunks are not inlined as base64 to keep chunks clean
    assetsInlineLimit: 4096,
  },
});
