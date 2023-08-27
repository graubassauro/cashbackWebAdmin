import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import axios, { AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack, Grid, useToast, Box, Flex, Center } from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { FormButton } from '~components/Buttons'
import * as FileInput from '~components/Forms/Inputs/FileInput'
import {
  LabelInput,
  LabelTextarea,
  LightCheckbox,
} from '~components/Forms/Inputs'
import { HeaderForm } from '~components/Forms/HeaderForm'
import { LightSelectInput, SelectOptions } from '~components/Forms/Select'
import { Loading } from '~components/Loading'
import { ModalSelect } from './components/ModalSelect'
import { useFileInputContext } from '~contexts/FileListInputContext'
import { BodyLayout } from '~layouts/Body'
import { useAppSelector } from '~redux/store'
import { resetFields } from '~redux/form'
import {
  IUpdateProductBody,
  useDeleteProductImageMutation,
  useGetProductQuery,
  usePostToReceiveURLToSaveProductImageMutation,
  usePutEditProductForStoreMutation,
} from '~services/products.service'

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
  const [currentSelectedFileIndex, setCurrentSelectedFileIndex] = useState(0)

  const { id } = useParams()

  const toast = useToast()
  const dispatch = useDispatch()
  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })

  const { files: selectedFiles } = useFileInputContext()
  const { selectedBrand } = useAppSelector((state) => state.form)

  const [
    editProduct,
    { isSuccess: updatedProduct, isLoading: isUpdatingProduct },
  ] = usePutEditProductForStoreMutation()

  const [deleteImage, { isSuccess: deletedImage, isLoading: isDeletingImage }] =
    useDeleteProductImageMutation()

  const [requestImageURL, { isSuccess: isRequested, data: requestUrl }] =
    usePostToReceiveURLToSaveProductImageMutation()

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

  const handleUpdateProduct = useCallback(
    (data: UpdateStoreProductInputs) => {
      const body: IUpdateProductBody = {
        uId: product?.data.uId ?? '',
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
      }

      editProduct(body)
    },
    [product?.data.uId, selectedBrand?.id, store?.uId, editProduct],
  )

  const handleDeleteImageByUid = useCallback(
    (imageUid: string) => {
      deleteImage({
        imageUid,
        productUid: product?.data.uId ?? '',
        storeUid: store?.uId ?? '',
      })
    },
    [deleteImage, product?.data.uId, store?.uId],
  )

  /**
   * useEffect to create product, TODO: update to edit product
   */
  useEffect(() => {
    if (updatedProduct) {
      dispatch(cashbackApi.util.invalidateTags(['Product']))

      toast({
        title: `All good!`,
        description: 'Product was successfully updated',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })

      requestImageURL({
        storeUId: store?.uId ?? '',
        productUId: product?.data.uId ?? '',
      })
    }
  }, [
    updatedProduct,
    dispatch,
    toast,
    requestImageURL,
    store?.uId,
    product?.data.uId,
  ])

  useEffect(() => {
    if (deletedImage) {
      dispatch(cashbackApi.util.invalidateTags(['Product']))

      toast({
        title: `Image was gone successfully`,
        description: 'You still are able to add new images',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [deletedImage, dispatch, toast])

  /**
   * useEffect to load the product to edit
   */
  useEffect(() => {
    if (isProductLoaded && product) {
      console.log('product', product)
      setValue('name', product?.data?.name ?? '')
      setValue('about', product?.data?.about ?? '')
      setValue('quantity', String(product?.data?.quantity) ?? '')
      setValue('price', String(product?.data?.price) ?? '')
      setValue('pointGain', product?.data?.cashbackType ?? '')
      setValue('pointGainValue', String(product?.data?.points) ?? '')
      setValue('acceptCoins', product?.data?.acceptCoins ?? false)
      setValue('percentCoins', String(product?.data?.amountCoins) ?? '')

      // dispatch(
      //   setNewBrand({
      //     item: {
      //       id: product?.data.brandId ?? 0,
      //       uId: '',
      //       name: product?.data?.brandName ?? '',
      //       categories: [],
      //     },
      //   }),
      // )
    }
  }, [isProductLoaded, product, setValue])

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
              productUId: product?.data.uId ?? '',
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
      requestImageURL,
      product?.data.uId,
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

      if (currentSelectedFileIndex < selectedFiles.length) {
        uploadImage(
          selectedFiles[currentSelectedFileIndex],
          requestUrl.data.url,
        )
      } else {
        dispatch(cashbackApi.util.invalidateTags(['Product']))
      }
    }
  }, [
    isRequested,
    requestUrl,
    selectedFiles,
    toast,
    uploadImage,
    currentSelectedFileIndex,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetFields())
    }
  }, [dispatch])

  /**
   * AUX variables
   */
  const hasImages = product?.data.images && product?.data.images.length > 0

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
            onSubmit={handleSubmit(handleUpdateProduct)}
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
            <Flex wrap="wrap" gap={4}>
              {isDeletingImage && (
                <Center>
                  <Loading />
                </Center>
              )}
              {!isDeletingImage &&
                hasImages &&
                product?.data.images.map((i) => (
                  <FileInput.ImagePreview
                    key={i.imageUId}
                    data={i}
                    onHandleDelete={handleDeleteImageByUid}
                  />
                ))}
            </Flex>

            <VStack w="100%">
              <FileInput.Root>
                <FileInput.Trigger />
                <FileInput.FileList />
                <FileInput.Control multiple />
              </FileInput.Root>
            </VStack>

            <ModalSelect isEditMode />
            <FormButton
              type="submit"
              title="Update"
              alignSelf="flex-end"
              formButtonType="SUBMIT"
              isLoading={isSubmitting || isUpdatingProduct}
              disabled={isSubmitting || !isValid}
            />
          </VStack>
        </Box>
      )}
    </BodyLayout>
  )
}
