import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
// import {} from 'framer-motion/dist/framer-motion'

import { PublicLayout } from '~layouts/Public'
import { CreateAccount } from '~pages/public/CreateAccount'
import { ForgotPassword } from '~pages/public/ForgotPassword'
import { Login } from '~pages/public/Login'

export function AuthLogin() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
