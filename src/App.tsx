import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { theme } from '~styles/theme'
import { Routes } from 'routes'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  )
}
