import { z } from "zod";

export const formSchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return value >= -90 && value <= 90;
  }, "Latitude must be a number between -90 and 90."),
  longitude: z.coerce.number().refine((value) => {
    return value >= -180 && value <= 180;
  }, "Longitude must be a number between -180 and 180."),
  user_id: z.coerce.number().nonnegative("User ID must be a non-negative number."),
  selfie: z.base64().max(1024 * 1024 * 5, "Selfie image must be less than 5MB."), // Base64-encoded image string
});

export type FormSchema = typeof formSchema;
