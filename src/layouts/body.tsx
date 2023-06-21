import { ReactNode } from 'react'
import { VStack } from '@chakra-ui/react'

import { Header } from '~components/Header'

type BodyLayoutProps = {
  children: ReactNode
}

export function BodyLayout({ children }: BodyLayoutProps) {
  return (
    <VStack>
      <Header />
      {children}
    </VStack>
  )
}
