import { cashbackApi } from '~api/cashback-api.service'

export interface IAuthLoginParams {
  PhoneNumber: string
  Password: string
  isPersistent: boolean
}

export interface IAuthRefreshTokenLoginParams {
  refreshToken: string
}

const generateBaseUrl = (url: string) => `/auth/${url}`

export const authServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postAuthLogin: build.mutation<void, IAuthLoginParams>({
      query: (body) => ({
        url: generateBaseUrl('login'),
        body,
        method: 'POST',
      }),
    }),
    postAuthRefreshToken: build.mutation<void, IAuthRefreshTokenLoginParams>({
      query: (body) => ({
        url: generateBaseUrl('refresh-token'),
        body,
        method: 'POST',
      }),
    }),
  }),
})

export const { usePostAuthLoginMutation, usePostAuthRefreshTokenMutation } =
  authServiceApi
