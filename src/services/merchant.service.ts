import { cashbackApi } from '~api/cashback-api.service'

import { DataWrapper } from './types'

export interface ICreateMerchantBody {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  password: string
}

export interface ICreateMerchantStoreBody {
  name: string
  email: string
  phoneNumber: string
  note: string
  urlLogo: string
  statusId: number
  zipCode: string
  street: string
  streetNameFormatted: string
  streetNumber: string
  cityId: number
  latitude: number
  longitude: number
}

export interface ICreateMerchantStoreResponseDTO {
  name: string
  email: string
  phoneNumber: string
  note: string
  urlLogo: string
  statusId: number
  merchantId: number
  zipCode: string
  street: string
  streetNameFormatted: string
  streetNumber: string
  cityId: number
  latitude: number
  longitude: number
  profileImageUrl: string
}

export interface IGetMerchantStoresParams {
  page: number
  pagesize: number
}

export interface ICreateMerchantDTO {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export interface IStoreDTO {
  id: number
  uId: string
  name: string
  email: string
  phoneNumber: string
  urlLogo: string
  statusId: number
  merchantId: number
  categories: Array<object>
  products: Array<object>
}

export interface IMerchantStoresDTO {
  totalRecords: number
  totalPages: number
  currentpage: number
  stores: IStoreDTO[]
}

const generateBaseUrl = (url: string) => `merchant/${url}`

export const merchantServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postCreateMerchant: build.mutation<
      DataWrapper<ICreateMerchantDTO>,
      ICreateMerchantBody
    >({
      query: (body) => ({
        url: generateBaseUrl('create'),
        body,
        method: 'POST',
      }),
    }),
    postCreateMerchantStore: build.mutation<
      DataWrapper<ICreateMerchantStoreResponseDTO>,
      ICreateMerchantStoreBody
    >({
      query: (body) => ({
        url: generateBaseUrl('store/create'),
        body,
        method: 'POST',
      }),
    }),
    getAllMerchantStores: build.query<
      DataWrapper<IMerchantStoresDTO>,
      IGetMerchantStoresParams
    >({
      query: ({ page, pagesize }) => ({
        url: generateBaseUrl(`store/all/${page}/${pagesize}`),
        method: 'GET',
      }),
    }),
  }),
})

export const {
  usePostCreateMerchantMutation,
  usePostCreateMerchantStoreMutation,
  useGetAllMerchantStoresQuery,
} = merchantServiceApi
