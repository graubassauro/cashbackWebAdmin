import { HStack, Text } from '@chakra-ui/react'
import { Pagination } from './Pagination'

type TableFooterProps = {
  currentPageStartAmount: number
  currentPageEndAmount: number
  totalItems: number
}

export function TableFooter({
  currentPageStartAmount,
  currentPageEndAmount,
  totalItems,
}: TableFooterProps) {
  return (
    <HStack spacing={2} justifyContent="space-between" alignItems="center">
      <Text fontSize={14} fontWeight={700} color="gray.600">
        Showing {currentPageStartAmount} to {currentPageEndAmount} of{' '}
        {totalItems} items
      </Text>
      <Pagination />
    </HStack>
  )
}
