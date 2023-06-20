import { ChakraProvider } from '@chakra-ui/react'

import { Login } from '~pages/public/Login'
import { theme } from '~styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Login />
    </ChakraProvider>
  )
}
