import { z } from "zod";
import { EmployeeSchema, TimestampSchema } from "./schemas";

export type Timestamp = z.infer<typeof TimestampSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;

export interface dicebearOptions {
  scale?: number;
  style?: string;
}

export type AttendanceView = "today" | "yesterday" | "history";
