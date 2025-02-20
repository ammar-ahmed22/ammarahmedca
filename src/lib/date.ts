import { format, isBefore, startOfDay } from "date-fns";
import type { DateRange } from "@/types/api";

export function formatDateRange(
  range: DateRange,
  fmt: string,
): string {
  const start = format(range.start, fmt);
  const end =
    range.end && isBefore(range.end, startOfDay(new Date()))
      ? format(range.end, fmt)
      : "Present";
  return `${start} - ${end}`;
}
