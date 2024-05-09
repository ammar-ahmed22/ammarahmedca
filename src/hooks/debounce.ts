import { useState, useEffect } from 'react'

export type UseDebouncedOpts = {
  delay?: number
}

export function useDebounced<T = any>(
  defaultValue: T,
  opts?: UseDebouncedOpts,
) {
  let delay = 200
  if (opts?.delay) delay = opts.delay

  const [value, setValue] = useState<T>(defaultValue)
  const [debouncedValue, setDebouncedValue] =
    useState<T>(defaultValue)

  useEffect(() => {
    setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
  }, [value, delay])

  return [value, debouncedValue, setValue]
}
