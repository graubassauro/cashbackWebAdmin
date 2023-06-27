import { cashbackApi } from '~api/cashback-api.service'

export interface ICustomerCreateParams {
  frstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  officeAddress: string
  password: string
}

export type ICustomerProfileParams = Omit<ICustomerCreateParams, 'password'>

const generateBaseUrl = (url: string) => `/customer/${url}`

export const customerServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postCustomerCreate: build.mutation<void, ICustomerCreateParams>({
      query: (body) => ({
        url: generateBaseUrl('create'),
        body,
        method: 'POST',
      }),
    }),
    putCustomerProfile: build.mutation<void, ICustomerProfileParams>({
      query: (body) => ({
        url: generateBaseUrl('profile'),
        body,
        method: 'PUT',
      }),
    }),
    getCustomerProfile: build.query({
      query: () => ({
        url: generateBaseUrl('profile'),
        method: 'GET',
      }),
    }),
    putCustomerProfileImage: build.mutation({
      query: () => ({
        url: generateBaseUrl('profile/image'),
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  usePostCustomerCreateMutation,
  usePutCustomerProfileMutation,
  useGetCustomerProfileQuery,
  usePutCustomerProfileImageMutation,
} = customerServiceApi
