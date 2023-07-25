import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'

import { SidebarDrawerProvider } from '~contexts/SidebarDrawerContext'
import { ProductPageProvider } from '~pages/private/Stores/Products/contexts/ProductsPageContext'
import { persistor, store } from '~redux/store'
import { theme } from '~styles/theme'

import { Routes } from 'routes'

export function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <ProductPageProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </ProductPageProvider>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
