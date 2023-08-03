import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  thumb: {
    bg: 'white',
  },
  track: {
    bg: 'gray.700',
    _checked: {
      bg: 'purple.900',
    },
  },
})

const switchTheme = defineMultiStyleConfig({ baseStyle })

export { switchTheme }
