import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { projects } from './src/data/projects.ts';

const site = 'https://www.photoetdragee.fr';

// Image sitemap entries for each reportage, so Google Images finds the
// gallery photos (most are lazy-loaded) with a caption naming the venue.
const imagesByPage = Object.fromEntries(projects.map((project) => [
  `${site}/projets/${project.slug}/`,
  [project.heroImage, ...project.gallery].filter(Boolean).map((src, i) => ({
    url: new URL(encodeURI(src), site).toString(),
    caption: i === 0 ? project.heroAlt : project.alts[i - 1],
  })),
]));

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      // /trier/* is an internal gallery-sorting tool — keep it out of search
      filter: (page) => !page.includes('/trier/') && !/\/merci\/?$/.test(page),
      serialize: (item) => {
        const img = imagesByPage[item.url];
        return img ? { ...item, img } : item;
      }
    })
  ]
});
