import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { BreadCrumb } from '~components/Breadcrumb'
import { LabelInput } from '~components/Forms/Inputs'
import { Loading } from '~components/Loading'
import { BodyLayout } from '~layouts/Body'
import { useCurrentStore } from '~redux/auth'
import {
  useGetBrandsByStoreUidQuery,
  usePostBrandByStoreUidMutation,
} from '~services/brands.service'

import { BrandCard } from '../components/BrandCard'
import { cashbackApi } from '~api/cashback-api.service'

const createStoreBrandSchema = z.object({
  name: z.string(),
})

type CreateStoreBrandInputs = z.infer<typeof createStoreBrandSchema>

export function Brands() {
  const store = useCurrentStore()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateStoreBrandInputs>({
    resolver: zodResolver(createStoreBrandSchema),
    mode: 'all',
  })

  const {
    data: brands,
    isFetching: isFetchingBrands,
    isLoading: isLoadingBrands,
  } = useGetBrandsByStoreUidQuery({ uId: store?.uId ?? '' })

  const [createBrand, { isLoading: isCreatingBrand, isSuccess: hasCreated }] =
    usePostBrandByStoreUidMutation()

  const handleCreateNewBrand = useCallback(
    (data: CreateStoreBrandInputs) => {
      createBrand({
        name: data.name,
        storeUId: store?.uId ?? '',
      })
    },
    [createBrand, store?.uId],
  )

  /**
   * useEffect after createBrand
   */
  useEffect(() => {
    if (hasCreated) {
      dispatch(cashbackApi.util.invalidateTags(['Brands']))
      reset()

      toast({
        title: `New brand was created`,
        description: 'Now you can associate to your products!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [hasCreated, dispatch, reset, toast])

  return (
    <BodyLayout>
      <HStack justifyContent="space-between">
        <BreadCrumb />

        <Button
          bgColor="white"
          borderColor="gray.700"
          borderWidth={1}
          borderRadius={8}
          px={8}
          py={2}
          fontSize={16}
          fontWeight={400}
          textColor="gray.700"
          transition="ease-in 0.35s"
          _hover={{
            bgColor: 'gray.700',
            textColor: 'white',
            opacity: 0.8,
          }}
          onClick={onOpen}
        >
          New Brand
        </Button>
      </HStack>
      {isFetchingBrands || isLoadingBrands ? (
        <Loading />
      ) : (
        <Grid
          templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)']}
          gap={2}
          mt={8}
        >
          {brands?.data.brands.map((brand) => (
            <BrandCard key={brand.id} data={brand} />
          ))}
        </Grid>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateNewBrand)}>
          <ModalHeader fontFamily="heading" fontSize={16} fontWeight="bold">
            New Brand
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LabelInput
              label="name"
              id="name"
              {...register('name')}
              error={errors.name}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              borderWidth={1}
              borderRadius={6}
              bgColor="purple.900"
              borderColor="purple.900"
              textColor="white"
              isLoading={isSubmitting || isCreatingBrand}
              disabled={isSubmitting || !isValid}
              _hover={{
                bgColor: 'white',
                borderColor: 'purple.900',
                textColor: 'purple.900',
              }}
              onClick={onClose}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </BodyLayout>
  )
}
