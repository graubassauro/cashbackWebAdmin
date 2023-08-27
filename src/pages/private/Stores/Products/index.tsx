/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Icon,
  IconButton,
  Input,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { ActionButton } from '~components/Buttons'
import { Loading } from '~components/Loading'
import { IProductStoreDTO } from '~models/Store'
import { useAppSelector } from '~redux/store'
import { useGetAllCategoriesQuery } from '~services/category.service'
import {
  useDeleteProductMutation,
  useGetProductsByStoreUidQuery,
} from '~services/products.service'

import { DeleteModalComponent, ProductCard } from './components'

export function Products() {
  const containerRef = useRef<HTMLDivElement>(null)
  /** START */
  const [page, setPage] = useState(1)
  const [productsToCards, setProductsToCards] = useState<IProductStoreDTO[]>([])
  const [category, setCategory] = useState<number>(0)

  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isFiltersOpen,
    onOpen: onOpenFitlers,
    onClose: onCloseFilters,
  } = useDisclosure()

  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })

  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isSuccess: isLoadedProducts,
  } = useGetProductsByStoreUidQuery({
    page,
    uId: store?.uId ?? '',
    category,
  })

  const {
    data: categories,
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  const isLoading = isProductsLoading || isProductsFetching

  const pageParams = useMemo(() => {
    return {
      endPosition: products?.data.totalPages ?? 5,
      totalOfItems: products?.data.totalRecords ?? 0,
      totalOfItemsPerPage: products?.data.products.length ?? 10,
    }
  }, [
    products?.data.totalPages,
    products?.data.totalRecords,
    products?.data.products.length,
  ])

  const handleChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const handleResetProductsToCards = useCallback(() => {
    setProductsToCards([])
  }, [])

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [])

  const removeDuplicateProducts = (
    array: IProductStoreDTO[],
  ): IProductStoreDTO[] => {
    const uniqueProducts: IProductStoreDTO[] = []
    const productSet = new Set<string>()

    for (const product of array) {
      const serializedProduct = JSON.stringify(product)
      if (!productSet.has(serializedProduct)) {
        productSet.add(serializedProduct)
        uniqueProducts.push(product)
      }
    }

    return uniqueProducts
  }

  useEffect(() => {
    if (isLoadedProducts) {
      if (page === 1) {
        setProductsToCards(products?.data.products ?? [])
      } else {
        const productsToAdd = products?.data?.products ?? []
        const updatedProductsList = [...productsToCards, ...productsToAdd]
        const uniqueProducts = removeDuplicateProducts(updatedProductsList)
        setProductsToCards(uniqueProducts)
      }

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }
  }, [isLoadedProducts, page, products?.data.products, store])

  useEffect(() => {
    setPage(1)
    setCategory(0)
  }, [])

  useEffect(() => {
    handleScroll()
  }, [handleScroll, productsToCards])

  /** END */

  const [uIdToDelete, setUIdToDelete] = useState('')

  const dispatch = useDispatch()

  const [
    deleteProduct,
    { isSuccess: isDeletedSuccess, isLoading: isDeleting },
  ] = useDeleteProductMutation()

  /**
   * Handlers item
   */
  const onHandleSetPage = useCallback(
    (page: number) => {
      handleChangePage(page)
    },
    [handleChangePage],
  )

  const handleSetUidToDelete = useCallback(
    (uId: string) => {
      onOpen()
      setUIdToDelete(uId)
    },
    [onOpen, setUIdToDelete],
  )

  const handleDeleteProductByProductUid = useCallback(() => {
    deleteProduct({ uId: uIdToDelete })
    onClose()
  }, [deleteProduct, uIdToDelete, onClose])

  /**
   * useEffect to invalidate product tag
   */
  useEffect(() => {
    if (isDeletedSuccess) {
      onHandleSetPage(1)
      handleResetProductsToCards()
      dispatch(cashbackApi.util.invalidateTags(['Product']))
    }
  }, [isDeletedSuccess, onHandleSetPage, handleResetProductsToCards, dispatch])

  return (
    <>
      <VStack w="100%" ref={containerRef}>
        <Stack w="100%" flexDir="row">
          <Input
            bgColor="white"
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={8}
            px={4}
            py={4}
            fontSize={16}
            fontWeight={400}
            textColor="gray.700"
            transition="ease-in 0.35s"
            placeholder="Search for products"
            _placeholder={{
              color: 'gray.700',
            }}
            _hover={{
              borderColor: 'gray.700',
            }}
            _focus={{
              borderColor: 'gray.700',
            }}
          />
          <ActionButton
            title="New product"
            onClick={() => navigate(`../../products/new-product`)}
          />
          <IconButton
            aria-label="Open filters"
            bgColor="white"
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={8}
            px={4}
            py={4}
            icon={<Icon as={SlidersHorizontal} color="gray.700" />}
            _hover={{
              borderColor: 'gray.700',
            }}
            _focus={{
              borderColor: 'gray.700',
            }}
            onClick={onOpenFitlers}
          />
        </Stack>
        <Grid
          templateColumns={[
            '1fr',
            '1fr',
            '1fr 1fr',
            '1fr 1fr 1fr',
            'repeat(3, 1fr)',
          ]}
          gap={[2, 4]}
          mt={8}
          maxWidth="1440px"
        >
          {productsToCards?.map((product) => (
            <ProductCard
              key={product.uId}
              product={product}
              onHandleSetUidToDelete={handleSetUidToDelete}
            />
          ))}
        </Grid>
        {page < pageParams?.endPosition && !isLoading ? (
          <Button
            bgColor="transparent"
            fontSize={[14, 16, 18]}
            fontWeight={500}
            color="gray.800"
            transition="all 0.35s"
            _hover={{
              bgColor: 'transparent',
              fontWeight: 700,
            }}
            onClick={() => handleChangePage(page + 1)}
          >
            Load more products
          </Button>
        ) : null}
      </VStack>

      <DeleteModalComponent
        isDeleting={isDeleting}
        isOpen={isOpen}
        onClose={onClose}
        onHandleDeleteProductByProductUid={handleDeleteProductByProductUid}
      />

      <Drawer placement="left" onClose={onCloseFilters} isOpen={isFiltersOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Filter Options</DrawerHeader>
          <DrawerBody>
            {isLoadingCategories || isFetchingCategories ? (
              <Center>
                <Loading />
              </Center>
            ) : (
              categories?.data.map((c) => <p key={c.uId}>{c.name}</p>)
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
