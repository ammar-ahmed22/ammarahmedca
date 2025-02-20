export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("-");
};
