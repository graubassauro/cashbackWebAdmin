import { Button, HStack, Stack } from '@chakra-ui/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { PaginationItem } from './PaginationItem'

export function Pagination() {
  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <HStack spacing={0}>
        <Button
          bgColor="transparent"
          p={0}
          borderWidth={1}
          borderColor="white"
          transition="ease-in 0.35s"
          _hover={{ bgColor: 'white', borderColor: 'gray.400' }}
        >
          <CaretLeft size={24} />
        </Button>
        <Stack direction="row" spacing="2">
          <PaginationItem number={1} isCurrent />
          <PaginationItem number={2} />
          <PaginationItem number={3} />
        </Stack>
        <Button
          bgColor="transparent"
          p={0}
          borderWidth={1}
          borderColor="white"
          transition="ease-in 0.35s"
          _hover={{ bgColor: 'white', borderColor: 'gray.400' }}
        >
          <CaretRight size={24} />
        </Button>
      </HStack>
    </Stack>
  )
}
