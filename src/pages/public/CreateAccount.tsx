import { NavLink } from 'react-router-dom'

import { Box, Button, Center, Heading, Stack, VStack } from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'

export function CreateAccount() {
  return (
    <VStack p={8} alignItems="flex-start">
      <NavLink to="/">
        <Button
          ml={8}
          p={0}
          bgColor="transparent"
          transition={'ease-in 0.35s'}
          _hover={{
            bgColor: 'gray.400',
          }}
        >
          <ArrowLeft size={32} color="#FCC822" />
        </Button>
      </NavLink>

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
              Create account
            </Heading>
          </Box>

          <LightInput
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            type="text"
          />
          <LightInput
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            type="text"
          />
          <LightInput
            id="phonenumber"
            name="phonenumber"
            placeholder="Phone number"
            type="text"
          />
          <LightInput
            id="email"
            name="email"
            placeholder="E-mail"
            type="text"
          />
          <LightInput
            id="code"
            name="code"
            placeholder="ZIP code"
            type="text"
          />
          <LightInput
            id="address"
            name="address"
            placeholder="Address"
            type="text"
          />
          <LightInput
            id="country"
            name="country"
            placeholder="Country"
            type="text"
          />
          <LightInput
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <ButtonComponent title="Send" />
        </Stack>
      </Center>
    </VStack>
  )
}
