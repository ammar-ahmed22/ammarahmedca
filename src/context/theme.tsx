import React, { createContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
  theme: Theme
  setTheme: SetState<Theme>
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultClasses?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  defaultClasses = '',
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement
    if (root) {
      root.classList.remove(theme === 'dark' ? 'light' : 'dark')
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement
    if (root) {
      root.classList.add(
        ...defaultClasses.split(' ').map((s) => s.trim()),
      )
    }
  }, [defaultClasses])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
