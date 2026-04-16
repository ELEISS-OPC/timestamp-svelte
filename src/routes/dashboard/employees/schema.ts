import { z } from "zod";

export const AddEmployeeSchema = z.object({
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  password: z.string().min(8).max(100),
  email: z.email(),
  role_id: z.number().max(2).min(1),
});

export type AddEmployee = typeof AddEmployeeSchema;