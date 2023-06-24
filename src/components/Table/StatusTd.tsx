import { Badge, Td } from '@chakra-ui/react'

type StatusTdProps = {
  status: string
  title: string
}

export function StatusTd({
  status = 'green',
  title = 'Available',
}: StatusTdProps) {
  return (
    <Td>
      <Badge borderRadius="md" colorScheme={status}>
        {title}
      </Badge>
    </Td>
  )
}
