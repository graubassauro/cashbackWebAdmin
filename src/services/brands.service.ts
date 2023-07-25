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

interface ICreateBrandByStoreParams {
  name: string
  storeUId: string
}

interface IBrandSearchParams {
  uId: string
  name: string
}

export const brandsServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postBrandByStoreUid: build.mutation<void, ICreateBrandByStoreParams>({
      query: (body) => ({
        url: 'product/brand/create',
        body,
        method: 'POST',
      }),
    }),
    getBrandsByStoreUid: build.query<
      DataWrapper<IBrandsByStoreResponse>,
      IBrandsByStoreParams
    >({
      query: ({ uId, page = 1 }) => ({
        url: `product/brand/store/${uId}/all/${page}/20`,
        method: 'GET',
      }),
      providesTags: ['Brands'],
    }),
    getBrandsByName: build.query<
      DataWrapper<IBrandsByStoreResponse>,
      IBrandSearchParams
    >({
      query: ({ uId, name }) => ({
        url: `product/brand/store/${uId}/name/${name}/1/100`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  usePostBrandByStoreUidMutation,
  useGetBrandsByStoreUidQuery,
  useGetBrandsByNameQuery,
} = brandsServiceApi
