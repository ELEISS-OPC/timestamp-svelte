import { z } from "zod";

export const EmployeeSchema = z.object({
  id: z.nonnegative(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email: z.email(),
  role_id: z.number(),
  avatar_url: z.string().nullable(),
  avatar_url_preview: z.string().nullable(),
});

export const schema = z.object({
  id: z.number(),
  user: EmployeeSchema,
  time_in: z.iso.datetime(),
  time_in_latitude: z.number(),
  time_in_longitude: z.number(),
  time_in_selfie: z.string(),
  time_in_selfie_preview: z.string(),
  time_out: z.iso.datetime().nullable(),
  time_out_latitude: z.number().nullable(),
  time_out_longitude: z.number().nullable(),
  time_out_selfie: z.string().nullable(),
  time_out_selfie_preview: z.string().nullable(),
});

export type Schema = z.infer<typeof schema>;
export type EmployeeSchema = z.infer<typeof EmployeeSchema>;
