import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    white: '#FFF',

    purple: {
      '900': '#641D9B',
      '500': '#9B6FBD',
    },

    yellow: {
      '700': '#FCC822',
    },

    green: {
      '900': '#5DBE97',
      '500': '#DFFAF1',
    },

    red: {
      '700': '#EE7979',
    },

    gray: {
      '900': '#1A181B',
      '800': '#3E3A40',
      '700': '#5F5B62',
      '600': '#9F9BA1',
      '500': '#D9D8DA',
      '400': '#EDECEE',
      '300': '#F7F7F8',
    },
  },
  fonts: {
    heading: 'Karla',
    body: 'Karla',
    mono: 'Inter',
  },
  sizes: {
    buttons: {
      'h-sm': '3.375rem',
      'h-md': '3.5rem',
    },
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.300',
        color: 'gray.800',
      },
    },
  },
})

export type CustomTheme = typeof theme
