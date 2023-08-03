import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { FormControl, Input, InputProps } from '@chakra-ui/react'

interface LightInputProps extends InputProps {
  error?: FieldError
}

const LightInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  LightInputProps
> = ({ error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <Input
        h={[10, 12, 14]}
        p={[6, 8]}
        bgColor="white"
        borderWidth={1}
        borderColor="gray.700"
        w="100%"
        variant="filled"
        _placeholder={{
          textColor: 'gray.600',
        }}
        _hover={{
          borderColor: 'purple.900',
        }}
        _focus={{
          borderColor: 'purple.900',
          bgColor: 'gray.300',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
    </FormControl>
  )
}

export const LightInput = forwardRef(LightInputBase)
