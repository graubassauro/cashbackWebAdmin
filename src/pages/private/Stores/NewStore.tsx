import { useCallback, useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { MapPin } from '@phosphor-icons/react'
import { VStack, Button, Icon, Text, useToast, Grid } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormButton } from '~components/Buttons'
import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { Loading } from '~components/Loading'
import { Container } from '~layouts/Container'
import {
  IAddressLocationDTO,
  useGetAdressLocationQuery,
} from '~services/location.service'
import { usePostCreateMerchantStoreMutation } from '~services/merchant.service'

const createMerchantStoreSchema = z.object({
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

type CreateMerchantStoreInputs = z.infer<typeof createMerchantStoreSchema>

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

export function NewStore() {
  const debounceDelay = 850

  const [canShowInput, setCanShowInput] = useState(false)

  const toast = useToast()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateMerchantStoreInputs>({
    resolver: zodResolver(createMerchantStoreSchema),
    mode: 'onTouched',
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

  const debouncedAddress = useDebouncedValue(streetFieldValue, debounceDelay)

  const {
    isFetching: isFetchingAddress,
    isLoading: isLoadingAddress,
    data: addressList,
  } = useGetAdressLocationQuery(
    { address: debouncedAddress },
    { skip: !debouncedAddress },
  )

  /**
   * Handling to create a new store
   */

  const [
    requestCreateMerchantStore,
    {
      isLoading: isLoadingNewMerchantStore,
      isSuccess: isSuccessNewMerchantStore,
      data: merchantStore,
    },
  ] = usePostCreateMerchantStoreMutation()

  const handleCreateNewStore = useCallback(
    (data: CreateMerchantStoreInputs) => {
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

      requestCreateMerchantStore({
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
    [requestCreateMerchantStore],
  )

  /**
   * useEffect to handle successful request creation
   */
  useEffect(() => {
    if (isSuccessNewMerchantStore && merchantStore) {
      toast({
        title: `New ${merchantStore.data.name} was created`,
        description:
          'Now you can add products or create highlights promotion for it!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [isSuccessNewMerchantStore, merchantStore, toast])

  return (
    <Container hasGoBackButton title="New Store">
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={handleSubmit(handleCreateNewStore)}
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
            <Grid gap={2} gridTemplateColumns={['1fr']} w="100%">
              <LabelInput
                label="Zip Code"
                id="zipCode"
                {...register('zipCode')}
                error={errors.zipCode}
              />
            </Grid>
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
          title="Create"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={isSubmitting || isLoadingNewMerchantStore}
          disabled={isSubmitting || !isValid}
        />
      </VStack>
    </Container>
  )
}
