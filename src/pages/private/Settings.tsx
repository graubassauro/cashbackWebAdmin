import { Flex, HStack, VStack } from '@chakra-ui/react'

import { TabButton } from '~components/Buttons/TabButton'
import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { Title } from '~components/Typograph/Title'
import { Container } from '~layouts/Container'
import { BodyLayout } from '~layouts/body'

export function Settings() {
  return (
    <BodyLayout>
      <Title title="Settings" />
      <VStack spacing={2} mt="2">
        <HStack borderBottomWidth={1} w="100%">
          <TabButton title="Profile" />
          <TabButton title="Admin" />
        </HStack>
        <Flex w="100%" alignItems="center" justifyContent="center" flex={1}>
          <Container title="Profile">
            <VStack spacing={2} mt={4} alignItems="flex-start" w="100%">
              <LabelInput label="Name" />
              <LabelTextarea label="Description" />
              <HStack spacing={2} w="100%">
                <LabelInput label="Latitude" />
                <LabelInput label="Longitude" />
              </HStack>
              <HStack spacing={2} w="100%">
                <LabelInput label="City" />
                <LabelInput label="State" />
              </HStack>
            </VStack>
          </Container>
        </Flex>
      </VStack>
    </BodyLayout>
  )
}
