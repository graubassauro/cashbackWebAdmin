import { Badge, Td } from '@chakra-ui/react'

type StatusTdProps = {
  quantity: number
}

export function StatusTd({ quantity = 0 }: StatusTdProps) {
  const statusColorScheme = quantity > 0 ? 'green' : 'error'
  const statusTitle = quantity > 0 ? 'Available' : 'Out of order'

  return (
    <Td>
      <Badge borderRadius="md" colorScheme={statusColorScheme}>
        {statusTitle}
      </Badge>
    </Td>
  )
}
