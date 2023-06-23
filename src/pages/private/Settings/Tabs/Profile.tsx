import { VStack, HStack, Button, ButtonProps, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FormButton } from '~components/Buttons'

import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { LabelFileInput } from '~components/Forms/Inputs/LabelFileInput'
import { Container } from '~layouts/Container'

type PaymentButtonProps = ButtonProps & {
  title: string
  isPaymentActive?: boolean
}

const PaymentButton = ({
  title,
  isPaymentActive = false,
  ...rest
}: PaymentButtonProps) => {
  return (
    <Button
      w="100%"
      h={14}
      bgColor={isPaymentActive ? 'purple.900' : 'gray.400'}
      borderRadius="10"
      borderWidth={1}
      borderColor={isPaymentActive ? 'purple.900' : 'gray.600'}
      textColor={isPaymentActive ? 'white' : 'gray.800'}
      _hover={{
        bgColor: 'transparent',
        textColor: 'gray.800',
      }}
      {...rest}
    >
      {title}
    </Button>
  )
}

export function Profile() {
  const [paymentMethod, setPaymentMethod] = useState<'CART' | 'MONEY'>('CART')

  return (
    <Container title="Profile">
      <VStack spacing={4} mt={4} alignItems="flex-start" w="100%">
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
        <LabelFileInput label="banner" />
        <VStack spacing={2} w="100%" alignItems="flex-start">
          <Text
            fontSize={14}
            fontWeight={400}
            fontFamily="body"
            color="gray.600"
          >
            Payment Method
          </Text>
          <HStack w="100%">
            <PaymentButton
              title="Credit card"
              isPaymentActive={paymentMethod === 'CART'}
              onClick={() => setPaymentMethod('CART')}
            />
            <PaymentButton
              title="Money"
              isPaymentActive={paymentMethod === 'MONEY'}
              onClick={() => setPaymentMethod('MONEY')}
            />
          </HStack>
        </VStack>
        <HStack w="100%" mt={4} justifyContent="flex-end" spacing={2}>
          <FormButton title="Cancel" formButtonType="CANCEL" />
          <FormButton title="Update" formButtonType="SUBMIT" />
        </HStack>
      </VStack>
    </Container>
  )
}
