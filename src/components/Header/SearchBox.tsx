import { Flex, Icon, Input } from '@chakra-ui/react'
import { MagnifyingGlass } from '@phosphor-icons/react'

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      p={3}
      maxWidth={400}
      color="gray.200"
      position="relative"
      bg="gray.400"
      borderRadius={10}
    >
      <Icon as={MagnifyingGlass} fontSize="24" color="gray.600" />
      <Input
        w="100%"
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
