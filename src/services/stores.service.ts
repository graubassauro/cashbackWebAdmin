import { cashbackApi } from '~api/cashback-api.service'

interface IDeleteStoreBody {
  uId: string
}

interface IUpdateStoreBody {
  uid: string
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

export const storeServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    updateStore: build.mutation<void, IUpdateStoreBody>({
      query: (body) => ({
        url: 'store/update',
        body,
        method: 'PUT',
      }),
    }),
    deleteStore: build.mutation<void, IDeleteStoreBody>({
      query: (body) => ({
        url: 'store/delete',
        body,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useUpdateStoreMutation, useDeleteStoreMutation } =
  storeServiceApi
