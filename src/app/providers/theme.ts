/* eslint-disable no-unused-vars */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/styled-system'
import { ButtonStyles as Button } from './components/buttonsStyles'
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

const myCustomComponents = {
  components: {
    Button
  }
}

// global colors
const styles = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        bg: 'radial-gradient(50% 50% at 50% 50%, rgba(151, 69, 251, 0.2) 0%, rgba(151, 69, 251, 0) 100%), #0C0416;',
        backgroundRepeat: 'no-repeat',
        color: 'white'
      },
      ':root': {
        fontFamily: 'Plus Jakarta Sans, sans-serif !important',
        '--chakra-fonts-heading': 'Plus Jakarta Sans, sans-serif',
        '--chakra-fonts-body': 'Plus Jakarta Sans, sans-serif'
      },
      '.chakra-container': {
        maxWidth: '100%',
        '@media screen and (min-width: 767px)': {
          maxWidth: '90vw'
        },
        '@media screen and (min-width: 991px)': {
          maxWidth: '80vw'
        }
      }
    })
  }
}

// Extend the theme
const theme = extendTheme({ config, ...styles, ...myCustomComponents })

export default theme
