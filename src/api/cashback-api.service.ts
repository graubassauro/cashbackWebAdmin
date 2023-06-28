import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authenticationHeader } from './utils/headers'

const API_URL = 'https://app-cashback-api.azurewebsites.net'
const API_VERSION = 'v1'

export const cashbackApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/${API_VERSION}`,
    prepareHeaders: authenticationHeader,
  }),
  endpoints: () => ({}),
  reducerPath: 'cashbackApi',
  tagTypes: ['Users', 'Products'],
})
