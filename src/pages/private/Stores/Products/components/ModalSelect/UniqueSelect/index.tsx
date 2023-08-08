import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Center,
  Flex,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { Loading } from '~components/Loading'
import { ICategoryDTO } from '~models/Category'
import { setNewBrand } from '~redux/form'
import { useAppSelector } from '~redux/store'
import {
  useGetBrandsByNameQuery,
  usePostBrandByStoreUidMutation,
} from '~services/brands.service'

import { ItemComponent } from '../components/ItemSelect'

type ModalSelectProps = InputProps & {
  title: string
  isOpen: boolean
  onClose: () => void
}

const DEBOUNCE_DELAY = 150

export function UniqueSelect({
  title,
  isOpen = false,
  onClose,
  ...rest
}: ModalSelectProps) {
  const [inputSearch, setInputSearch] = useState('')

  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })
  const brandSelected = useAppSelector((state) => {
    return state.form.selectedBrand
  })

  const dispatch = useDispatch()
  const toast = useToast()

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

  const debouncedInputSearch = useDebouncedValue(inputSearch, DEBOUNCE_DELAY)

  const {
    data: brands,
    isFetching: isFetchingBrands,
    isLoading: isLoadingBrands,
  } = useGetBrandsByNameQuery({
    uId: store?.uId ?? '',
    name: debouncedInputSearch,
  })

  const handleSelectItem = useCallback(
    (item: ICategoryDTO) => {
      dispatch(setNewBrand({ item }))

      onClose()
    },
    [dispatch, onClose],
  )

  // ADD BRAND

  const [createBrand, { isLoading: isCreatingBrand, isSuccess: hasCreated }] =
    usePostBrandByStoreUidMutation()

  const captureNewBrandName = useCallback(() => {
    const brandName: string | null = window.prompt('Please, enter a brand name')

    if (brandName) {
      createBrand({
        name: brandName,
        storeUId: store?.uId ?? '',
      })
    }
  }, [createBrand, store?.uId])

  /**
   * useEffect after createBrand
   */
  useEffect(() => {
    if (hasCreated) {
      dispatch(cashbackApi.util.invalidateTags(['Brands']))

      toast({
        title: `New brand was created`,
        description: 'Now you can associate to your products!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [hasCreated, dispatch, toast])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            w="100%"
            h={14}
            color="gray.800"
            borderRadius="10"
            borderWidth={1}
            borderColor="gray.600"
            bgColor="gray.400"
            variant="unstyled"
            px="4"
            my="4"
            placeholder="Search by name (3 caracteres to start)"
            _placeholder={{
              color: 'gray.700',
            }}
            onChange={(e) => setInputSearch(e.target.value)}
            {...rest}
          />
          <Flex
            rowGap={2}
            columnGap={4}
            wrap="wrap"
            flex={1}
            w="100%"
            alignItems={
              isCreatingBrand || isLoadingBrands || isFetchingBrands
                ? 'center'
                : 'flex-start'
            }
            justifyContent={
              isCreatingBrand || isLoadingBrands || isFetchingBrands
                ? 'center'
                : 'flex-start'
            }
          >
            {brands?.data.brands.map((b) => (
              <ItemComponent
                key={`${b.uId}-${b.name}`}
                data={b}
                title={title}
                isSelected={brandSelected.id === b.id}
                hasChildren={b.categories?.length > 0}
                handleSelectItem={handleSelectItem}
              />
            ))}
            {brands?.data.brands.length === 0 ? (
              <Center flexDirection="column" alignItems="flex-start" gap={4}>
                {isCreatingBrand || isLoadingBrands || isFetchingBrands ? (
                  <Center>
                    <Loading />
                  </Center>
                ) : (
                  <VStack spacing={2} alignItems="flex-start">
                    <Text fontFamily="body" fontSize={16} fontWeight={400}>
                      Add or create a new brand that you are interest to your
                      product
                    </Text>
                    <Button
                      borderRadius={6}
                      bgColor="purple.900"
                      textColor="white"
                      mr={3}
                      isLoading={false}
                      _hover={{
                        opacity: 0.8,
                      }}
                      onClick={captureNewBrandName}
                    >
                      Click here
                    </Button>
                  </VStack>
                )}
              </Center>
            ) : null}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            borderRadius={6}
            bgColor="purple.900"
            textColor="white"
            mr={3}
            onClick={onClose}
            isLoading={false}
            _hover={{
              opacity: 0.8,
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
