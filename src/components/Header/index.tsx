import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { List } from '@phosphor-icons/react'
import { SearchBox } from './SearchBox'
import { Profile } from './Profile'

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      alignItems="center"
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
    </Flex>
  )
}
