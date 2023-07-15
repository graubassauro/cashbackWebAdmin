import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'

import { ICategoryDTO } from '~models/Category'
import { IProductStoreDTO } from '~models/Store'

type ProductProps = {
  product: IProductStoreDTO
  onHandleSetUidToDelete: (uId: string) => void
}

export function ProductCard({ product, onHandleSetUidToDelete }: ProductProps) {
  return (
    <Card w="100%">
      <CardBody>
        <Image
          src="https://github.com/thereallucas98.png"
          alt="Green double couch with wooden legs"
          maxH="10rem"
          w="100%"
          fit="cover"
          borderRadius="md"
        />
        <Stack mt="4" spacing="2">
          <Heading
            fontSize={24}
            color="gray.900"
            fontWeight={700}
            noOfLines={2}
          >
            {product.name}
          </Heading>
          <HStack>
            {product.categories?.map((category: ICategoryDTO) => (
              <Badge colorScheme="purple" key={category.uId}>
                {category.name}
              </Badge>
            ))}
          </HStack>
          <Text fontSize={16} color="gray.700" fontWeight={400}>
            {product.quantity} product(s)
          </Text>
          <Text fontSize={20} color="purple.900" fontWeight={500}>
            ${product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider color="gray.400" />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            bgColor="purple.900"
            textColor="white"
            transition="ease-in 0.35s"
            fontSize={18}
            fontWeight={700}
            _hover={{
              bgColor: 'purple.900',
              opacity: 0.85,
            }}
            leftIcon={<Icon as={PencilSimpleLine} color="white" size={32} />}
          >
            Edit
          </Button>
          <Button
            borderWidth={1}
            borderRadius="md"
            borderColor="transparent"
            bgColor="transparent"
            transition="ease-in 0.35s"
            textColor="purple.900"
            fontSize={18}
            fontWeight={700}
            _hover={{
              bgColor: 'transparent',
              borderColor: 'purple.900',
            }}
            leftIcon={<Icon as={Trash} color="purple.900" size={32} />}
            onClick={() => onHandleSetUidToDelete(product.uId)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
