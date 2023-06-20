import { PublicLayout } from 'layouts/public'
import { Route, Routes } from 'react-router-dom'

import { CreateAccount } from '~pages/public/CreateAccount'
import { ForgotPassword } from '~pages/public/ForgotPassword'
import { Login } from '~pages/public/Login'

export function AuthLogin() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}
