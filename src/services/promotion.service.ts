import { cashbackApi } from '~api/cashback-api.service'
import { Promotion, PromotionGroup } from '~models/Promotion'

import { DataWrapper } from './types'

interface IPromotionsByStoreParams {
  uId: string
}

interface ICreatePromotionByStoreBody {
  name: string
  initialDate: string
  finalDate: string
  storeUId: string
  highlight: string
  about: string
}

interface IVinculateProductToPromotionParams {
  promotionUid: string
  productUid: string
  priceOff: number
}

const generateBaseUrl = (url: string) => `promotion/${url}`

export const promotionsServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    getPromotionsByStoreUid: build.query<
      DataWrapper<Promotion[]>,
      IPromotionsByStoreParams
    >({
      query: (params) => ({
        url: generateBaseUrl(`store/${params.uId}`),
        method: 'GET',
      }),
      providesTags: ['Promotion'],
    }),
    postPromotionGroup: build.mutation<
      DataWrapper<PromotionGroup>,
      ICreatePromotionByStoreBody
    >({
      query: (body) => ({
        url: generateBaseUrl('create'),
        body,
        method: 'POST',
      }),
    }),
    postVinculateProductToPromo: build.mutation<
      void,
      IVinculateProductToPromotionParams
    >({
      query: (body) => ({
        url: generateBaseUrl('/product/add'),
        body,
        method: 'POST',
      }),
    }),
    deletePromotion: build.mutation<void, IPromotionsByStoreParams>({
      query: (body) => ({
        url: generateBaseUrl('delete'),
        body,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetPromotionsByStoreUidQuery,
  usePostPromotionGroupMutation,
  usePostVinculateProductToPromoMutation,
  useDeletePromotionMutation,
} = promotionsServiceApi
