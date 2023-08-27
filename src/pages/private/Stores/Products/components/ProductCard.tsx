import { memo, useCallback, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { motion, Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'

import { Loading } from '~components/Loading'
import { ICategoryDTO } from '~models/Category'
import { IProductStoreDTO } from '~models/Store'
import { usePutProductStatusMutation } from '~services/products.service'

import { Bullet } from './Bullet'

type ProductProps = {
  product: IProductStoreDTO
  onHandleSetUidToDelete: (uId: string) => void
}

function ProductCardComponent({
  product,
  onHandleSetUidToDelete,
}: ProductProps) {
  const isAvailableProduct = product.statusName === 'Active'

  const [isAvailable, setIsAvailable] = useState(isAvailableProduct)

  const navigate = useNavigate()
  const toast = useToast()

  const handleNavigateToEditProduct = useCallback(() => {
    navigate(`/products/edit-product/${product.uId}`)
  }, [navigate, product.uId])

  // SLIDER
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const textAnimate: Variants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 1 },
    },
  }

  const [
    updateStatus,
    { isLoading: isUpdatingStatus, isSuccess: updatedSuccessfully },
  ] = usePutProductStatusMutation()

  const handleUpdateProductStatus = useCallback(() => {
    /**
     * public enum EStatus
	{
		Active = 1,
		Inactive = 2,
		Excluded = 3,
		Issued = 4,
		Delivered = 5,
		Processing = 6
	}
     */
    updateStatus({
      statusId: isAvailable ? 2 : 1,
      uId: product.uId ?? '',
    })

    setIsAvailable(isAvailable)
  }, [updateStatus, isAvailable, product.uId])

  useEffect(() => {
    if (updatedSuccessfully) {
      const isAvailableString = isAvailable ? 'available' : 'unavailable'

      toast({
        title: `The product: ${product.name} was updated successfully`,
        description: `Now it will be ${isAvailableString} for your clients.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [updatedSuccessfully, isAvailable, toast, product.name])

  return (
    <Card w="100%" justifyContent="space-between">
      <CardHeader w="100%" p={0} className="keen-slider" ref={sliderRef}>
        {product.images.length > 1 && (
          <>
            {product.images.map((i) => (
              <Image
                key={i.imageUId}
                className="keen-slider__slide"
                alt={product.name}
                src={i.url}
                maxH="10rem"
                w="100%"
                fit="cover"
                borderRadius="md"
                fallbackSrc="https://via.placeholder.com/150"
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
              />
            ))}
            <HStack
              w="100%"
              mt={8}
              justifyContent="center"
              position="absolute"
              bottom={2}
            >
              <HStack spacing={2}>
                {product.images.length > 1 &&
                  product.images.map((item, index) => (
                    <Bullet
                      key={`${item.imageUId}`}
                      isActive={index === currentSlide}
                    />
                  ))}
              </HStack>
            </HStack>
          </>
        )}
        {product.images.length === 1 && (
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
            fallbackSrc="https://via.placeholder.com/150"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
          />
        )}
      </CardHeader>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.5 }}
      >
        <CardBody>
          <Stack mt="2" spacing="2">
            <motion.span variants={textAnimate}>
              <Heading
                fontSize={24}
                color="gray.900"
                fontWeight={700}
                noOfLines={1}
              >
                {product.name}
              </Heading>
            </motion.span>
            <HStack
              wrap="wrap"
              maxHeight="6rem"
              overflow="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  width: 0,
                },
              }}
            >
              {product.categories?.map((category: ICategoryDTO) => (
                <motion.span variants={textAnimate} key={category.uId}>
                  <Badge colorScheme="purple">{category.name}</Badge>
                </motion.span>
              ))}
            </HStack>
            <Text fontSize={16} color="gray.700" fontWeight={400}>
              {product.quantity} product(s)
            </Text>
            {product.promotion ? (
              <Box position="relative">
                <Text
                  position="absolute"
                  left="0%"
                  bottom="60%"
                  fontSize={14}
                  color="red.700"
                  fontWeight={500}
                  textDecor="line-through"
                >
                  ${product.price}
                </Text>
                <Text fontSize={20} color="purple.900" fontWeight={500}>
                  ${product.promotion.priceOff}
                </Text>
              </Box>
            ) : (
              <Text fontSize={20} color="purple.900" fontWeight={500}>
                ${product.price}
              </Text>
            )}
          </Stack>
        </CardBody>
      </motion.div>
      <CardFooter
        bgColor="gray.300"
        justifyContent="space-between"
        borderTopWidth={1}
        borderTopColor="gray.400"
      >
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
          {isUpdatingStatus ? (
            <Center p={4}>
              <Loading />
            </Center>
          ) : (
            <Switch
              isChecked={isAvailable}
              onChange={handleUpdateProductStatus}
            />
          )}
        </HStack>
      </CardFooter>
    </Card>
  )
}

export const ProductCard = memo(ProductCardComponent)
