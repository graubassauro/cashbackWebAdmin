import { HStack, Text } from '@chakra-ui/react'
import { Pagination } from './Pagination'

export function TableFooter() {
  return (
    <HStack spacing={2} justifyContent="space-between" alignItems="center">
      <Text fontSize={14} fontWeight={700} color="gray.600">
        Showing 1 to 6 of 16 products
      </Text>
      <Pagination />
    </HStack>
  )
}
