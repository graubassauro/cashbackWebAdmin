import { cashbackApi } from '~api/cashback-api.service'
import { ICategoryDTO } from '~models/Category'
import { DataWrapper } from './types'

interface IBrandsByStoreParams {
  uId: string
  page?: number
}

interface IBrandsByStoreResponse {
  total: number
  currentpage: number
  brands: ICategoryDTO[]
}

export const brandsServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    getBrandsByStoreUid: build.query<
      DataWrapper<IBrandsByStoreResponse>,
      IBrandsByStoreParams
    >({
      query: ({ uId, page = 1 }) => ({
        url: `product/brand/store/${uId}/all/${page}/2`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetBrandsByStoreUidQuery } = brandsServiceApi
