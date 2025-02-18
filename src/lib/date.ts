import { format } from "date-fns";
import type { DateRange } from "@/types/api";

export function formatDateRange(
  range: DateRange,
  fmt: string,
): string {
  const start = format(range.start, fmt);
  const end = range.end ? format(range.end, fmt) : "Present";
  return `${start} - ${end}`;
}
