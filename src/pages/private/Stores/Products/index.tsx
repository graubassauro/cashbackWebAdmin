import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Grid,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { IProductStoreDTO } from '~models/Store'
import { useCurrentStore } from '~redux/merchant'
import {
  useDeleteProductMutation,
  useGetProductsByStoreUidQuery,
} from '~services/products.service'

import { DeleteModalComponent, ProductCard, ProductTable } from './components'

export function Products() {
  const [page, setPage] = useState(1)
  const [productsToCards, setProductsToCards] = useState<IProductStoreDTO[]>([])
  const [uIdToDelete, setUIdToDelete] = useState('')

  const dispatch = useDispatch()
  const store = useCurrentStore()
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: false,
    xl: true,
    '2xl': true,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    data: products,
    isLoading: isProductsLoading,
    isSuccess: isLoadedProducts,
  } = useGetProductsByStoreUidQuery({
    page,
    uId: store?.uId ?? '',
  })

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

  console.log('pageParams', pageParams)

  const [
    deleteProduct,
    { isSuccess: isDeletedSuccess, isLoading: isDeleting },
  ] = useDeleteProductMutation()

  /**
   * Handlers item
   */
  const handleSetPage = useCallback((page: number) => {
    setPage(page)
  }, [])

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
      setPage(1)
      setProductsToCards([])
      dispatch(cashbackApi.util.invalidateTags(['Product']))
    }
  }, [isDeletedSuccess, dispatch])

  /**
   * useEffect to load products
   */
  useEffect(() => {
    if (isLoadedProducts) {
      setProductsToCards((prevState) => {
        const updatedProductsList = [...prevState, ...products?.data.products]
        return updatedProductsList
      })
    }
  }, [isLoadedProducts, products?.data.products])

  return (
    <>
      {isWideVersion ? (
        <ProductTable
          products={products?.data.products ?? []}
          isLoading={isProductsLoading}
          isDeleting={isDeleting}
          isWideVersion={isWideVersion}
          page={page}
          endPosition={pageParams.endPosition}
          totalOfItems={pageParams.totalOfItems}
          totalOfItemsPerPage={pageParams.totalOfItemsPerPage}
          onHandleSetUidToDelete={handleSetUidToDelete}
          onPageChange={handleSetPage}
        />
      ) : (
        <VStack w="100%">
          <Grid
            w="100%"
            templateColumns={[
              '1fr',
              '1fr',
              '1fr 1fr',
              '1fr 1fr 1fr',
              'repeat(3, 1fr)',
            ]}
            gap={[2, 4]}
            mt={8}
          >
            {productsToCards.map((product) => (
              <ProductCard
                key={product.uId}
                product={product}
                onHandleSetUidToDelete={handleSetUidToDelete}
              />
            ))}
          </Grid>
          {page < pageParams.endPosition ? (
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
              onClick={() => handleSetPage(page + 1)}
            >
              Load more products
            </Button>
          ) : null}
        </VStack>
      )}

      <DeleteModalComponent
        isDeleting={isDeleting}
        isOpen={isOpen}
        onClose={onClose}
        onHandleDeleteProductByProductUid={handleDeleteProductByProductUid}
      />
    </>
  )
}
