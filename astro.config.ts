import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import astrowind from './vendor/integration';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname.replace(/\/$/, '') !== '/guides',
    }),
    icon({
      include: {
        tabler: ['*'],
      },
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  markdown: {
    syntaxHighlight: false,
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
