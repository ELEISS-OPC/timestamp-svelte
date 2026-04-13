import { z } from "zod";
import { TimestampStatus } from "$lib/enums";

export const EmployeeSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email: z.string(),
  role_id: z.number(),
  avatar_url: z.string().nullable(),
  avatar_url_preview: z.string().nullable(),
});

export const schema = z.object({
  id: z.number(),
  employee: EmployeeSchema,
  type: z.string(),
  status: z.enum([TimestampStatus.TIMED_IN, TimestampStatus.TIMED_OUT]),
  time_in: z.iso.datetime(),
  time_out: z.iso.datetime().nullable(),
});

export type Schema = z.infer<typeof schema>;
