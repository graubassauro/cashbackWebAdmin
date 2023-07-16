import { cashbackApi } from '~api/cashback-api.service'
import { IProductStoreDTO } from '~models/Store'
import { DataWrapper } from './types'

export interface ICreateProductForStoreBody {
  name: string
  price: number
  quantity: number
  storeUId: string
  highlight: string
  about: string
  brandId: number
  cashbackType: string
  points: number
  categories: Array<number>
}

interface ICreateProductForStoreResponse {
  id: number
  uId: string
  name: string
}

interface ICreateProductImageRequestURLBody {
  productUId: string
  storeUId: string
}

interface ICreateProductImageRequestURLResponse {
  productUId: string
  storeUId: string
  url: string
}

interface IProductsByStoreParams {
  uId: string
  page: number
}

interface IProductByStoreResponse {
  totalRecords: number
  totalPages: number
  currentpage: number
  products: IProductStoreDTO[]
}

interface IDeleteProductsByUid {
  uId: string
}

export const productServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postCreateProductForStore: build.mutation<void, ICreateProductForStoreBody>(
      {
        query: (body) => ({
          url: 'product/create',
          body,
          method: 'POST',
        }),
      },
    ),
    postToReceiveURLToSaveProductImage: build.mutation<
      DataWrapper<ICreateProductImageRequestURLResponse>,
      ICreateProductImageRequestURLBody
    >({
      query: (body) => ({
        url: 'product/image',
        body,
        method: 'POST',
      }),
    }),
    getProductsByStoreUid: build.query<
      DataWrapper<IProductByStoreResponse>,
      IProductsByStoreParams
    >({
      query: ({ uId, page }) => ({
        url: `product/store/${uId}/all/${page}/10`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    deleteProduct: build.mutation<
      DataWrapper<ICreateProductForStoreResponse>,
      IDeleteProductsByUid
    >({
      query: (body) => ({
        url: 'product/delete',
        body,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  usePostCreateProductForStoreMutation,
  useGetProductsByStoreUidQuery,
  useDeleteProductMutation,
} = productServiceApi
