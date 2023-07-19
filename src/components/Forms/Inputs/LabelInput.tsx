import { FieldError } from 'react-hook-form'
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ForwardRefRenderFunction, forwardRef } from 'react'

type LabelInputProps = InputProps & {
  label: string
  error?: FieldError
}

const LabelInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  LabelInputProps
> = ({ label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
        <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
          {label}
        </Text>
        <Input
          w="100%"
          h={14}
          color="gray.800"
          borderRadius="10"
          borderWidth={1}
          borderColor="gray.600"
          bgColor="gray.400"
          variant="unstyled"
          px="4"
          mr="4"
          ref={ref}
          {...rest}
        />
      </VStack>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const LabelInput = forwardRef(LabelInputBase)
