import { Stack, StackProps } from '@chakra-ui/react'

export type RootProps = StackProps

export function Root(props: RootProps) {
  return <Stack w="100%" {...props} />
}
