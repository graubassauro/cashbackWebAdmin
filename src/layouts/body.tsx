import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'
import { Box, VStack } from '@chakra-ui/react'

import { Header } from '~components/Header'

type BodyLayoutProps = {
  children: ReactNode
}

const BodyLayoutBase: ForwardRefRenderFunction<
  HTMLDivElement,
  BodyLayoutProps
> = ({ children }, ref) => {
  return (
    <VStack spacing={4} w="100%" ref={ref}>
      <Header />
      <Box p={4} w="100%" maxW={1480}>
        {children}
      </Box>
    </VStack>
  )
}

export const BodyLayout = forwardRef(BodyLayoutBase)
