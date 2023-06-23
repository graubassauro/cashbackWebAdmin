import { ReactNode } from 'react'
import { Box, VStack } from '@chakra-ui/react'

import { Header } from '~components/Header'

type BodyLayoutProps = {
  children: ReactNode
}

export function BodyLayout({ children }: BodyLayoutProps) {
  return (
    <VStack spacing={4} w="100%" alignItems="flex-start">
      <Header />
      <Box p={4} w="100%">
        {children}
      </Box>
    </VStack>
  )
}
