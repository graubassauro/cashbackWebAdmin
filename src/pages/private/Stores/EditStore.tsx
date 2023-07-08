import { useCallback, useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { MapPin } from '@phosphor-icons/react'
import {
  VStack,
  HStack,
  Button,
  Icon,
  Text,
  useToast,
  Grid,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormButton } from '~components/Buttons'
import { Container } from '~layouts/Container'
import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { Loading } from '~components/Loading'
import { useCurrentStore } from '~redux/auth'
import {
  IAddressLocationDTO,
  useGetAdressLocationQuery,
} from '~services/location.service'
import { useUpdateStoreMutation } from '~services/stores.service'

const updateMerchantStoreSchema = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  note: z.string(),
  urlLogo: z.string(),
  zipCode: z.string(),
  street: z.string(),
  streetNameFormatted: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  state: z.string(),
  cityId: z.number(),
  latitude: z.string(),
  longitude: z.string(),
})

type UpdateMerchantStoreInputs = z.infer<typeof updateMerchantStoreSchema>

export function EditStore() {
  const [canShowInput, setCanShowInput] = useState(false)

  const store = useCurrentStore()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateMerchantStoreInputs>({
    resolver: zodResolver(updateMerchantStoreSchema),
    mode: 'onChange',
  })

  /*
   * function to handle to select address chosse by the user
   */

  const handleSetChosenAddress = useCallback(
    (data: IAddressLocationDTO) => {
      setCanShowInput(true)

      const cityAddress = data.address.city ? `${data.address.city},` : ''
      const stateAddress = data.address.state ? `${data.address.state},` : ''

      const streetFormattedValue = `${data.displayName}, ${cityAddress} ${stateAddress}`

      setValue('cityId', data.placeId)
      setValue('streetNameFormatted', streetFormattedValue)
      setValue('city', data.address.city)
      setValue('state', data.address.state)
      setValue('latitude', data.latitude)
      setValue('longitude', data.longitude)
    },
    [setValue],
  )

  /**
   * Handling with service api call to get address
   */

  const streetFieldValue = watch('street')

  const {
    isFetching: isFetchingAddress,
    isLoading: isLoadingAddress,
    data: addressList,
  } = useGetAdressLocationQuery({ address: streetFieldValue })

  /**
   * Handling to create a new store
   */

  const [
    requestUpdateMerchantStore,
    {
      isLoading: isUpdatingMerchantStore,
      isSuccess: isSuccessUpdatedMerchantStore,
    },
  ] = useUpdateStoreMutation()

  const handleUpdateMerchantStore = useCallback(
    (data: UpdateMerchantStoreInputs) => {
      const {
        name,
        email,
        phoneNumber,
        note,
        urlLogo,
        zipCode,
        streetNameFormatted,
        streetNumber,
        latitude,
        longitude,
      } = data

      requestUpdateMerchantStore({
        uid: store?.uId ?? '',
        name,
        email,
        phoneNumber,
        note,
        urlLogo,
        statusId: 1,
        zipCode,
        street: streetNameFormatted,
        streetNameFormatted,
        streetNumber,
        cityId: 1,
        latitude: Number(latitude),
        longitude: Number(longitude),
      })
    },
    [requestUpdateMerchantStore, store?.uId],
  )

  /**
   * First useEffect to mount the form with the current store data
   */
  useEffect(() => {
    setValue('name', store?.name ?? '')
    setValue('email', store?.email ?? '')
    setValue('phoneNumber', store?.phoneNumber ?? '')
    setValue('note', '')
    setValue('urlLogo', store?.urlLogo ?? '')
    setValue('zipCode', store?.storeAddress.zipCode ?? '')
    setValue('street', store?.storeAddress.streetName ?? '')
    setValue(
      'streetNameFormatted',
      store?.storeAddress.streetNameFormatted ?? '',
    )
    setValue('streetNumber', store?.storeAddress.streetNumber ?? '')
    setValue('city', store?.storeAddress.city.name ?? '')
    setValue('state', store?.storeAddress.city.state ?? '')
    setValue('cityId', store?.storeAddress.city.id ?? 0)
    setValue('latitude', String(store?.storeAddress.latitude) ?? '')
    setValue('longitude', String(store?.storeAddress.longitude) ?? '')

    setCanShowInput(true)
  }, [setValue, store])

  /**
   * useEffect to handle successful request creation
   */
  useEffect(() => {
    if (isSuccessUpdatedMerchantStore) {
      toast({
        title: `Store was updated successfully`,
        description:
          'Now you can add products or create highlights promotion for it!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [isSuccessUpdatedMerchantStore, toast])

  return (
    <Container hasGoBackButton title={store?.name}>
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={handleSubmit(handleUpdateMerchantStore)}
      >
        <LabelInput
          label="Name"
          id="name"
          {...register('name')}
          error={errors.name}
        />
        <LabelTextarea
          label="Description"
          id="note"
          {...register('note')}
          error={errors.note}
        />
        <Grid
          gap={2}
          gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']}
          w="100%"
        >
          <LabelInput
            label="E-mail"
            id="email"
            {...register('email')}
            error={errors.email}
          />
          <LabelInput
            label="Phone"
            id="phoneNumber"
            {...register('phoneNumber')}
            error={errors.phoneNumber}
          />
          <LabelInput
            label="URL da Logo"
            id="urlLogo"
            {...register('urlLogo')}
            error={errors.urlLogo}
          />
        </Grid>
        <VStack w="100%">
          <LabelInput
            label="Address"
            id="street"
            {...register('street')}
            error={errors.street}
          />
          {/* Address Consultion */}
          <VStack
            mt={4}
            pb={4}
            spacing={2}
            w="100%"
            maxH={'200px'}
            overflow={addressList?.data && 'auto'}
            borderBottomWidth={1}
            borderBottomColor="gray.400"
          >
            {isFetchingAddress && isLoadingAddress ? (
              <Loading />
            ) : (
              addressList?.data.map((item) => (
                <Button
                  key={item.placeId}
                  w="100%"
                  alignItems="center"
                  gap={2}
                  bgColor="gray.300"
                  borderWidth={1}
                  borderColor="gray.400"
                  title={item.displayName}
                  _hover={{
                    bgColor: 'gray.400',
                  }}
                  onClick={() => handleSetChosenAddress(item)}
                >
                  <Icon as={MapPin} color="gray.700" />
                  <Text
                    noOfLines={1}
                    fontSize={14}
                    fontFamily="body"
                    color="gray.700"
                  >
                    {item.displayName}
                  </Text>
                </Button>
              ))
            )}
          </VStack>
        </VStack>

        {/* After choose address */}
        {canShowInput && (
          <VStack w="100%">
            <HStack spacing={2} w="100%">
              <LabelInput
                label="Zip Code"
                id="zipCode"
                {...register('zipCode')}
                error={errors.zipCode}
              />
            </HStack>
            <Grid
              gap={2}
              gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
              w="100%"
            >
              <LabelInput
                label="City"
                id="city"
                {...register('city')}
                error={errors.city}
              />
              <LabelInput
                label="State"
                id="state"
                {...register('state')}
                error={errors.state}
              />
            </Grid>
            <Grid
              gap={2}
              gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']}
              w="100%"
            >
              <LabelInput
                label="Street Number"
                id="streetNumber"
                {...register('streetNumber')}
                error={errors.streetNumber}
              />
              <LabelInput
                label="Latitude"
                id="latitude"
                {...register('latitude')}
                error={errors.latitude}
              />
              <LabelInput
                label="Longitude"
                id="longitude"
                {...register('longitude')}
                error={errors.longitude}
              />
            </Grid>
          </VStack>
        )}
        <FormButton
          type="submit"
          title="Update"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={isSubmitting || isUpdatingMerchantStore}
          disabled={isSubmitting || !isValid}
        />
      </VStack>
    </Container>
  )
}
