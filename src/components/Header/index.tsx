import { HStack, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { List } from '@phosphor-icons/react'

import { useSidebarDrawer } from '~contexts/SidebarDrawerContext'

import { SearchBox } from './SearchBox'
import { Profile } from './Profile'

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <HStack
      maxW={1480}
      flex={1}
      as="header"
      w="100%"
      h="20"
      mt="2"
      px="2"
      justifyContent="space-between"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={List} />}
          fontSize="24"
          variant="unstyled"
          mr="2"
          onClick={onOpen}
        />
      )}

      {isWideVersion ? <SearchBox /> : null}

      <Profile />
    </HStack>
  )
}
