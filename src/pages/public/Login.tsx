import { Box, Flex, Grid, Heading, Image, Stack } from '@chakra-ui/react'

import LoginImage from '~assets/images/login.png'
import { ButtonComponent } from '~components/Forms/Button'
import { LightInput } from '~components/Forms/Inputs/LightInput'

export function Login() {
  return (
    <Grid w="100%" h="100%" templateColumns={'1fr 1fr'}>
      <Flex
        as="form"
        width="100%"
        p={8}
        justifyContent="center"
        flexDir="column"
      >
        <Stack
          borderWidth={1}
          borderRadius={8}
          px={16}
          py={32}
          position="relative"
          spacing="4"
          borderColor="yellow.700"
        >
          <Box position="absolute" bgColor="gray.300" top={-5} left={20} px={2}>
            <Heading fontFamily="heading" fontSize="2rem" color="gray.700">
              Access
            </Heading>
          </Box>
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
          <ButtonComponent title="Login" />
        </Stack>
      </Flex>
      <Image src={LoginImage} alt="Login" h="100vh" />
    </Grid>
  )
}
