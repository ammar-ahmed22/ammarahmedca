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
    const body = document.querySelector('body') as HTMLElement
    if (body) {
      body.classList.remove(theme === 'dark' ? 'light' : 'dark')
      body.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement
    if (body) {
      body.classList.add(
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
