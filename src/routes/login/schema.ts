import { z } from 'zod';

export const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export type FormSchema = typeof formSchema;