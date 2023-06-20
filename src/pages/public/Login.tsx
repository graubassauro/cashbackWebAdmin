import { Box, Center, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'

export function Login() {
  return (
    <Center
      as="form"
      width="100%"
      p={8}
      justifyContent="center"
      flexDir="column"
    >
      <Stack
        w="100%"
        maxW={728}
        borderWidth={1}
        borderRadius={8}
        px={10}
        py={10}
        position="relative"
        spacing="4"
        borderColor="yellow.700"
      >
        <Box position="absolute" bgColor="gray.300" top={-5} left={8} px={2}>
          <Heading fontFamily="heading" fontSize="2rem" color="gray.700">
            Access
          </Heading>
        </Box>
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
      </Stack>
    </Center>
  )
}
