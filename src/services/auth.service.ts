import { DataWrapper } from './types'
import { cashbackApi } from '~api/cashback-api.service'
import { UserDTO } from '~models/User'

export interface IAuthLoginParams {
  PhoneNumber: string
  Password: string
}

export interface IAuthRefreshTokenLoginParams {
  refreshToken: string
}

const generateBaseUrl = (url: string) => `/auth/${url}`

export const authServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postAuthLogin: build.mutation<DataWrapper<UserDTO>, IAuthLoginParams>({
      query: (params) => ({
        url: generateBaseUrl('login'),
        params,
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
