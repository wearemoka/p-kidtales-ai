'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

interface Props {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}

function ThemeProvider ({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}

export default ThemeProvider
