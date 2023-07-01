import { cashbackApi } from '~api/cashback-api.service'

interface IDeleteStoreBody {
  uId: string
}

export const storeServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    deleteStore: build.mutation<void, IDeleteStoreBody>({
      query: (body) => ({
        url: 'store/delete',
        body,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDeleteStoreMutation } = storeServiceApi
