import { UploadCloud } from 'lucide-react'
import { Text, Icon, Stack, VStack } from '@chakra-ui/react'
import { useFileInputContext } from '~contexts/FileListInputContext'

export function Trigger() {
  const { id } = useFileInputContext()

  return (
    <VStack
      w="100%"
      as="label"
      htmlFor={id}
      flex={1}
      gap={3}
      borderWidth={1}
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
      borderColor="gray.600"
      bgColor="gray.400"
      px={4}
      py={6}
      cursor="pointer"
      textAlign="center"
      textColor="gray.700"
      transition="ease-in 0.35s"
      _hover={{
        bgColor: 'gray.500',

        first: {
          bgColor: 'gray.500',
          borderColor: 'gray.700',
        },
      }}
    >
      <Stack
        w={14}
        h={14}
        borderRadius="full"
        borderWidth={3}
        borderColor="gray.600"
        bgColor="gray.400"
        p={2}
        alignItems="center"
        justifyContent="center"
        transition="ease-in 0.35s"
      >
        <Icon as={UploadCloud} w={6} h={6} strokeWidth={2} color="gray.700" />
      </Stack>
      <Stack>
        <Text as="span" fontSize={16} fontWeight={400} color="gray.700">
          <Text as="span" fontWeight={700} color="gray.900">
            Click to add
          </Text>{' '}
          or drag and drop product image
        </Text>
        <Text as="span">SVG, PNG, JPG or GIF (max. 800x400px)</Text>
      </Stack>
    </VStack>
  )
}
