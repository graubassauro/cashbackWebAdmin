import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack, Grid, useDisclosure, useToast } from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { FormButton } from '~components/Buttons'
import {
  ButtonInput,
  LabelFileInput,
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
  usePostToReceiveURLToSaveProductImageMutation,
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
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)

  const handleAddFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files?.[0]
      setSelectedFiles((prevState) => [...(prevState ?? []), file])
    }
  }, [])

  const handleRemoveFileFromIndex = useCallback(
    (position: number) => {
      const filteredFilesArray =
        selectedFiles?.filter((_, index) => index !== position) ?? []

      setSelectedFiles(filteredFilesArray ?? [])
    },
    [selectedFiles],
  )

  const modalTitle = modalListType === 'brand' ? 'Brands' : 'Categories'

  const toast = useToast()
  // Hook to select brand or categories
  const {
    isOpen: isSelectButtonOpen,
    onOpen: onOpenSelectButton,
    onClose: onCloseSelectButton,
  } = useDisclosure()
  // hook to unselect brand or categories
  const {
    isOpen: isUnselectButtonOpen,
    onOpen: onOpenUnselectButton,
    onClose: onCloseUnselectButton,
  } = useDisclosure()
  const store = useCurrentStore()
  const dispatch = useDispatch()

  const {
    selectedCategory,
    selectedBrand,
    handleSetSelectedCategory,
    handleRemoveSelectedCategory,
    handleSetSelectedBrand,
    handleRemoveSelectedBrand,
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
    {
      data: productCreated,
      isSuccess: createdProduct,
      isLoading: isCreatingProduct,
    },
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
      const categoriesId = selectedCategory
        .filter((category) => category.id !== 0)
        .map((category) => category.id)

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
        categories: categoriesId,
      }

      createProduct(body)
    },
    [selectedBrand?.id, selectedCategory, store?.uId, createProduct],
  )

  const handleOpenCorrectModal = useCallback(
    (type: 'brand' | 'category') => {
      setModalListType(type)
      onOpenSelectButton()
    },
    [onOpenSelectButton],
  )

  const whoDataShouldBeListed = useMemo(() => {
    if (categories && modalListType === 'category') {
      return categories?.data
    }

    if (brands && modalListType === 'brand') {
      return brands?.data.brands
    }

    return []
  }, [modalListType, categories, brands])

  const categoriesLabel =
    selectedCategory.length > 1
      ? selectedCategory
          .filter((category) => category.id !== 0)
          .map((category) => category.name)
          .join(', ')
      : selectedCategory[0].name

  const [
    requestImageURL,
    { isSuccess: isRequested, data: requestUrl, isLoading: isRequestingUrl },
  ] = usePostToReceiveURLToSaveProductImageMutation()

  const fetchSelectedFilesAsBinary = useCallback(
    async (url: string) => {
      if (!selectedFiles) {
        toast({
          title: `No file was provided`,
          description: 'This product will be create without images',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      const fetchPromises: Promise<Response>[] = selectedFiles.map((file) => {
        const formData = new FormData()
        formData.append('file', file)

        const headers = new Headers()
        headers.append('Content-Type', file.type)
        headers.append('x-ms-blob-type', 'BlockBlob')

        return fetch(url, {
          method: 'PUT',
          body: formData,
          headers,
        })
      })

      try {
        const responses = await Promise.all(fetchPromises)
        const successfulResponses = responses.filter((response) => response.ok)
        if (successfulResponses) {
          dispatch(cashbackApi.util.invalidateTags(['Product']))

          toast({
            title: `New product was created`,
            description: 'Now your clients you be able to buy it!',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      } catch (error) {
        toast({
          title: `New product was created`,
          description: 'But we could not add the images',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    },
    [dispatch, selectedFiles, toast],
  )

  /**
   * useEffect to create product
   */
  useEffect(() => {
    if (createdProduct && productCreated) {
      requestImageURL({
        storeUId: store?.uId ?? '',
        productUId: productCreated.data.uId,
      })
    }
  }, [createdProduct, productCreated, requestImageURL, store?.uId])

  /**
   * useEffect to request Image URL to send photos
   */
  useEffect(() => {
    if (isRequested && requestUrl) {
      fetchSelectedFilesAsBinary(requestUrl.data.url)
    }
  }, [isRequested, requestUrl, fetchSelectedFilesAsBinary])

  const isLoadingButton =
    isFetchingCategories ||
    isLoadingCategories ||
    isFetchingBrands ||
    isLoadingBrands ||
    isRequestingUrl

  const filteredCategories = selectedCategory.filter((c) => c.uId !== '')

  const selectedsData = [...filteredCategories, selectedBrand]

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
          justifyContent="center"
          templateColumns={[
            '1fr',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
            'repeat(6, 1fr)',
          ]}
        >
          <LabelFileInput
            index={0}
            selectedFile={selectedFiles?.[0]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
          />
          <LabelFileInput
            index={1}
            selectedFile={selectedFiles?.[1]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
          />
          <LabelFileInput
            index={2}
            selectedFile={selectedFiles?.[2]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
          />
          <LabelFileInput
            index={3}
            selectedFile={selectedFiles?.[3]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
          />
          <LabelFileInput
            index={4}
            selectedFile={selectedFiles?.[4]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
          />
          <LabelFileInput
            index={5}
            selectedFile={selectedFiles?.[5]}
            onChange={handleAddFile}
            onHandleRemoveFile={handleRemoveFileFromIndex}
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
            title={categoriesLabel}
            modalButton="category"
            isLoading={isLoadingButton}
            hasSelectedItems={selectedCategory.length > 1}
            onHandleOpenCorrectModal={handleOpenCorrectModal}
            onHandleOpenCorrectUnselectModal={onOpenUnselectButton}
          />
          <ButtonInput
            label="Brand"
            title={selectedBrand?.name}
            modalButton="brand"
            isLoading={isLoadingButton}
            hasSelectedItems={selectedBrand.name !== 'Select brand'}
            onHandleOpenCorrectModal={handleOpenCorrectModal}
            onHandleOpenCorrectUnselectModal={onOpenUnselectButton}
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
        isOpen={isSelectButtonOpen}
        onClose={onCloseSelectButton}
        handleSetSelectedCategory={handleSetSelectedCategory}
        handleSetSelectedBrand={handleSetSelectedBrand}
      />

      <ModalSelect
        title={modalTitle}
        data={selectedsData}
        isUnSelectModal
        isOpen={isUnselectButtonOpen}
        onClose={onCloseUnselectButton}
        handleSetSelectedCategory={handleSetSelectedCategory}
        handleRemoveSelectedCategory={handleRemoveSelectedCategory}
        handleSetSelectedBrand={handleSetSelectedBrand}
        handleRemoveSelectedBrand={handleRemoveSelectedBrand}
      />
    </Container>
  )
}
