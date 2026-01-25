import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export type Paginated<T> = {
  pages: T[][];
  totalPages: number;
  pageSize: number;
};

export const parsePositiveInt = (
  value: string | undefined,
  defaultValue: number = 0,
): number => {
  if (value === undefined) {
    return defaultValue;
  }
  const parsed = parseInt(value);
  if (isNaN(parsed) || parsed < 0) {
    return defaultValue;
  }
  return parsed;
};

export function paginate<T>(
  items: T[],
  pageSize: number,
): Paginated<T> {
  const totalPages = Math.ceil(items.length / pageSize);
  const pages: T[][] = Array.from({ length: totalPages }, (_, i) =>
    items.slice(i * pageSize, (i + 1) * pageSize),
  );

  return {
    pages,
    totalPages,
    pageSize,
  };
}

export function parseNotionDate(dateString: string): Date {
  if (dateString.split("-").length === 3) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  } else {
    return new Date(dateString);
  }
}
