import { Flex, VStack } from '@chakra-ui/react'

import { BodyLayout } from '~layouts/Body'
import { Admin } from './Tabs/Admin'

export function Settings() {
  return (
    <BodyLayout>
      <VStack spacing={2} mt="2">
        <Flex w="100%" alignItems="center" justifyContent="center" flex={1}>
          <Admin />
        </Flex>
      </VStack>
    </BodyLayout>
  )
}
