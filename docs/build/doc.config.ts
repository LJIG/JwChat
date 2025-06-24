import baseConfig from './base.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  base: '/jwchat_doc',
  build: {
    outDir: 'docs',
  },
});
