import { Td } from '@chakra-ui/react'

type TableTdProps = {
  title: string
}

export function TableTd({ title }: TableTdProps) {
  return (
    <Td fontSize={14} fontWeight={400} color="gray.900">
      {title}
    </Td>
  )
}
