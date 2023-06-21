import { Text, VStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'
import { FormLayout } from '~layouts/Form'

export function Login() {
  return (
    <FormLayout title="Access">
      <VStack spacing={4} mb={4} alignItems="flex-end">
        <LightInput
          id="email"
          name="email"
          placeholder="Your e-mail"
          type="email"
        />
        <LightInput
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />

        <NavLink to="forgot-password">
          <Text
            color="yellow.700"
            fontWeight={700}
            textAlign="right"
            transition="ease-in 0.35s"
            textDecoration="underline"
          >
            Forgot my passsowrd
          </Text>
        </NavLink>
      </VStack>
      <ButtonComponent title="Login" />

      <NavLink to="/create-account">
        <Text
          textAlign="center"
          transition="ease-in 0.35s"
          textDecorationColor="gray.300"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {`Don't`} have an account? Click here
        </Text>
      </NavLink>
    </FormLayout>
  )
}
