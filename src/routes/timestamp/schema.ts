import { z } from "zod";

export const formSchema = z.object({
  latitude: z.number().refine((value) => {
    return value >= -90 && value <= 90;
  }, "Latitude must be a number between -90 and 90."),
  longitude: z.number().refine((value) => {
    return value >= -180 && value <= 180;
  }, "Longitude must be a number between -180 and 180."),
  user_id: z.number().positive(),
  selfie: z.string(), // Base64-encoded image string
});

export type FormSchema = typeof formSchema;
