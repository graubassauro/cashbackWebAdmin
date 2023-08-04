import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
  FormControl,
  Select,
  SelectProps,
  Text,
  VStack,
} from '@chakra-ui/react'

export type SelectOptions = {
  key: string
  label: string
}

interface LightSelectInputProps extends SelectProps {
  error?: FieldError
  label: string
  options: SelectOptions[]
}

/**
 * Product price %
 * fixed points
 */

const LightSelectBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  LightSelectInputProps
> = ({ label, options, error, ...rest }, ref) => {
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
          style={{
            padding: 16,
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </Select>
      </VStack>
    </FormControl>
  )
}

export const LightSelectInput = forwardRef(LightSelectBase)
