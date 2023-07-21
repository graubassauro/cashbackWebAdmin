import {
  Box,
  Center,
  Icon,
  Image,
  Input,
  InputProps,
  VStack,
} from '@chakra-ui/react'
import { Plus, X } from '@phosphor-icons/react'

type LabelFileInputProps = InputProps & {
  index: number
  selectedFile?: File
  onHandleRemoveFile: (position: number) => void
}

export function LabelFileInput({
  index,
  selectedFile,
  onHandleRemoveFile,
  ...rest
}: LabelFileInputProps) {
  return (
    <VStack
      as={selectedFile ? 'div' : 'label'}
      spacing={1}
      alignItems="flex-start"
      minW="6.875rem"
      h={['6.875rem']}
    >
      {selectedFile ? (
        <Box position="relative">
          <Image
            w="100%"
            h={['6.875rem']}
            minW="6.875rem"
            borderRadius="1rem"
            src={URL.createObjectURL(selectedFile)}
            alt="File preview"
            objectFit="cover"
          />
          <Icon
            as={X}
            size={24}
            color="yellow.700"
            position="absolute"
            bgColor="gray.400"
            w="2.5rem"
            h="2rem"
            borderTopLeftRadius={0}
            borderTopRightRadius="1rem"
            borderBottomLeftRadius="1rem"
            top={-0.5}
            right={-0.3}
            onClick={() => onHandleRemoveFile(index)}
            _hover={{
              cursor: 'pointer',
            }}
          />
        </Box>
      ) : (
        <Center
          as="label"
          w="100%"
          h={320}
          color="gray.800"
          borderRadius="10"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="gray.600"
          bgColor="gray.400"
          px="4"
          mr="4"
          cursor="pointer"
        >
          <Icon as={Plus} size={72} color="yellow.700" />
          <Input display="none" type="file" {...rest} />
        </Center>
      )}
    </VStack>
  )
}
