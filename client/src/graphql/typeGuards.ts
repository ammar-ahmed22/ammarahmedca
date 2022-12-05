export const TextOrImageIsText = (val: TextOrImageType): val is IText => {
  const keys = Object.keys(val);
  if (keys.includes("plainText") && keys.includes("annotations")) {
    return true;
  }

  return false;
};
