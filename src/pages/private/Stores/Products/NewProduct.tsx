import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { VStack, Grid, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormButton } from '~components/Buttons'
import {
  ButtonInput,
  LabelInput,
  LabelTextarea,
} from '~components/Forms/Inputs'
import { LightSelectInput, SelectOptions } from '~components/Forms/Select'
import { Container } from '~layouts/Container'
import { useGetAllCategoriesQuery } from '~services/category.service'
import { useGetBrandsByStoreUidQuery } from '~services/brands.service'
import { useCurrentStore } from '~redux/auth'
import { ModalSelect } from '~components/Forms/ModalSelect'

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
  brand: z.string(),
  about: z.string(),
  quantity: z.number(),
  price: z.number(),
  pointGain: z.string(),
  pointGainValue: z.number(),
  category: z.string(),
})

type CreateStoreProductInputs = z.infer<typeof createStoreProductSchema>

export function NewProduct() {
  const [modalListType, setModalListType] = useState<'category' | 'brand'>(
    'category',
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const store = useCurrentStore()

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
      console.log(data)
    },
    [],
  )

  const handleOpenCorrectModal = useCallback(
    (type: 'brand' | 'category') => {
      setModalListType(type)
      onOpen()
    },
    [onOpen],
  )

  const modalTitle =
    modalListType === 'brand' ? 'Select a brand' : 'Select a category'

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
          <LightSelectInput label="Point gain option" options={selectOptions} />
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
            title="Select Category"
            isLoading={isLoadingButton}
            onClick={() => handleOpenCorrectModal('category')}
          />
          <ButtonInput
            label="Brand"
            title="Select Brand"
            onClick={() => handleOpenCorrectModal('brand')}
          />
        </Grid>
        <FormButton
          type="submit"
          title="Create"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </VStack>
      <ModalSelect
        title={modalTitle}
        data={whoDataShouldBeListed}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  )
}
