import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  VStack,
  Grid,
  useDisclosure,
  useToast,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'

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
import { Title } from '~components/Typograph/Title'
import { BodyLayout } from '~layouts/Body'
import { Loading } from '~components/Loading'
import { useAppSelector } from '~redux/store'
import { useGetAllCategoriesQuery } from '~services/category.service'
import { useGetBrandsByStoreUidQuery } from '~services/brands.service'
import {
  ICreateProductForStoreBody,
  useGetProductQuery,
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

export function EditProduct() {
  const [modalListType, setModalListType] = useState<'category' | 'brand'>(
    'category',
  )
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)
  const [imageUrl, setImageUrl] = useState<string[] | null>(null)
  const [currentSelectedFileIndex, setCurrentSelectedFileIndex] = useState(0)

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

      const filteredFilesStringArray =
        imageUrl?.filter((_, index) => index !== position) ?? []

      setSelectedFiles(filteredFilesArray ?? [])
      setImageUrl(filteredFilesStringArray ?? [])
    },
    [selectedFiles, imageUrl],
  )

  const modalTitle = modalListType === 'brand' ? 'Brands' : 'Categories'

  const { id } = useParams()

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
  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })
  const dispatch = useDispatch()
  const { selectedCategory, selectedBrand } = useAppSelector(
    (state) => state.form,
  )

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

  const {
    data: product,
    isLoading: isLoadingProduct,
    isSuccess: isProductLoaded,
  } = useGetProductQuery({
    uId: id ?? '',
  })

  //

  const {
    register,
    handleSubmit,
    setValue,
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
        brandId: selectedBrand.id ?? 0,
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

  /**
   * useEffect to create product
   */
  useEffect(() => {
    if (createdProduct && productCreated) {
      requestImageURL({
        storeUId: store?.uId ?? '',
        productUId: productCreated.data.uId,
      })

      toast({
        title: `New product was created`,
        description: 'We are adding the product images',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [createdProduct, productCreated, requestImageURL, store?.uId, toast])

  // Define the function to upload an image using Axios
  const uploadImage = useCallback(
    async (file: File, requestUrl: string): Promise<void> => {
      try {
        const response: AxiosResponse = await axios.put(requestUrl, file, {
          headers: {
            'Content-Type': file.type,
            'x-ms-blob-type': 'BlockBlob',
          },
        })

        if (response.status === 201) {
          dispatch(cashbackApi.util.invalidateTags(['Product']))
          toast({
            title: `Image uploaded successfully`,
            description:
              'Now your clients you be able to see picture about your new product!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })

          if (
            selectedFiles &&
            currentSelectedFileIndex < selectedFiles.length
          ) {
            requestImageURL({
              storeUId: store?.uId ?? '',
              productUId: productCreated?.data.uId ?? '',
            })
            setCurrentSelectedFileIndex(currentSelectedFileIndex + 1)
          }
        } else {
          // TODO:
        }
      } catch (error) {
        console.log('Image upload FAILED', error)
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
    [
      dispatch,
      currentSelectedFileIndex,
      productCreated?.data.uId,
      requestImageURL,
      selectedFiles,
      store?.uId,
      toast,
    ],
  )

  useEffect(() => {
    if (isRequested && requestUrl) {
      if (!selectedFiles) {
        toast({
          title: `No file was provided`,
          description: 'This product will be created without images',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      if (currentSelectedFileIndex + 1 < selectedFiles.length) {
        uploadImage(
          selectedFiles[currentSelectedFileIndex],
          requestUrl.data.url,
        )
      }
    }
  }, [
    isRequested,
    requestUrl,
    selectedFiles,
    toast,
    uploadImage,
    currentSelectedFileIndex,
  ])

  /**
   * useEffect to load the product to edit
   */
  useEffect(() => {
    if (isProductLoaded && product) {
      setValue('name', product?.data?.name ?? '')
      setValue('quantity', String(product?.data?.quantity) ?? '')
      setValue('price', String(product?.data?.price) ?? '')
      setValue('pointGain', product?.data?.cashbackType ?? '')
      setValue('pointGainValue', String(product?.data?.points) ?? '')

      // mount categories
      //   product.data.categories.forEach((category) => {
      //     const categoryPayload: ICategoryDTO = {
      //       id: category.id,
      //       uid: category.uid,
      //     }
      //     handleSetSelectedBrand(category)
      // })
      // mount brand
      if (product?.data.images.length > 0) {
        const imagesUrls = product?.data.images.map((image) => image.url)

        setImageUrl(imagesUrls)
      }
    }
  }, [isProductLoaded, product, setValue])

  const isLoadingButton =
    isFetchingCategories ||
    isLoadingCategories ||
    isFetchingBrands ||
    isLoadingBrands ||
    isRequestingUrl

  const filteredCategories = selectedCategory.filter((c) => c.uId !== '')

  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <BodyLayout>
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <Box mt="4" px="4" py="5" borderRadius={10} bgColor="white">
          <HStack w="100%" justifyContent="space-between">
            <Icon
              as={ArrowLeft}
              w={8}
              h={8}
              borderRadius={6}
              color="gray.700"
              transition="ease-in 0.35s"
              _hover={{
                bgColor: 'gray.700',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleGoBack}
            />

            <Title title="Edit product" />
          </HStack>
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
                backgroundImageString={imageUrl?.[0]}
                onChange={handleAddFile}
                onHandleRemoveFile={handleRemoveFileFromIndex}
              />
              <LabelFileInput
                index={1}
                selectedFile={selectedFiles?.[1]}
                backgroundImageString={imageUrl?.[1]}
                onChange={handleAddFile}
                onHandleRemoveFile={handleRemoveFileFromIndex}
              />
              <LabelFileInput
                index={2}
                selectedFile={selectedFiles?.[2]}
                backgroundImageString={imageUrl?.[2]}
                onChange={handleAddFile}
                onHandleRemoveFile={handleRemoveFileFromIndex}
              />
              <LabelFileInput
                index={3}
                selectedFile={selectedFiles?.[3]}
                backgroundImageString={imageUrl?.[3]}
                onChange={handleAddFile}
                onHandleRemoveFile={handleRemoveFileFromIndex}
              />
              <LabelFileInput
                index={4}
                selectedFile={selectedFiles?.[4]}
                backgroundImageString={imageUrl?.[4]}
                onChange={handleAddFile}
                onHandleRemoveFile={handleRemoveFileFromIndex}
              />
              <LabelFileInput
                index={5}
                selectedFile={selectedFiles?.[5]}
                backgroundImageString={imageUrl?.[5]}
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
                title={selectedBrand?.name ?? 'Select brand'}
                modalButton="brand"
                isLoading={isLoadingButton}
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
          />

          {/* MODAL TO UNSELECT ITEMS */}

          <ModalSelect
            title={modalTitle}
            data={filteredCategories}
            isUnSelectModal
            isOpen={isUnselectButtonOpen}
            onClose={onCloseUnselectButton}
          />
        </Box>
      )}
    </BodyLayout>
  )
}
