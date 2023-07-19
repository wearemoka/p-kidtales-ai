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

// 'use client'
// import { CacheProvider } from '@chakra-ui/next-js'
// import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

// // Add your color mode config
// const config: ThemeConfig = {
// 	initialColorMode: 'dark',
// 	useSystemColorMode: false
// }

// // Extend the theme
// const theme = extendTheme({ config })

// export function ThemeProvider({
// 	children
// }: {
// 	// eslint-disable-next-line no-undef
// 	children: React.ReactNode
// }) {
// 	return (
// 		<CacheProvider>
// 			<ChakraProvider theme={theme}>
// 				{children}
// 			</ChakraProvider>
// 		</CacheProvider>
// 	)
// }
