'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

// Extend the theme
const theme = extendTheme({ config })

export function ThemeProvider ({
  children
}: {
    // eslint-disable-next-line no-undef
    children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
