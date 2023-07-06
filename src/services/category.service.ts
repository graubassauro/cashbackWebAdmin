import { cashbackApi } from '~api/cashback-api.service'
import { DataWrapper } from './types'
import { ICategoryDTO } from '~models/Category'

export const categoriesServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<DataWrapper<ICategoryDTO[]>, void>({
      query: () => ({
        url: 'category/all',
        method: 'GET',
      }),
    }),
    getCategoryById: build.query<DataWrapper<ICategoryDTO[]>, void>({
      query: () => ({
        url: 'category/id',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoriesServiceApi
