import { Stack } from '@chakra-ui/react'
import { House, Users } from '@phosphor-icons/react'

import { NavLink } from './NavLink'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavLink hrefString="/" icon={House}>
        Dashboard
      </NavLink>
      <NavLink hrefString="/products" icon={Users}>
        Products
      </NavLink>
    </Stack>
  )
}
