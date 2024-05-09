import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider } from '../context/theme'
import { ApolloProvider } from '@apollo/client'
import { useClient } from '../hooks/client'

const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const client = useClient()
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        <ThemeProvider
          defaultClasses='bg-background text-foreground min-h-screen'
          defaultTheme='dark'
        >
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </ApolloProvider>
  )
}

export default Providers
