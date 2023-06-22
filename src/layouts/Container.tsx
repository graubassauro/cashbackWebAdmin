import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Title } from '~components/Typograph/Title'

type ContainerProps = {
  title?: string
  children: ReactNode
}

export function Container({ title = '', children }: ContainerProps) {
  return (
    <Box
      alignItems="flex-start"
      w="100%"
      maxW={1480}
      mt="4"
      bgColor="white"
      px="4"
      py="5"
    >
      {title ? (
        <Flex borderBottomWidth={1} borderBottomColor="gray.300" pb={2}>
          <Title title={title} />
        </Flex>
      ) : null}
      {children}
    </Box>
  )
}
