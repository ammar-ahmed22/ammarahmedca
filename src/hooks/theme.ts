import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import type { Theme } from '../context/theme'

export type UseThemeResponse = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useTheme = (): UseThemeResponse => {
  const { theme, setTheme } = useContext(ThemeContext)
  return {
    theme,
    toggleTheme() {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    },
    setTheme(theme: Theme) {
      setTheme(theme)
    },
  }
}

export function useThemeValue<T = any>(lightValue: T, darkValue: T): T {
  const { theme } = useContext(ThemeContext)
  return theme === 'light' ? lightValue : darkValue
}
