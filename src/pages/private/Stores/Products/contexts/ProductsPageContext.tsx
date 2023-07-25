/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { IProductStoreDTO } from '~models/Store'
import { useCurrentStore } from '~redux/merchant'
import { useGetProductsByStoreUidQuery } from '~services/products.service'

interface ProductProdiverProps {
  children: ReactNode
}

interface PageParams {
  endPosition: number
  totalOfItems: number
  totalOfItemsPerPage: number
}

type ProductContextData = {
  page: number
  productsToCards: IProductStoreDTO[]
  products: IProductStoreDTO[]
  isLoading: boolean
  isLoadedProducts: boolean
  pageParams: PageParams
  handleChangePage: (page: number) => void
  handleResetProductsToCards: () => void
}

const ProductPageContext = createContext<ProductContextData>(
  {} as ProductContextData,
)

export function ProductPageProvider({ children }: ProductProdiverProps) {
  const [page, setPage] = useState(1)
  const [productsToCards, setProductsToCards] = useState<IProductStoreDTO[]>([])

  const store = useCurrentStore()

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

  const handleChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const handleResetProductsToCards = useCallback(() => {
    setProductsToCards([])
  }, [])

  useEffect(() => {
    if (isLoadedProducts) {
      const productsToAdd = products?.data?.products ?? []
      const updatedProductsList = [...productsToCards, ...productsToAdd]
      setProductsToCards(updatedProductsList)
    }
  }, [isLoadedProducts, products?.data.products])

  return (
    <ProductPageContext.Provider
      value={{
        page,
        isLoading: isProductsLoading,
        isLoadedProducts,
        pageParams,
        productsToCards,
        handleChangePage,
        handleResetProductsToCards,
        products: products?.data.products ?? [],
      }}
    >
      {children}
    </ProductPageContext.Provider>
  )
}

export const useProduct = () => useContext(ProductPageContext)
