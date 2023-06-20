import { Input, InputProps } from '@chakra-ui/react'

interface LightInputProps extends InputProps {}

export function LightInput({ ...rest }: LightInputProps) {
  return (
    <Input
      h={54}
      p={8}
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
      {...rest}
    />
  )
}
