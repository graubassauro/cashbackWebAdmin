import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authenticationHeader } from './utils/headers'

export const cashbackApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_CASHBACK}/api/${process.env.API_VERSION}`,
    prepareHeaders: authenticationHeader,
  }),
  endpoints: () => ({}),
  reducerPath: 'cashbackApi',
  tagTypes: ['Users', 'Products'],
})
