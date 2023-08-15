import { useMemo } from 'react'
import { Variants, motion } from 'framer-motion'
import {
  Badge,
  Card,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckCircle, Eye, Question } from '@phosphor-icons/react'

import { Promotion } from '~models/Promotion'
import { distanceRelativeFromToday, formatDate } from '~utils/formatDate'

type PromotionCardProps = {
  item: Promotion
}

export function PromotionCard({ item }: PromotionCardProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const startDate = formatDate(item.initialDate)
  const endDate = formatDate(item.endDate)

  const distance = distanceRelativeFromToday(item.initialDate)

  const statusBadge = useMemo(() => {
    if (distance.includes('days')) {
      if (Number(distance.split('')[0]) <= 10) {
        return isWideVersion ? <Badge colorScheme="yellow">New</Badge> : null
      }

      return null
    }
  }, [distance, isWideVersion])

  const productsNames = item.products.map((p) => p.name).join(',')

  const cardAnimated: Variants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 1 },
    },
  }

  const textAnimate: Variants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 1 },
    },
  }

  return (
    <>
      <motion.div
        style={{
          width: '100%',
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.5 }}
        variants={cardAnimated}
      >
        <Card w="100%" p={6}>
          <Grid gap={2} templateColumns={['3fr 2fr 1fr']} alignItems="center">
            <Grid
              gap={2}
              templateColumns={['1fr', 'repeat(2, 1fr)']}
              alignItems="center"
            >
              <HStack>
                <motion.span variants={textAnimate}>
                  <Heading
                    fontSize={24}
                    fontWeight={700}
                    color="gray.900"
                    noOfLines={1}
                  >
                    {item.name}
                  </Heading>
                </motion.span>
                {statusBadge}
              </HStack>
              {isWideVersion ? (
                <Icon
                  as={item.status === 'Active' ? CheckCircle : Question}
                  w={8}
                  h={8}
                  color="gray.700"
                />
              ) : null}
            </Grid>
            <Grid gap={2} templateColumns={['2fr 1fr']} alignItems="center">
              {isWideVersion ? (
                <HStack>
                  <VStack spacing={0} alignItems="flex-start">
                    <Text
                      fontSize={10}
                      fontWeight={400}
                      fontFamily="body"
                      color="gray.600"
                    >
                      Initial Date
                    </Text>
                    <Heading
                      fontSize={16}
                      fontWeight={500}
                      fontFamily="heading"
                      color="gray.900"
                    >
                      {startDate}
                    </Heading>
                  </VStack>
                  <VStack spacing={0} alignItems="flex-start">
                    <Text
                      fontSize={10}
                      fontWeight={400}
                      fontFamily="body"
                      color="gray.600"
                    >
                      Final Date
                    </Text>
                    <Heading
                      fontSize={16}
                      fontWeight={500}
                      fontFamily="heading"
                      color="gray.900"
                    >
                      {endDate}
                    </Heading>
                  </VStack>
                </HStack>
              ) : null}
              <VStack spacing={0} alignItems="flex-start">
                <Text
                  fontSize={10}
                  fontWeight={400}
                  fontFamily="body"
                  color="gray.600"
                >
                  Products
                </Text>
                <Heading
                  title={productsNames}
                  fontSize={16}
                  fontWeight={500}
                  fontFamily="heading"
                  color="gray.900"
                  noOfLines={1}
                >
                  {productsNames}
                </Heading>
              </VStack>
            </Grid>
            <Icon
              ml="auto"
              as={Eye}
              w={6}
              h={6}
              color="gray.700"
              onClick={onOpen}
            />
          </Grid>
        </Card>
      </motion.div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
            {item.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily="body" fontSize={16} fontWeight="regular">
              All products vinculated to this promotion
            </Text>
            <VStack pt={4}>
              {item.products.map((p) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  spacing={2}
                  key={p.productUid}
                  borderBottomWidth={1}
                  borderBottomColor="gray.400"
                  pb={4}
                >
                  <VStack alignItems="flex-start">
                    <Text fontSize={14} fontWeight={700} color="gray.800">
                      {p.name}
                    </Text>
                    <Text fontSize={20} color="purple.900" fontWeight={500}>
                      ${p.promotionPriceOff}
                    </Text>
                  </VStack>
                  <HStack>
                    {p.images &&
                      p?.images.map((i) => (
                        <Image
                          key={i.productImageUId}
                          src={i.url}
                          alt={i.productImageUId}
                          w={10}
                          h={10}
                          borderRadius="full"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      ))}
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
