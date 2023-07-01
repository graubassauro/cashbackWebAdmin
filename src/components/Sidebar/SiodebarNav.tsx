import { Stack } from '@chakra-ui/react'
import { ChartLine, House, Storefront } from '@phosphor-icons/react'

import { NavLink } from './NavLink'

export function SidebarNav() {
  return (
    <Stack spacing={4} align="flex-start">
      <NavLink hrefString="/" icon={House}>
        Dashboard
      </NavLink>
      <NavLink hrefString="/stores" icon={Storefront}>
        Stores
      </NavLink>
      <NavLink hrefString="/analytics" icon={ChartLine}>
        Analytics
      </NavLink>
    </Stack>
  )
}
