import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
  Button,
  FormControl,
  ButtonProps,
  Text,
  VStack,
} from '@chakra-ui/react'

interface ButtonInputProps extends ButtonProps {
  error?: FieldError
  label: string
  title: string
}

/**
 * Product price %
 * fixed points
 */

const ButtonInputBase: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonInputProps
> = ({ label, title, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
        <Text
          as="span"
          fontSize={14}
          fontWeight={400}
          fontFamily="body"
          color="gray.600"
        >
          {label}
        </Text>
        <Button
          w="100%"
          h={14}
          color="gray.800"
          borderRadius="10"
          borderWidth={1}
          borderColor="gray.600"
          bgColor="gray.400"
          variant="unstyled"
          alignItems="center"
          justifyContent="center"
          py={2}
          ref={ref}
          {...rest}
        >
          {title}
        </Button>
      </VStack>
    </FormControl>
  )
}

export const ButtonInput = forwardRef(ButtonInputBase)
