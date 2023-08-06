import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { PrivateLayout } from '~layouts/Private'
import { Dashboard } from '~pages/private/Dashboard'
import { Onboard } from '~pages/private/Onboard'
import { Analytics } from '~pages/private/Analytics'
import { Stores } from '~pages/private/Stores'
import { Settings } from '~pages/private/Settings'
import { Categories } from '~pages/private/Categories'

import { NewStore } from '~pages/private/Stores/NewStore'
import { EditStore } from '~pages/private/Stores/EditStore'
import { DetailedStore } from '~pages/private/Stores/DetailedStore'

import { Brands } from '~pages/private/Stores/Products/Brands'
import { EditProduct } from '~pages/private/Stores/Products/EditProduct'
import { NewProduct } from '~pages/private/Stores/Products/NewProduct'

import { Segments } from '~pages/private/Stores/Promotions/Segments'
import { NewPromotion } from '~pages/private/Stores/Promotions/NewPromotion'

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
          <Route path="promotions/segments" element={<Segments />} />
          <Route path="promotions/new-promotion" element={<NewPromotion />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
