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

const myCustomComponents = {
  components: {
    Container: {
      baseStyle: {
        maxWidth: '95vw',
        '@media screen and (min-width: 768px)': {
          maxWidth: '90vw'
        },
        '@media screen and (min-width: 991px)': {
          maxWidth: '80vw'
        }
      }
    },
    Grid: {
      baseStyle: {
        templateColumns: 'repeat(12, 1fr)',
        gap: 4
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: '130%'
      },
      sizes: {
        '2xl': { fontSize: '2xl', lineHeight: '3xl' },
        xl: { fontSize: 'xl', lineHeight: '2xl' },
        lg: { fontSize: 'lg', lineHeight: 'xl' },
        md: { fontSize: 'md', lineHeight: 'base' },
        sm: { fontSize: 'sm', lineHeight: 'base' }
      },
      variants: {
        h1: {
          fontSize: '26px',
          '@media screen and (min-width: 601px)': {
            fontSize: '42px'
          }
        }
      }
    },
    Button: {
      baseStyle: {
        fontFamily: "'Plus Jakarta Sans'",
        fontWeight: 'bold',
        borderRadius: '100px',
        color: 'white'
      }
    },
    Skeleton: {
      baseStyle: {
        display: 'inline-block',
        borderRadius: '8px',
        '--skeleton-start-color': 'var(--chakra-colors-gray-800)',
        '--skeleton-end-color': 'var(--chakra-colors-gray-600)',
        width: '320px',
        maxHeight: '100px',
        '@media screen and (min-width: 601px)': {
          width: '285px'
        },
        '@media screen and (min-width: 991px)': {
          maxHeight: '210px',
          width: '100%'
        }
      }
    }
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
        '--chakra-fonts-body': 'Plus Jakarta Sans, sans-serif',
        overflowX: 'hidden !important'
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
