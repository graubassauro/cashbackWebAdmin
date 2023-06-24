import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
}

export function PaginationItem({
  isCurrent = false,
  number,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        width="4"
        fontSize="xs"
        bgColor="yellow.700"
        textColor="white"
        _disabled={{
          bg: 'blue.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      width="4"
      fontSize="xs"
      bg="gray.900"
      textColor="white"
      _hover={{
        bg: 'gray.500',
      }}
    >
      {number}
    </Button>
  )
}
