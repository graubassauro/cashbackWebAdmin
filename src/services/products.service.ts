import { cashbackApi } from '~api/cashback-api.service'
import { IProductStoreDTO } from '~models/Store'
import { DataWrapper } from './types'

export interface ICreateProductForStoreBody {
  name: string
  price: number
  quantity: number
  storeUId: string
  highlight: string
  about: string
  brandId: number
  cashbackType: string
  points: number
  acceptCoins: boolean
  percentCoins: number
  categories: Array<number>
}

interface ICreateProductForStoreResponse {
  id: number
  uId: string
  name: string
}

interface ICreateProductImageRequestURLBody {
  productUId: string
  storeUId: string
}

interface ICreateProductImageRequestURLResponse {
  productUId: string
  storeUId: string
  url: string
}

interface IProductsByStoreParams {
  uId: string
  page: number
  size?: number
}

interface IProductByStoreResponse {
  totalRecords: number
  totalPages: number
  currentpage: number
  products: IProductStoreDTO[]
}

interface IDeleteProductsByUid {
  uId: string
}

interface IProductParams {
  uId: string
}

interface Category {
  id: number
  uId: string
  name: string
}

interface Image {
  imageUId: string
  url: string
}

interface IProductDetailResponse {
  id: number
  categories: Category[]
  uId: string
  name: string
  about: string
  price: number
  quantity: number
  storeId: number
  photoUrl: any
  cashbackType: string
  points: number
  acceptCoins: boolean
  amountCoins: number
  brandId: number
  brandName: string
  images: Image[]
}

interface IProductDeleteImageBody {
  productUid: string
  imageUid: string
  storeUid: string
}

export type IUpdateProductBody = Omit<
  ICreateProductForStoreBody,
  'categories'
> & {
  uId: string
}

interface IUpdateProductStatusBody {
  uId: string
  statusId: number
}

interface IGetProductByNameParams {
  uid: string
  name: string
}

export const productServiceApi = cashbackApi.injectEndpoints({
  endpoints: (build) => ({
    postCreateProductForStore: build.mutation<
      DataWrapper<IProductStoreDTO>,
      ICreateProductForStoreBody
    >({
      query: (body) => ({
        url: 'product/create',
        body,
        method: 'POST',
      }),
    }),
    putEditProductForStore: build.mutation<void, IUpdateProductBody>({
      query: (body) => ({
        url: 'product/update',
        body,
        method: 'PUT',
      }),
    }),
    postToReceiveURLToSaveProductImage: build.mutation<
      DataWrapper<ICreateProductImageRequestURLResponse>,
      ICreateProductImageRequestURLBody
    >({
      query: (body) => ({
        url: 'product/image',
        body,
        method: 'POST',
      }),
    }),
    getProductsByStoreUid: build.query<
      DataWrapper<IProductByStoreResponse>,
      IProductsByStoreParams
    >({
      query: ({ uId, page, size = 10 }) => ({
        url: `product/store/${uId}/all/${page}/${size}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getProduct: build.query<
      DataWrapper<IProductDetailResponse>,
      IProductParams
    >({
      query: ({ uId }) => ({
        url: `product/${uId}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getProductByName: build.query<
      DataWrapper<IProductDetailResponse[]>,
      IGetProductByNameParams
    >({
      query: ({ uid, name }) => ({
        url: `product/store/${uid}/name/${name}`,
        method: 'GET',
      }),
    }),
    deleteProduct: build.mutation<
      DataWrapper<ICreateProductForStoreResponse>,
      IDeleteProductsByUid
    >({
      query: (body) => ({
        url: 'product/delete',
        body,
        method: 'DELETE',
      }),
    }),
    deleteProductImage: build.mutation<void, IProductDeleteImageBody>({
      query: (body) => ({
        url: 'product/delete/image',
        body,
        method: 'DELETE',
      }),
    }),
    putProductStatus: build.mutation<void, IUpdateProductStatusBody>({
      query: (body) => ({
        url: 'product/update/status',
        body,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  usePostToReceiveURLToSaveProductImageMutation,
  usePostCreateProductForStoreMutation,
  usePutEditProductForStoreMutation,
  usePutProductStatusMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useGetProductsByStoreUidQuery,
  useGetProductQuery,
  useGetProductByNameQuery,
} = productServiceApi
