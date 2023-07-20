/* eslint-disable no-unused-vars */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/styled-system'

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
        bg: 'radial-gradient(50% 50% at 50% 50%, rgba(151, 69, 251, 0.2) 0%, rgba(151, 69, 251, 0) 100%), #0C0416;',
        backgroundRepeat: 'no-repeat',
        color: 'white'
      },
      ':root': {
        'font-family': 'Plus Jakarta Sans !important',
        '--chakra-fonts-heading': 'Plus Jakarta Sans',
        '--chakra-fonts-body': 'Plus Jakarta Sans'
      },
      '.chakra-container': {
        'max-width': '100%',
        '@media screen and (min-width: 767px)': {
          'max-width': '90vw'
        },
        '@media screen and (min-width: 991px)': {
          'max-width': '80vw'
        }
      }
    })
  }
}

// Extend the theme
const theme = extendTheme({ config, ...styles })

export default theme
