import { Stack } from '@chakra-ui/react'
import {
  ChartLine,
  Gear,
  House,
  Package,
  UsersFour,
} from '@phosphor-icons/react'

import { NavLink } from './NavLink'

export function SidebarNav() {
  return (
    <Stack spacing={4} align="flex-start">
      <NavLink hrefString="/" icon={House}>
        Dashboard
      </NavLink>
      <NavLink hrefString="/products" icon={Package}>
        Products
      </NavLink>
      <NavLink hrefString="/audience" icon={UsersFour}>
        Audience
      </NavLink>
      <NavLink hrefString="/analytics" icon={ChartLine}>
        Analytics
      </NavLink>
      <NavLink hrefString="/settings" icon={Gear}>
        Settings
      </NavLink>
    </Stack>
  )
}
