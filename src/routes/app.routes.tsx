import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { PrivateLayout } from '~layouts/Private'
import { Dashboard } from '~pages/private/Dashboard'
import { Onboard } from '~pages/private/Onboard'
import { Analytics } from '~pages/private/Analytics'
import { Stores } from '~pages/private/Stores'
import { Segments } from '~pages/private/Stores/Audience/Segments'
import { NewHighlight } from '~pages/private/Stores/Audience/NewHighlight'
import { NewProduct } from '~pages/private/Stores/Products/NewProduct'
import { EditStore } from '~pages/private/Stores/EditStore'
import { NewStore } from '~pages/private/Stores/NewStore'
import { DetailedStore } from '~pages/private/Stores/DetailedStore'
import { Settings } from '~pages/private/Settings'
import { Brands } from '~pages/private/Stores/Products/Brands'
import { Categories } from '~pages/private/Categories'
import { EditProduct } from '~pages/private/Stores/Products/EditProduct'

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="onboard" element={<Onboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="categories" element={<Categories />} />
          <Route path="stores" element={<Stores />}>
            <Route path="detail-store" element={<DetailedStore />} />
            <Route path="edit-store" element={<EditStore />} />
            <Route path="new-store" element={<NewStore />} />
          </Route>
          <Route path="products/brands" element={<Brands />} />
          <Route path="products/new-product" element={<NewProduct />} />
          <Route path="products/edit-product/:id" element={<EditProduct />} />
          <Route path="audience/segments" element={<Segments />} />
          <Route path="audience/new-highlight" element={<NewHighlight />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
