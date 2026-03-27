import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.photoetdragee.fr',
  output: 'static',
  adapter: vercel({
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      formats: ['image/avif', 'image/webp'],
    },
    imageService: true,
  }),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap()]
});