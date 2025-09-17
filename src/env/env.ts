import { z } from 'zod';

export const envSchema = z.object({
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
