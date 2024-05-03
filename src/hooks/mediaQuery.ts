import { useState, useEffect } from 'react'

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export type Breakpoints = keyof typeof BREAKPOINTS

export type BreakpointValue<T> = {
  [K in Breakpoints]?: T
} & { default: T }

export function useBreakpointValue<T = any>(
  values: BreakpointValue<T>,
) {
  const [value, setValue] = useState<T>(values.default)

  useEffect(() => {
    const setupMatchMedia = () => {
      const mediaQueryLists: { [key: string]: MediaQueryList } = {}
      const onChange = () => {
        const matchingBreakpoint = Object.keys(BREAKPOINTS).find(
          (breakpoint) => {
            if (
              mediaQueryLists[breakpoint].matches &&
              values[breakpoint as Breakpoints] !== undefined
            ) {
              return true
            }
            return false
          },
        )

        if (matchingBreakpoint) {
          setValue(values[matchingBreakpoint as Breakpoints] as T)
        } else {
          setValue(values.default)
        }
      }

      Object.entries(BREAKPOINTS).forEach(([breakpoint, width]) => {
        const mediaQuery = `(min-width: ${width})`
        const mql = window.matchMedia(mediaQuery)
        mql.addEventListener('change', onChange)
        mediaQueryLists[breakpoint] = mql
      })

      onChange()

      return () => {
        Object.values(mediaQueryLists).forEach((mql) => {
          mql.removeEventListener('change', onChange)
        })
      }
    }

    return setupMatchMedia()
  }, [values])

  return value
}
