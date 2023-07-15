import { useCallback, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack, Grid, useDisclosure, useToast } from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { FormButton } from '~components/Buttons'
import {
  ButtonInput,
  LabelInput,
  LabelTextarea,
} from '~components/Forms/Inputs'
import { ModalSelect } from '~components/Forms/ModalSelect'
import { LightSelectInput, SelectOptions } from '~components/Forms/Select'
import { useModalSelectData } from './hooks/useModalSelectData'
import { Container } from '~layouts/Container'
import { useCurrentStore } from '~redux/auth'
import { useGetAllCategoriesQuery } from '~services/category.service'
import { useGetBrandsByStoreUidQuery } from '~services/brands.service'
import {
  ICreateProductForStoreBody,
  usePostCreateProductForStoreMutation,
} from '~services/products.service'

const selectOptions: SelectOptions[] = [
  {
    key: 'product-price',
    label: 'Product price %',
  },
  {
    key: 'fixed-points',
    label: 'Fixed points',
  },
]

const createStoreProductSchema = z.object({
  name: z.string(),
  about: z.string(),
  quantity: z.string(),
  price: z.string(),
  pointGain: z.string(),
  pointGainValue: z.string(),
})

type CreateStoreProductInputs = z.infer<typeof createStoreProductSchema>

export function NewProduct() {
  const [modalListType, setModalListType] = useState<'category' | 'brand'>(
    'category',
  )

  const modalTitle = modalListType === 'brand' ? 'Brands' : 'Categories'

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const store = useCurrentStore()
  const dispatch = useDispatch()

  const {
    selectedCategory,
    selectedBrand,
    handleSetSelectedCategory,
    handleSetSelectedBrand,
  } = useModalSelectData()

  /**
   * API
   */
  const {
    data: categories,
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  const {
    data: brands,
    isFetching: isFetchingBrands,
    isLoading: isLoadingBrands,
  } = useGetBrandsByStoreUidQuery({ uId: store?.uId ?? '' })

  const [
    createProduct,
    { isSuccess: createdProduct, isLoading: isCreatingProduct },
  ] = usePostCreateProductForStoreMutation()

  //

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateStoreProductInputs>({
    resolver: zodResolver(createStoreProductSchema),
    mode: 'onChange',
  })

  const handleCreateNewProduct = useCallback(
    (data: CreateStoreProductInputs) => {
      const body: ICreateProductForStoreBody = {
        name: data.name,
        price: Number(data.price),
        quantity: Number(data.quantity),
        storeUId: store?.uId ?? '',
        highlight: '',
        about: data.about,
        brandId: selectedBrand?.id ?? 0,
        cashbackType: data.pointGain,
        points: Number(data.pointGainValue),
        categories: [selectedCategory?.id],
      }

      createProduct(body)
    },
    [selectedBrand?.id, selectedCategory?.id, store?.uId, createProduct],
  )

  const handleOpenCorrectModal = useCallback(
    (type: 'brand' | 'category') => {
      setModalListType(type)
      onOpen()
    },
    [onOpen],
  )

  const isLoadingButton =
    isFetchingCategories ||
    isLoadingCategories ||
    isFetchingBrands ||
    isLoadingBrands

  const whoDataShouldBeListed = useMemo(() => {
    if (categories && modalListType === 'category') {
      return categories?.data
    }

    if (brands && modalListType === 'brand') {
      return brands?.data.brands
    }

    return []
  }, [modalListType, categories, brands])

  useEffect(() => {
    if (createdProduct) {
      dispatch(cashbackApi.util.invalidateTags(['Product']))

      toast({
        title: `New product was created`,
        description: 'Now your clients you be able to buy it!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [dispatch, createdProduct, toast])

  return (
    <Container hasGoBackButton title="New Product">
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={handleSubmit(handleCreateNewProduct)}
      >
        <LabelInput
          label="Name"
          id="name"
          {...register('name')}
          error={errors.name}
        />

        <LabelTextarea
          label="Description"
          id="about"
          {...register('about')}
          error={errors.about}
        />
        <Grid
          gap={2}
          gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          w="100%"
        >
          <LabelInput
            label="Quantity"
            id="quantity"
            {...register('quantity')}
            error={errors.quantity}
          />
          <LabelInput
            label="Price ($)"
            id="price"
            {...register('price')}
            error={errors.price}
          />
        </Grid>
        <Grid
          gap={2}
          w="100%"
          alignItems="center"
          templateColumns={['1fr', '4fr 1fr']}
        >
          <LightSelectInput
            label="Point gain option"
            id="pointGain"
            {...register('pointGain')}
            error={errors.pointGain}
            options={selectOptions}
          />
          <LabelInput
            label="Value"
            id="pointGainValue"
            {...register('pointGainValue')}
            error={errors.pointGainValue}
          />
        </Grid>
        <Grid
          gap={2}
          w="100%"
          alignItems="center"
          templateColumns={['1fr', '1fr', '1fr 1fr']}
        >
          <ButtonInput
            label="Category"
            title={selectedCategory?.name}
            isLoading={isLoadingButton}
            onClick={() => handleOpenCorrectModal('category')}
          />
          <ButtonInput
            label="Brand"
            title={selectedBrand?.name}
            onClick={() => handleOpenCorrectModal('brand')}
          />
        </Grid>
        <FormButton
          type="submit"
          title="Create"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={isSubmitting || isCreatingProduct}
          disabled={isSubmitting || !isValid}
        />
      </VStack>
      <ModalSelect
        title={modalTitle}
        data={whoDataShouldBeListed}
        isOpen={isOpen}
        onClose={onClose}
        handleSetSelectedCategory={handleSetSelectedCategory}
        handleSetSelectedBrand={handleSetSelectedBrand}
      />
    </Container>
  )
}
