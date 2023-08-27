import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Variants, motion } from 'framer-motion'
import {
  Badge,
  Card,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckCircle, Eye, Question, Trash } from '@phosphor-icons/react'

import { cashbackApi } from '~api/cashback-api.service'
import { Promotion } from '~models/Promotion'
import { distanceRelativeFromToday, formatDate } from '~utils/formatDate'
import { useDeletePromotionMutation } from '~services/promotion.service'

import { ShowProductsModal } from './ShowProductsModal'
import { DeletePromoModal } from './DeletePromoModal'

type PromotionCardProps = {
  item: Promotion
}

export function PromotionCard({ item }: PromotionCardProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })

  const dispatch = useDispatch()

  /** SHOW PRODUCTS MODAL */
  const {
    isOpen: isShowProductModal,
    onOpen: onOpenShowProductModal,
    onClose: onCloseShowProductModal,
  } = useDisclosure()

  /** DELETE PROMO MODAL */
  const {
    isOpen: isDeletePromotionModal,
    onOpen: onOpenDeletePromotionModal,
    onClose: onCloseDeletePromotionModal,
  } = useDisclosure()

  const startDate = formatDate(item.initialDate)
  const endDate = formatDate(item.endDate)

  const distance = distanceRelativeFromToday(item.initialDate)

  const [deletePromo, { isLoading: isDeleting, isSuccess: promoDeleted }] =
    useDeletePromotionMutation()

  const statusBadge = useMemo(() => {
    if (distance.includes('days')) {
      if (Number(distance.split('')[0]) <= 10) {
        return isWideVersion ? <Badge colorScheme="yellow">New</Badge> : null
      }

      return null
    }
  }, [distance, isWideVersion])

  const handleDeletePromo = useCallback(() => {
    deletePromo({
      uId: item.uId,
    })
  }, [deletePromo, item.uId])

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

  useEffect(() => {
    if (promoDeleted) {
      dispatch(cashbackApi.util.invalidateTags(['Promotion']))
    }
  }, [promoDeleted, dispatch])

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
                  <HStack>
                    <Heading
                      fontSize={24}
                      fontWeight={700}
                      color="gray.900"
                      noOfLines={1}
                    >
                      {item.name}
                    </Heading>
                  </HStack>
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
            <HStack spacing={2} ml="auto">
              <Icon
                as={Eye}
                w={6}
                h={6}
                color="gray.700"
                cursor="pointer"
                onClick={onOpenShowProductModal}
                _hover={{
                  opacity: 0.75,
                }}
              />
              <Icon
                as={Trash}
                w={6}
                h={6}
                color="gray.700"
                cursor="pointer"
                onClick={onOpenDeletePromotionModal}
                _hover={{
                  opacity: 0.75,
                }}
              />
            </HStack>
          </Grid>
        </Card>
      </motion.div>

      <ShowProductsModal
        promoName={item.name}
        data={item.products}
        isOpen={isShowProductModal}
        onClose={onCloseShowProductModal}
      />

      <DeletePromoModal
        promoName={item.name}
        isDeleting={isDeleting}
        isOpen={isDeletePromotionModal}
        onClose={onCloseDeletePromotionModal}
        onDelete={handleDeletePromo}
      />
    </>
  )
}
