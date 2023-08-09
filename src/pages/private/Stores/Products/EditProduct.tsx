import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack, Grid, useToast, Box } from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { FormButton } from '~components/Buttons'
import {
  LabelFileInput,
  LabelInput,
  LabelTextarea,
  LightCheckbox,
} from '~components/Forms/Inputs'
import { HeaderForm } from '~components/Forms/HeaderForm'
import { LightSelectInput, SelectOptions } from '~components/Forms/Select'
import { BodyLayout } from '~layouts/Body'
import { Loading } from '~components/Loading'
import { useAppSelector } from '~redux/store'
import {
  ICreateProductForStoreBody,
  useGetProductQuery,
  usePostCreateProductForStoreMutation,
  usePostToReceiveURLToSaveProductImageMutation,
} from '~services/products.service'

import { ModalSelect } from './components/ModalSelect'

const selectOptions: SelectOptions[] = [
  {
    key: 'empty',
    label: 'Select an option',
  },
  {
    key: 'product-price',
    label: 'Product price %',
  },
  {
    key: 'fixed-points',
    label: 'Fixed points',
  },
]

const updateStoreProductSchema = z.object({
  name: z.string(),
  about: z.string(),
  quantity: z.string(),
  price: z.string(),
  pointGain: z.string(),
  pointGainValue: z.string(),
  acceptCoins: z.boolean(),
  percentCoins: z.string(),
})

type UpdateStoreProductInputs = z.infer<typeof updateStoreProductSchema>

export function EditProduct() {
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

  const { id } = useParams()

  const toast = useToast()
  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })
  const dispatch = useDispatch()
  const { selectedCategory, selectedBrand } = useAppSelector(
    (state) => state.form,
  )

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
  } = useForm<UpdateStoreProductInputs>({
    resolver: zodResolver(updateStoreProductSchema),
    mode: 'onChange',
  })

  // TODO: update to edit product
  const handleCreateNewProduct = useCallback(
    (data: UpdateStoreProductInputs) => {
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
        acceptCoins: data.acceptCoins,
        percentCoins: data.acceptCoins ? Number(data.percentCoins) : 0,
        categories: categoriesId,
      }

      createProduct(body)
    },
    [selectedBrand?.id, selectedCategory, store?.uId, createProduct],
  )

  const [requestImageURL, { isSuccess: isRequested, data: requestUrl }] =
    usePostToReceiveURLToSaveProductImageMutation()

  /**
   * useEffect to create product, TODO: update to edit product
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
      setValue('about', product?.data?.about ?? '')
      setValue('quantity', String(product?.data?.quantity) ?? '')
      setValue('price', String(product?.data?.price) ?? '')
      setValue('pointGain', product?.data?.cashbackType ?? '')
      setValue('pointGainValue', String(product?.data?.points) ?? '')
      setValue('acceptCoins', product?.data?.acceptCoins ?? false)
      setValue('percentCoins', String(product?.data?.amountCoins) ?? '')

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

  return (
    <BodyLayout>
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <Box mt="4" px="4" py="5" borderRadius={10} bgColor="white">
          <HeaderForm title="Edit product" />
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
              templateColumns={['1fr', '2fr 2fr', 'repeat(4, 1fr)']}
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

              <LabelInput
                label="Coins amount"
                id="percentCoins"
                {...register('percentCoins')}
                error={errors.percentCoins}
              />
              <LightCheckbox
                label="Can accept coins"
                id="acceptCoins"
                {...register('acceptCoins')}
                error={errors.acceptCoins}
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
            <ModalSelect />
            <FormButton
              type="submit"
              title="Update"
              alignSelf="flex-end"
              formButtonType="SUBMIT"
              isLoading={isSubmitting || isCreatingProduct}
              disabled={isSubmitting || !isValid}
            />
          </VStack>
        </Box>
      )}
    </BodyLayout>
  )
}
