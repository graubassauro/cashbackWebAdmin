import {
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { BagSimple, List, Plus } from '@phosphor-icons/react'

import { ICategoryDTO } from '~models/Category'

type CategoryCardProps = {
  data: ICategoryDTO
}

export function CategoryCard({ data }: CategoryCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card
      w="100%"
      h="16rem"
      p={4}
      bgColor="white"
      alignItems="flex-start"
      _hover={{
        bgColor: 'white',
        opacity: 0.8,
      }}
    >
      {/* Header */}
      <HStack
        borderBottomWidth={1}
        w="100%"
        py={4}
        px={4}
        justifyContent="space-between"
      >
        <Icon
          as={List}
          w={6}
          h={6}
          color="gray.700"
          _hover={{
            cursor: 'pointer',
          }}
          onClick={onOpen}
        />
        <Icon
          as={Plus}
          w={6}
          h={6}
          color="gray.700"
          _hover={{
            cursor: 'pointer',
          }}
          onClick={onOpen}
        />
      </HStack>
      <Center mt={4} gap={4} m="auto 0">
        <Icon as={BagSimple} w={10} h={10} color="yellow.700" />
        <VStack alignItems="flex-start" spacing={0}>
          <Heading
            fontSize={32}
            fontFamily="heading"
            color="gray.800"
            noOfLines={1}
          >
            {data.name}
          </Heading>
          <HStack spacing={2}>
            <Text
              fontSize={18}
              fontFamily="body"
              fontWeight={700}
              color="gray.700"
            >
              {data.categories.length} categories
            </Text>
          </HStack>
        </VStack>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
            Children categories
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily="body" fontSize={16} fontWeight="regular">
              Here is the <strong>{data.name}</strong>
              {''} children categories. You can add to your store product or see
              its children as well.
            </Text>
            <Flex rowGap={2} columnGap={4} wrap="wrap" flex={1} w="100%">
              {data.categories.map((category) => (
                <Button
                  borderRadius={6}
                  borderWidth={1}
                  borderColor="white"
                  bgColor="white"
                  textColor="purple.900"
                  transition="border-color .35s"
                  _hover={{
                    borderColor: 'purple.900',
                  }}
                  key={category.id}
                >
                  {category.name}
                </Button>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              borderRadius={6}
              bgColor="purple.900"
              textColor="white"
              mr={3}
              onClick={onClose}
              isLoading={false}
              _hover={{
                opacity: 0.8,
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}
