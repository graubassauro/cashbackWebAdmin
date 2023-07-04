import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react'

import { authenticationHeader } from './utils/headers'
import { logout } from '~redux/auth'

const API_URL = 'https://app-cashback-api.azurewebsites.net'
const API_VERSION = 'v1'

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/${API_VERSION}`,
  prepareHeaders: authenticationHeader,
})

const cashbackApiWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const cashbackApiRefreshToken = await baseQuery(args, api, extraOptions)

  if (
    cashbackApiRefreshToken?.error?.status === 401 ||
    cashbackApiRefreshToken?.error?.status === 403
  ) {
    // send refresh token to get new access token
    // const refreshTokenData = await baseQuery(
    //   '/auth/refresh-token',
    //   api,
    //   extraOptions,
    // )

    // if (refreshTokenData) {
    //   api.dispatch(
    //     setCredentials({
    //       user: refreshTokenData.data.userToken,
    //       refresh_token: refreshTokenData.data.refreshToken,
    //       token: refreshTokenData.data.accessToken,
    //       is_first_login: false,
    //     }),
    //   )
    // } else {
    api.dispatch(logout())
    // }
  }

  return cashbackApiRefreshToken
}

export const cashbackApi = createApi({
  baseQuery: cashbackApiWithReauth,
  endpoints: () => ({}),
  reducerPath: 'cashbackApi',
  tagTypes: ['Auth', 'Merchant'],
})
