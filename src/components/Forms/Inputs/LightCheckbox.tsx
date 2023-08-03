import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  HStack,
  Text,
} from '@chakra-ui/react'

interface LightCheckboxProps extends CheckboxProps {
  label: string
  error?: FieldError
}

const LightCheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  LightCheckboxProps
> = ({ label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <HStack
        as="label"
        spacing={2}
        alignItems="flex-start"
        px={2}
        pt={4}
        w="100%"
      >
        <Checkbox
          borderColor="gray.700"
          variant="filled"
          size="lg"
          ref={ref}
          {...rest}
        />
        <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
          {label}
        </Text>
      </HStack>
    </FormControl>
  )
}

export const LightCheckbox = forwardRef(LightCheckboxBase)
