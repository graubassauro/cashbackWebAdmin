import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'

export function ForgotPassword() {
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
        mt="50%"
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
              Password recovery
            </Heading>
          </Box>

          <Text>
            Type your phone number to receive the code to recovery your password
          </Text>
          <LightInput
            id="text"
            name="text"
            placeholder="Phone number"
            type="text"
          />
          <ButtonComponent title="Send" />
        </Stack>
      </Center>
    </VStack>
  )
}
