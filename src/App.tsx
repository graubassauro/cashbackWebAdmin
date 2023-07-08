import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'

import { SidebarDrawerProvider } from '~contexts/SidebarDrawerContext'
import { theme } from '~styles/theme'
import { persistor, store } from '~redux/store'
import { Routes } from 'routes'

export function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
