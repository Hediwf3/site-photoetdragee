import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.photoetdragee.fr',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      // /trier/* is an internal gallery-sorting tool — keep it out of search
      filter: (page) => !page.includes('/trier/')
    })
  ]
});
