import { cashbackApi } from '~api/cashback-api.service'

import { DataWrapper } from './types'

interface IAddressLocationParams {
  address: string
}

export interface IAddressLocationDTO {
  placeId: number
  latitude: string
  longitude: string
  displayName: string
  type: string
  address: {
    road: string
    residential: string
    suburb: string
    city: string
    municipality: string
    state: string
    postcode: string
    country: string
    countryCode: string
    cityDistrict: string
  }
}

const generateBaseUrl = (url: string) => `location/${url}`

export const locationServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    getAdressLocation: build.query<
      DataWrapper<IAddressLocationDTO[]>,
      IAddressLocationParams
    >({
      query: (params) => ({
        url: generateBaseUrl('address'),
        params,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAdressLocationQuery } = locationServiceApi
