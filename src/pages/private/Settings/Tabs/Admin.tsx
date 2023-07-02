import { HStack, VStack } from '@chakra-ui/react'

import { FormButton } from '~components/Buttons'
import { LabelInput } from '~components/Forms/Inputs'
import { Container } from '~layouts/Container'
import { useCurrentUserLogged } from '~redux/auth'

export function Admin() {
  const user = useCurrentUserLogged()

  return (
    <Container title="Admin">
      <VStack spacing={4} mt={4} alignItems="flex-start" w="100%">
        <LabelInput label="Name" value={user?.firstName} />
        <LabelInput label="E-mail" value={user?.email} />
        <HStack spacing={2} w="100%">
          <LabelInput label="Password" />
          <LabelInput label="New Password" />
        </HStack>
        <HStack w="100%" mt={4} justifyContent="flex-end" spacing={2}>
          <FormButton title="Cancel" formButtonType="CANCEL" />
          <FormButton title="Update" formButtonType="SUBMIT" />
        </HStack>
      </VStack>
    </Container>
  )
}
