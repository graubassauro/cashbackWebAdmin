import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { PrivateLayout } from '~layouts/Private'
import { Dashboard } from '~pages/private/Dashboard'
import { Onboard } from '~pages/private/Onboard'
import { Analytics } from '~pages/private/Analytics'
import { Stores } from '~pages/private/Stores'
import { Segments } from '~pages/private/Stores/Audience/Segments'
import { NewHighlight } from '~pages/private/Stores/Audience/NewHighlight'
import { Categories } from '~pages/private/Stores/Products/Categories'
import { NewProduct } from '~pages/private/Stores/Products/NewProduct'
import { EditStore } from '~pages/private/Stores/EditStore'
import { NewStore } from '~pages/private/Stores/NewStore'
import { DetailedStore } from '~pages/private/Stores/DetailedStore'

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="onboard" element={<Onboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="stores" element={<Stores />}>
            <Route path="detail-store" element={<DetailedStore />} />
            <Route path="edit-store" element={<EditStore />} />
            <Route path="new-store" element={<NewStore />} />
          </Route>
          <Route path="products/categories" element={<Categories />} />
          <Route path="products/new-product" element={<NewProduct />} />
          <Route path="audience/segments" element={<Segments />} />
          <Route path="audience/new-highlight" element={<NewHighlight />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
