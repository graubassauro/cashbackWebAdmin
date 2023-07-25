import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Grid,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import { cashbackApi } from '~api/cashback-api.service'
import { useDeleteProductMutation } from '~services/products.service'

import { DeleteModalComponent, ProductCard, ProductTable } from './components'
import { useProduct } from './contexts/ProductsPageContext'

export function Products() {
  const {
    page,
    pageParams,
    productsToCards,
    handleChangePage,
    handleResetProductsToCards,
  } = useProduct()

  const [uIdToDelete, setUIdToDelete] = useState('')

  const dispatch = useDispatch()
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: false,
    xl: true,
    '2xl': true,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      {isWideVersion ? (
        <ProductTable
          isDeleting={isDeleting}
          isWideVersion={isWideVersion}
          onHandleSetUidToDelete={handleSetUidToDelete}
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
            {productsToCards?.map((product) => (
              <ProductCard
                key={product.uId}
                product={product}
                onHandleSetUidToDelete={handleSetUidToDelete}
              />
            ))}
          </Grid>
          {page < pageParams?.endPosition ? (
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
