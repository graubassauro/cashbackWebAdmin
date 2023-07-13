import { cashbackApi } from '~api/cashback-api.service'
import { IProductStoreDTO } from '~models/Store'
import { DataWrapper } from './types'

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

export const productServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsByStoreUid: build.query<
      DataWrapper<IProductByStoreResponse>,
      IProductsByStoreParams
    >({
      query: ({ uId, page }) => ({
        url: `product/store/${uId}/all/${page}/2`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProductsByStoreUidQuery } = productServiceApi
