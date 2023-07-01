import { Center, Spinner } from '@chakra-ui/react'

export function Loading() {
  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.900"
        size="xl"
      />
    </Center>
  )
}
