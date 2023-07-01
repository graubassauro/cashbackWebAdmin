import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
  FormControl,
  Select,
  SelectProps,
  Text,
  VStack,
} from '@chakra-ui/react'

interface LightSelectInputProps extends SelectProps {
  error?: FieldError
  label: string
}

const LightSelectBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  LightSelectInputProps
> = ({ label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
        <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
          {label}
        </Text>
        <Select
          w="100%"
          h={14}
          color="gray.800"
          borderRadius="10"
          borderWidth={1}
          borderColor="gray.600"
          bgColor="gray.400"
          variant="unstyled"
          py={2}
          ref={ref}
          {...rest}
        >
          <option>Option 1</option>
        </Select>
      </VStack>
    </FormControl>
  )
}

export const LightSelectInput = forwardRef(LightSelectBase)
