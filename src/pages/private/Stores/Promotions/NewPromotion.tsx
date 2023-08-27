import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Icon,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Plus, X } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cashbackApi } from '~api/cashback-api.service'
import { FormButton } from '~components/Buttons'
import { HeaderForm } from '~components/Forms/HeaderForm'
import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { Loading } from '~components/Loading'
import { BodyLayout } from '~layouts/Body'
import { PromotionGroup } from '~models/Promotion'
import { useAppSelector } from '~redux/store'
import {
  usePostPromotionGroupMutation,
  usePostVinculateProductToPromoMutation,
} from '~services/promotion.service'
import { useGetProductByNameQuery } from '~services/products.service'

const createStorePromotionSchema = z.object({
  name: z.string(),
  about: z.string(),
  highlight: z.string(),
  initialDate: z.string(),
  finalDate: z.string(),
})

const vinculateProductToPromotionSchema = z.object({
  priceOff: z.string(),
})

type CreateStorePromotionInputs = z.infer<typeof createStorePromotionSchema>
type VinculateProductToPromotionInputs = z.infer<
  typeof vinculateProductToPromotionSchema
>

const createPromotionTabs = ['promotion', 'product'] as const
type PromotionTabs = (typeof createPromotionTabs)[number]

function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const DEBOUNCEDELAY = 850

export function NewPromotion() {
  const [selectedTab, setSelectedTab] = useState<PromotionTabs>('promotion')
  const [productsUids, setProductsUids] = useState<string | null>()
  const [promo, setPromo] = useState<PromotionGroup | null>()

  const [searchProducts, setSearchProducts] = useState('')

  const dispatch = useDispatch()
  const store = useAppSelector((state) => state.merchant.currentStore)

  const debouncedProducts = useDebouncedValue(searchProducts, DEBOUNCEDELAY)

  const toast = useToast()
  const navigate = useNavigate()

  const {
    register: storePromoRegister,
    handleSubmit: storePromoHandleSubmit,
    reset: storePromoReset,
    formState: {
      errors: storePromoErrors,
      isSubmitting: storePromoIsSubmitting,
      isValid: storePromoIsValid,
    },
  } = useForm<CreateStorePromotionInputs>({
    resolver: zodResolver(createStorePromotionSchema),
    mode: 'onChange',
  })

  const {
    register: vinculateProductToPromoRegister,
    handleSubmit: vinculateProductToPromoHandleSubmit,
    reset: vinculateProductToPromoReset,
    formState: {
      errors: vinculateProductToPromoErrors,
      isSubmitting: vinculateProductToPromoIsSubmitting,
      isValid: vinculateProductToPromoIsValid,
    },
  } = useForm<VinculateProductToPromotionInputs>({
    resolver: zodResolver(vinculateProductToPromotionSchema),
    mode: 'onChange',
  })

  const [
    createPromotionGroup,
    {
      data: proGroup,
      isLoading: isCreatingProGroup,
      isSuccess: createdProGroup,
    },
  ] = usePostPromotionGroupMutation()

  const [
    vinculateProductToPromo,
    { isLoading: isVinculatingProToPromo, isSuccess: productWasVinculated },
  ] = usePostVinculateProductToPromoMutation()

  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useGetProductByNameQuery(
    {
      name: debouncedProducts,
      uid: store?.uId ?? '',
    },
    {
      skip:
        !debouncedProducts ||
        debouncedProducts.length === 0 ||
        debouncedProducts === '',
    },
  )

  const handleCreateStorePromotion = useCallback(
    (data: CreateStorePromotionInputs) => {
      createPromotionGroup({
        name: data.name,
        about: data.about,
        highlight: data.highlight,
        initialDate: data.initialDate,
        finalDate: data.finalDate,
        storeUId: store?.uId ?? '',
      })
    },
    [createPromotionGroup, store?.uId],
  )

  const handleVinculateProductToPromo = useCallback(
    (data: VinculateProductToPromotionInputs) => {
      vinculateProductToPromo({
        promotionUid: promo?.uId ?? '',
        productUid: productsUids ?? '',
        priceOff: Number(data.priceOff),
      })
    },
    [vinculateProductToPromo, productsUids, promo?.uId],
  )

  const handleSetNewProductUids = useCallback((uId: string) => {
    setProductsUids(uId)
  }, [])

  const promotionForm = useMemo(() => {
    return (
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={storePromoHandleSubmit(handleCreateStorePromotion)}
      >
        <LabelInput
          label="Name"
          id="name"
          {...storePromoRegister('name')}
          error={storePromoErrors.name}
        />
        <LabelTextarea
          label="Description"
          id="about"
          {...storePromoRegister('about')}
          error={storePromoErrors.about}
        />
        <LabelInput
          label="Hightlight"
          id="highlight"
          {...storePromoRegister('highlight')}
          error={storePromoErrors.highlight}
        />
        <Grid
          gap={2}
          gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          w="100%"
        >
          <LabelInput
            label="Initial Date"
            id="initialDate"
            type="date"
            {...storePromoRegister('initialDate')}
            error={storePromoErrors.initialDate}
          />

          <LabelInput
            label="Finish Date"
            id="finalDate"
            type="date"
            {...storePromoRegister('finalDate')}
            error={storePromoErrors.finalDate}
          />
        </Grid>
        <FormButton
          type="submit"
          title="Create"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={storePromoIsSubmitting || isCreatingProGroup}
          disabled={storePromoIsSubmitting || !storePromoIsValid}
        />
      </VStack>
    )
  }, [
    storePromoErrors.about,
    storePromoErrors.highlight,
    storePromoErrors.initialDate,
    storePromoErrors.finalDate,
    storePromoErrors.name,
    handleCreateStorePromotion,
    storePromoHandleSubmit,
    storePromoRegister,
    storePromoIsSubmitting,
    isCreatingProGroup,
    storePromoIsValid,
  ])

  const productsForm = useMemo(() => {
    return (
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={vinculateProductToPromoHandleSubmit(
          handleVinculateProductToPromo,
        )}
      >
        <LabelInput
          label="Price Off"
          id="priceOff"
          {...vinculateProductToPromoRegister('priceOff')}
          error={vinculateProductToPromoErrors.priceOff}
        />
        <Divider color="gray.400}" />
        <LabelInput
          label="Search for a product"
          placeholder="Type at least 2 caracteres"
          onChange={(e) => setSearchProducts(e.target.value)}
          id="product"
        />
        <VStack w="100%" mt={8} alignItems="center" justifyContent="center">
          {isProductsFetching || isProductsLoading ? (
            <Center w="100%">
              <Loading />
            </Center>
          ) : (
            <Flex rowGap={2} columnGap={4} wrap="wrap" flex={1} w="100%">
              {products?.data.map((item) => (
                <Button
                  borderWidth={1}
                  borderColor="purple.900"
                  bgColor={
                    productsUids === item.uId ? 'purple.900' : 'transparent'
                  }
                  textColor={productsUids === item.uId ? 'white' : 'purple.900'}
                  _hover={{
                    bgColor: 'purple.900',
                    color: 'white',
                    svg: {
                      fill: 'white',
                    },
                  }}
                  transition="ease-in 0.35s"
                  rightIcon={
                    <Icon as={productsUids === item.uId ? X : Plus} size={18} />
                  }
                  key={item.uId}
                  onClick={() => handleSetNewProductUids(item.uId)}
                >
                  {item.name}
                </Button>
              ))}
            </Flex>
          )}
          {/* INPUT FILED */}
        </VStack>
        <FormButton
          type="submit"
          title="Vinculate product"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={
            vinculateProductToPromoIsSubmitting || isVinculatingProToPromo
          }
          disabled={
            vinculateProductToPromoIsSubmitting ||
            !vinculateProductToPromoIsValid
          }
        />
      </VStack>
    )
  }, [
    vinculateProductToPromoErrors.priceOff,
    vinculateProductToPromoRegister,
    vinculateProductToPromoIsSubmitting,
    vinculateProductToPromoIsValid,
    handleSetNewProductUids,
    handleVinculateProductToPromo,
    isProductsFetching,
    isProductsLoading,
    products?.data,
    productsUids,
    vinculateProductToPromoHandleSubmit,
    isVinculatingProToPromo,
  ])

  const stepTab = useMemo((): Record<
    PromotionTabs,
    React.JSX.Element | null
  > => {
    return {
      promotion: promotionForm,
      product: productsForm,
    }
  }, [promotionForm, productsForm])

  useEffect(() => {
    if (createdProGroup && proGroup) {
      dispatch(cashbackApi.util.invalidateTags(['Promotion']))

      toast({
        title: `New promotion was created`,
        description: 'Now you can vinculate one product',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })

      storePromoReset()
      setPromo(proGroup.data)
      setSelectedTab('product')
    }
  }, [createdProGroup, proGroup, toast, storePromoReset, dispatch])

  useEffect(() => {
    if (productWasVinculated) {
      toast({
        title: `Yeah!`,
        description: 'The product was successfully vinculated to promotion',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })

      dispatch(cashbackApi.util.invalidateTags(['Promotion']))

      vinculateProductToPromoReset()
      navigate(-1)
    }
  }, [
    productWasVinculated,
    toast,
    vinculateProductToPromoReset,
    navigate,
    dispatch,
  ])

  return (
    <BodyLayout>
      <Box mt="4" px="4" py="5" borderRadius={10} bgColor="white">
        <HeaderForm title="New promotion" />
        {stepTab[selectedTab]}
      </Box>
    </BodyLayout>
  )
}
