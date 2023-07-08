import { HStack, Text } from '@chakra-ui/react'
import { Pagination } from './Pagination'

type TableFooterProps = {
  currentPageStartAmount: number
  currentPageEndAmount: number
  totalItems: number
  isWideVersion?: boolean
}

export function TableFooter({
  currentPageStartAmount,
  currentPageEndAmount,
  totalItems,
  isWideVersion = false,
}: TableFooterProps) {
  return (
    <HStack
      spacing={2}
      justifyContent={isWideVersion ? 'space-between' : 'center'}
      alignItems="center"
    >
      {isWideVersion ? (
        <Text fontSize={14} fontWeight={700} color="gray.600">
          Showing {currentPageStartAmount} to {currentPageEndAmount} of{' '}
          {totalItems} items
        </Text>
      ) : null}
      <Pagination />
    </HStack>
  )
}
