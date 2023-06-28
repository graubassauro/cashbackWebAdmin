import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~styles/theme'
import { store } from '~redux/store'
import { Routes } from 'routes'

export function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  )
}
