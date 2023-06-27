import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '~redux/store'
import { theme } from '~styles/theme'
import { Routes } from 'routes'

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}
