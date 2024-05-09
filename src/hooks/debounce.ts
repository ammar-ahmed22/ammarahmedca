import { useState, useEffect } from 'react'

export type UseDebouncedOpts = {
  delay?: number
}

export type UseDebouncedResponse<T = any> = [T, T, SetState<T>]

export function useDebounced<T = any>(
  defaultValue: T,
  opts?: UseDebouncedOpts,
): UseDebouncedResponse<T> {
  let delay = 200
  if (opts?.delay) delay = opts.delay

  const [value, setValue] = useState<T>(defaultValue)
  const [debouncedValue, setDebouncedValue] =
    useState<T>(defaultValue)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return [value, debouncedValue, setValue]
}
