import { Input, InputProps, Text, VStack } from '@chakra-ui/react'

type LabelInputProps = InputProps & {
  label: string
}

export function LabelInput({ label, ...rest }: LabelInputProps) {
  return (
    <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
      <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
        {label}
      </Text>
      <Input
        w="100%"
        h={12}
        color="gray.800"
        borderRadius="10"
        borderWidth={1}
        borderColor="gray.600"
        bgColor="gray.400"
        variant="unstyled"
        px="4"
        mr="4"
        {...rest}
      />
    </VStack>
  )
}
