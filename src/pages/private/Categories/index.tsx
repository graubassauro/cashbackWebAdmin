import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CaretDown } from '@phosphor-icons/react'
import {
  Button,
  Grid,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  // useDisclosure,
  // useToast,
} from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { CategoryCard } from './components/CategoryCard'
import { Loading } from '~components/Loading'
import { BodyLayout } from '~layouts/Body'
import { IStoreDTO } from '~models/Store'
import { setCurrentStore } from '~redux/merchant'
import { useAppSelector } from '~redux/store'
import { useGetAllCategoriesQuery } from '~services/category.service'

import { useGetMerchantStores } from '../Stores/hooks/useGetMerchantStores'

export function Categories() {
  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })
  const dispatch = useDispatch()

  const [storesData, setStoresData] = useState<IStoreDTO[]>([])
  const [currentFilter, setCurrentFilter] = useState<'ALL' | 'STORE'>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentStoreSelected, setCurrentStoreSelected] =
    useState<IStoreDTO | null>(store ?? null)
  // const dispatch = useDispatch()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const toast = useToast()

  const {
    data: categories,
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  const { stores, isStoresLoading, isStoresSuccess } = useGetMerchantStores({
    page: currentPage,
  })

  const totalPages = stores
    ? Math.ceil(stores.data.totalPages / 4)
    : currentPage + 1

  const handleIncreaseCurrentPage = useCallback(() => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  const handleSetAllCategories = useCallback(() => {
    setCurrentFilter('ALL')
    setCurrentStoreSelected(null)
  }, [])

  const handleSetMyStore = useCallback(
    (store: IStoreDTO) => {
      dispatch(setCurrentStore({ currentStore: store }))
      setCurrentFilter('STORE')
      setCurrentStoreSelected(store)
      dispatch(cashbackApi.util.invalidateTags(['Product']))
    },
    [dispatch],
  )

  /**
   * useEffect after createBrand
   */
  // useEffect(() => {
  //   if (hasCreated) {
  //     dispatch(cashbackApi.util.invalidateTags(['Brands']))
  //     reset()

  //     toast({
  //       title: `New brand was created`,
  //       description: 'Now you can associate to your products!',
  //       status: 'info',
  //       duration: 3000,
  //       isClosable: true,
  //       position: 'top',
  //     })
  //   }
  // }, [hasCreated, dispatch, reset, toast])

  useEffect(() => {
    if (isStoresSuccess && stores) {
      setStoresData((previousStore) => {
        const existingIds = previousStore.map((item) => item.uId)
        const newStores = stores.data.stores.filter(
          (item) => !existingIds.includes(item.uId),
        )

        return [...previousStore, ...newStores]
      })
    }
  }, [isStoresSuccess, stores])

  return (
    <BodyLayout>
      <HStack gap={4} justifyContent="space-between">
        <Button
          borderColor="gray.700"
          bgColor={currentFilter === 'ALL' ? 'gray.700' : 'white'}
          borderWidth={1}
          borderRadius={8}
          px={4}
          py={2}
          fontSize={16}
          fontWeight={400}
          textColor={currentFilter === 'ALL' ? 'white' : 'gray.700'}
          transition="all ease-in 0.35s"
          alignItems="center"
          _hover={{
            bgColor: 'gray.700',
            textColor: 'white',
            fontWeight: 700,
            opacity: 0.8,

            svg: { fill: 'white', stroke: 'white' },
          }}
          onClick={handleSetAllCategories}
        >
          List All
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            bgColor="white"
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={8}
            px={4}
            py={2}
            fontSize={16}
            fontWeight={400}
            textColor="gray.700"
            transition="ease-in 0.35s"
            alignItems="center"
            _hover={{
              bgColor: 'gray.700',
              textColor: 'white',
              opacity: 0.8,

              svg: { fill: 'white', stroke: 'white' },
            }}
            rightIcon={<Icon as={CaretDown} size={16} color="gray.900" />}
          >
            {currentStoreSelected && currentFilter === 'STORE'
              ? currentStoreSelected?.name
              : 'My Categories By Store'}
          </MenuButton>
          <MenuList p={4}>
            {storesData.map((store) => (
              <MenuItem
                bg={
                  currentStoreSelected?.uId === store.uId
                    ? 'purple.900'
                    : 'white'
                }
                textColor={
                  currentStoreSelected?.uId === store.uId
                    ? 'white'
                    : 'purple.900'
                }
                key={store.uId}
                transition="ease-in-out 0.35s"
                _hover={{
                  bgColor:
                    currentStoreSelected?.uId === store.uId
                      ? 'purple.500'
                      : 'purple.900',
                  opacity: 0.9,
                  textColor: 'white',
                }}
                onClick={() => handleSetMyStore(store)}
              >
                {store.name}
              </MenuItem>
            ))}
            {isStoresLoading && <Loading />}
            <MenuDivider />
            <Button
              w="100%"
              bgColor="white"
              borderColor="gray.700"
              borderWidth={1}
              borderRadius={8}
              px={4}
              py={2}
              fontSize={16}
              fontWeight={400}
              textColor="gray.700"
              transition="ease-in 0.35s"
              alignItems="center"
              _hover={{
                bgColor: 'gray.700',
                textColor: 'white',
                opacity: 0.8,
              }}
              onClick={handleIncreaseCurrentPage}
            >
              Load More
            </Button>
          </MenuList>
        </Menu>
      </HStack>
      {isFetchingCategories || isLoadingCategories ? (
        <Loading />
      ) : (
        <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap={2} mt={8}>
          {categories?.data.map((category) => (
            <CategoryCard key={category.id} data={category} />
          ))}
        </Grid>
      )}
    </BodyLayout>
  )
}
