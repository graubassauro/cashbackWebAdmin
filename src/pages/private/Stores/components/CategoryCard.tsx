import {
  Card,
  Center,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { BagSimple, List, Plus } from '@phosphor-icons/react'

// import { ModalSelect } from '~components/Forms/ModalSelect'
import { ICategoryDTO } from '~models/Category'

type CategoryCardProps = {
  data: ICategoryDTO
}

export function CategoryCard({ data }: CategoryCardProps) {
  const { /* isOpen, onClose, */ onOpen } = useDisclosure()

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
      {/* <ModalSelect
        title="Select a category"
        data={data.categories}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </Card>
  )
}
