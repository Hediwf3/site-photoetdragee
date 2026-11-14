import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// [OPTIM] ARTICLES « CONSEILS ».
// L'ancien site WordPress avait un blog de conseils mariage, perdu à la migration
// de mars 2026 (toutes ses adresses renvoyaient une erreur 404). Les textes
// d'origine sont repris ici : un fichier .md par article dans src/content/conseils/.
// En haut de chaque fichier :
//   title       = le grand titre affiché sur la page
//   metaTitle   = (facultatif) le titre montré dans Google
//   description = le résumé montré dans Google
//   date        = (facultatif) date de première publication
//   oldPath     = (facultatif) l'ancienne adresse WordPress, redirigée dans vercel.json
//   photos      = les photos de l'article. La première sert d'image d'en-tête ;
//                 les suivantes sont réparties entre les parties du texte, ou
//                 placées juste après le titre indiqué dans `after`.
const conseils = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/conseils' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date().optional(),
    oldPath: z.string().optional(),
    photos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      after: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { conseils };
