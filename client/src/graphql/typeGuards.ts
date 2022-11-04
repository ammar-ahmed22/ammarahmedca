export const TextOrImageIsText = (val: TextOrImage) : val is Text => {
  const keys = Object.keys(val);
  if (keys.includes("plain_text") && keys.includes("annotations")){
    return true;
  }

  return false;
}