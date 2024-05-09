export const randomInteger = (
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
) => {
  if (min > max) {
    throw new Error(
      'Minimum value must be less than or equal to the maximum value.',
    )
  }
  // The Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1
  // so we adjust it to the desired range and round it to get an integer
  return Math.floor(Math.random() * (max - min + 1) + min)
}
