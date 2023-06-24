import { Th } from '@chakra-ui/react'

type TableThProps = {
  title: string
}

export function TableTh({ title }: TableThProps) {
  return (
    <Th fontSize={14} fontWeight={700} color="gray.900">
      {title}
    </Th>
  )
}
