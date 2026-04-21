import { z } from "zod";

export const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters long"),
});

export type FormSchema = typeof formSchema;
