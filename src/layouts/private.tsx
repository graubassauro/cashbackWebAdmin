import { HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '~components/Sidebar'

export function PrivateLayout() {
  return (
    <HStack spacing={2}>
      <Sidebar />
      <Outlet />
    </HStack>
  )
}
