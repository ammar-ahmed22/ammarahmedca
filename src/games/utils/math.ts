
export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const viewport = () => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  return { vh, vw };
}

export const random = (min: number, max: number) => {
  return (Math.random() * (max - min) - min);
}

export function randomArray<T = any>(arr: T[]): T{
  return arr[Math.floor(Math.random() * arr.length)]
}

export const mapNumbers = (n: number, start1: number, stop1: number, start2: number, stop2: number) => {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

export const radians = (deg: number) => deg * (Math.PI / 180);