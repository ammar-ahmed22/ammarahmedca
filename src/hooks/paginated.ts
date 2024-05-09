import { useState, useEffect } from 'react'

export type UsePaginatedArrayOpts = {
  defaultLength?: number
  stepSize?: number
}

export type UsePaginatedArrayResponse<T> = [
  T[],
  {
    increase: () => void
    decrease: () => void
    hasMore: boolean
    reset: () => void
  },
]

export function usePaginatedArray<T = any>(
  array: T[],
  opts?: UsePaginatedArrayOpts,
): UsePaginatedArrayResponse<T> {
  if (!opts) opts = {}
  if (!opts?.defaultLength) opts.defaultLength = 4
  if (!opts?.stepSize) opts.stepSize = 2
  const [length, setLength] = useState(opts.defaultLength)
  const [paginated, setPaginated] = useState<T[]>(
    array.slice(0, length),
  )
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (paginated.length < array.length) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [paginated, setHasMore, array])

  useEffect(() => {
    setPaginated(array.slice(0, length))
  }, [length, setPaginated, array])

  const increase = () => {
    if (length >= array.length) return
    setLength((prev) => prev + opts!.stepSize!)
  }

  const decrease = () => {
    setLength((prev) => {
      if (prev - opts!.stepSize! < 0) return 0
      return prev - opts!.stepSize!
    })
  }

  const reset = () => {
    setLength(opts!.defaultLength!)
  }

  return [paginated, { increase, decrease, reset, hasMore }]
}
