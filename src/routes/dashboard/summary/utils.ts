import type { ShiftsSummary } from "./types";

/**
 * Convert raw API data with date strings into a typed summary using Date objects.
 * @param rawData Payload containing a reference date and daily shift totals.
 * @returns Normalized shifts summary with Date instances for all dates.
 */
export function formatShiftsSummary(rawData: {
  reference_date: string;
  daily_shifts: { date: string; shifts: number }[];
}): ShiftsSummary {
  const shiftsSummary: ShiftsSummary = {
    reference_date: new Date(rawData.reference_date),
    daily_shifts: rawData.daily_shifts.map((item) => ({
      date: new Date(item.date),
      shifts: item.shifts,
    })),
  };
  return shiftsSummary;
}