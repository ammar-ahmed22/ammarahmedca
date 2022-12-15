export const displayTimeSince = (prevDate: number): string => {
  const nowDate: number = new Date().valueOf();

  const result: Record<string, number> = {};

  let delta = Math.abs(nowDate - prevDate) / 1000;

  const durations = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(durations).forEach((key) => {
    const k = key as keyof typeof durations;
    result[k] = Math.floor(delta / durations[k]);
    delta -= result[k] * durations[k];
  });

  const pluralize = (val: number): string => {
    return val === 1 ? "" : "s";
  };

  if (result.year >= 1) {
    if (result.month >= 1) {
      return `${result.year} year${pluralize(result.year)} ${
        result.month
      } month${pluralize(result.month)} ago`;
    } else {
      return `${result.year} year${pluralize(result.year)} ago`;
    }
  } else if (result.year === 0) {
    if (result.month >= 1) {
      return `${result.month} month${pluralize(result.month)} ago`;
    } else {
      if (result.week >= 1) {
        return `${result.week} week${pluralize(result.week)} ago`;
      } else {
        return `${result.day} day${pluralize(result.day)} ago`;
      }
    }
  }

  return "error calculating time";
};

/**
 * Calculates view height in pixels given percentage
 *
 * @param {number} percent - Value to convert from vh to pixels
 * @returns {number} - Pixel value
 */
export const vh = (percent: number) => {
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (percent * h) / 100;
};

/**
 * Calculates view width in pixels given percentage
 *
 * @param {number} percent - Value to convert from vw to pixels
 * @returns {number} - Pixel value
 */
export const vw = (percent: number) => {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (percent * w) / 100;
};

export const hyphenate = (text: string) => text.split(" ").join("-");
