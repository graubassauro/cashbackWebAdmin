import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { PrivateLayout } from '~layouts/Private'
import { Dashboard } from '~pages/private/Dashboard'
import { Onboard } from '~pages/private/Onboard'
import { Analytics } from '~pages/private/Analytics'
import { Settings } from '~pages/private/Settings'
import { Audience } from '~pages/private/Audience'
import { Products } from '~pages/private/Products'
import { Segments } from '~pages/private/Audience/Segments'
import { NewHighlight } from '~pages/private/Audience/NewHighlight'
import { Categories } from '~pages/private/Products/Categories'
import { NewProduct } from '~pages/private/Products/NewProduct'

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/audience/segments" element={<Segments />} />
          <Route path="/audience/new-highlight" element={<NewHighlight />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/categories" element={<Categories />} />
          <Route path="/products/new-product" element={<NewProduct />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
