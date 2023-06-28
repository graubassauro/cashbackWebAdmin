import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

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
      mt="4"
      px="4"
      py="5"
      bgColor="white"
      borderRadius={10}
      maxW={1480}
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
