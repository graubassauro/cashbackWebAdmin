import { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'

import { ICategoryDTO } from '~models/Category'
import { IProductStoreDTO } from '~models/Store'

type ProductProps = {
  product: IProductStoreDTO
  onHandleSetUidToDelete: (uId: string) => void
}

function ProductCardComponent({
  product,
  onHandleSetUidToDelete,
}: ProductProps) {
  const hasProducts = product.quantity > 0

  const [isAvailable, setIsAvailable] = useState(hasProducts)

  console.log(isAvailable)

  const navigate = useNavigate()

  const handleNavigateToEditProduct = useCallback(() => {
    navigate(`/products/edit-product/${product.uId}`)
  }, [navigate, product.uId])

  return (
    <Card w="100%">
      <CardHeader p="0">
        <Image
          src={
            product.images.length > 0
              ? product.images[0].url
              : 'https://github.com/thereallucas98.png'
          }
          alt={product.name}
          maxH="10rem"
          w="100%"
          fit="cover"
          borderRadius="md"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
        />
      </CardHeader>
      <CardBody>
        <Stack mt="2" spacing="2">
          <Heading
            fontSize={24}
            color="gray.900"
            fontWeight={700}
            noOfLines={2}
          >
            {product.name}
          </Heading>
          <HStack wrap="wrap">
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
      <CardFooter bgColor="gray.300" justifyContent="space-between">
        <ButtonGroup spacing="2">
          <IconButton
            aria-label="Edit Product"
            bgColor="white"
            transition="ease-in 0.35s"
            fontSize={18}
            fontWeight={700}
            _hover={{
              bgColor: 'purple.900',
              opacity: 0.85,
              svg: { fill: 'white' },
            }}
            icon={<Icon as={PencilSimpleLine} color="gray.700" size={32} />}
            onClick={handleNavigateToEditProduct}
          />
          <IconButton
            aria-label="Delete Product"
            bgColor="white"
            transition="ease-in 0.35s"
            fontSize={18}
            fontWeight={700}
            _hover={{
              bgColor: 'purple.900',
              svg: { fill: 'white' },
            }}
            icon={<Icon as={Trash} color="gray.700" size={32} />}
            onClick={() => onHandleSetUidToDelete(product.uId)}
          />
        </ButtonGroup>
        <HStack>
          <Text>{isAvailable ? 'Available' : 'Unavailable'}</Text>
          <Switch
            isChecked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
        </HStack>
      </CardFooter>
    </Card>
  )
}

export const ProductCard = memo(ProductCardComponent)
