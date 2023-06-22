import { HStack, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { List } from '@phosphor-icons/react'

import { SearchBox } from './SearchBox'
import { Profile } from './Profile'

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <HStack
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
        />
      )}

      {isWideVersion ? <SearchBox /> : null}

      <Profile showProfileData={isWideVersion} />
    </HStack>
  )
}
