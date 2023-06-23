import { Center, Icon, Input, InputProps, Text, VStack } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'

type LabelFileInputProps = InputProps & {
  label: string
}

export function LabelFileInput({ label, ...rest }: LabelFileInputProps) {
  return (
    <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
      <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
        {label}
      </Text>
      <Center
        as="label"
        w="100%"
        h={320}
        color="gray.800"
        borderRadius="10"
        borderWidth={1}
        borderStyle="dotted"
        borderColor="gray.600"
        bgColor="gray.400"
        px="4"
        mr="4"
      >
        <Icon as={Plus} size={72} color="yellow.700" />
        <Input display="none" type="file" {...rest} />
      </Center>
    </VStack>
  )
}
