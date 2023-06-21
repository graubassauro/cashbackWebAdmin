import { Flex, Icon, Input } from '@chakra-ui/react'
import { MagnifyingGlass } from '@phosphor-icons/react'

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      maxWidth={400}
      alignSelf="flex-start"
      color="gray.200"
      position="relative"
      bg="gray.400"
      borderRadius="full"
    >
      <Icon as={MagnifyingGlass} fontSize="24" />
      <Input
        color="gray.900"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search for something..."
        _placeholder={{
          color: 'gray.600',
        }}
      />
    </Flex>
  )
}
