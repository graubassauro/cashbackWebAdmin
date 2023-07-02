import { useCurrentUserLogged } from '~redux/auth'

import { AppRoutes } from './app.routes'
import { AuthLogin } from './auth.routes'

export function Routes() {
  const user = useCurrentUserLogged()

  return user ? <AppRoutes /> : <AuthLogin />
}
