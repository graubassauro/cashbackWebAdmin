import { VStack, HStack } from '@chakra-ui/react'

import { FormButton } from '~components/Buttons'
import {
  LabelFileInput,
  LabelInput,
  LabelTextarea,
} from '~components/Forms/Inputs'
import { LightSelectInput } from '~components/Forms/Select'
import { Container } from '~layouts/Container'

export function EditStore() {
  return (
    <Container title="Profile">
      <VStack spacing={4} mt={4} alignItems="flex-start" w="100%">
        <LabelInput label="Name" />
        <LabelTextarea label="Description" />
        <HStack spacing={2} w="100%">
          <LabelInput label="Zip Code" />
          <LightSelectInput label="Country" />
        </HStack>
        <HStack spacing={2} w="100%">
          <LabelInput label="City" />
          <LabelInput label="State" />
        </HStack>
        <HStack spacing={2} w="100%">
          <LabelInput label="Latitude" />
          <LabelInput label="Longitude" />
        </HStack>
        <LabelFileInput label="banner" />
        <HStack w="100%" mt={4} justifyContent="flex-end" spacing={2}>
          <FormButton title="Cancel" formButtonType="CANCEL" />
          <FormButton title="Update" formButtonType="SUBMIT" />
        </HStack>
      </VStack>
    </Container>
  )
}
