import { ReactNode } from 'react'
import {
  Box,
  Button,
  ButtonProps,
  Center,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

type FormLayoutProps = ButtonProps & {
  children: ReactNode
  title: string
  hasGoBackButton?: boolean
  hasGoStepButton?: boolean
  centeredForm?: boolean
}

export function FormLayout({
  children,
  title,
  hasGoBackButton = false,
  hasGoStepButton = false,
  centeredForm = false,
  ...rest
}: FormLayoutProps) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{ opacity: 0, transitionDelay: 'initial' }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <VStack p={8} alignItems="flex-start" w="100%">
        {hasGoBackButton ? (
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
        ) : null}

        {hasGoStepButton ? (
          <Button
            ml={8}
            p={0}
            bgColor="transparent"
            transition={'ease-in 0.35s'}
            _hover={{
              bgColor: 'gray.400',
            }}
            {...rest}
          >
            <ArrowLeft size={32} color="#FCC822" />
          </Button>
        ) : null}

        <Center
          as="form"
          width="100%"
          p={8}
          alignItems="center"
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
            mt={centeredForm ? '50%' : 0}
            position="relative"
            spacing="4"
            borderColor="yellow.700"
          >
            <Box
              position="absolute"
              bgColor="gray.300"
              top={-5}
              left={8}
              px={2}
            >
              <Heading fontFamily="heading" fontSize="2rem" color="gray.700">
                {title}
              </Heading>
            </Box>
            {children}
          </Stack>
        </Center>
      </VStack>
    </motion.div>
  )
}
