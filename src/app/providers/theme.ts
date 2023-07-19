/* eslint-disable no-unused-vars */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

// configurations of styles
export enum ColorsTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

// Add your color mode config
const config: ThemeConfig = {
  initialColorMode: ColorsTheme.DARK,
  useSystemColorMode: false
}

// global colors
const styles = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'Plus Jakarta Sans',
        // color: 'white',
        bg: 'radial-gradient(50% 50% at 50% 50%, rgba(151, 69, 251, 0.2) 0%, rgba(151, 69, 251, 0) 100%), #0C0416;'
      },
      sx: '../styles/globals.scss'
    })
  }
}

// Extend the theme
const theme = extendTheme({ config, ...styles })

export default theme
