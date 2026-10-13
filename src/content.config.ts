import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const poradnik = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/poradnik' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    date: z.coerce.date(),
    service: z.string().optional(), // slug usługi do linku na końcu
  }),
});

export const collections = { poradnik };
