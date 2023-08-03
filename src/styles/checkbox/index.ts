import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    bg: 'gray.300',

    _checked: {
      bg: 'purple.900',
      borderColor: 'purple.900',
    },
  },
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
