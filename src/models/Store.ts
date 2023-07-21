import { ICategoryDTO } from './Category'

interface ImageFile {
  imageUid: string
  url: string
}

export interface IProductStoreDTO {
  id: number
  uId: string
  name: string
  price: number
  quantity: number
  storeId: number
  photoUrl: string | null
  cashbackType: string
  points: number
  brandId: null
  brandName: string
  images: ImageFile[]
  categories?: ICategoryDTO[]
}

export interface IStoreDTO {
  id: number
  uId: string
  name: string
  email: string
  phoneNumber: string
  urlLogo: string
  statusId: number
  merchantId: number
  storeAddress: {
    id: number
    uId: string
    cityId: number
    streetName: string
    streetNameFormatted: string
    zipCode: string
    latitude: number
    longitude: number
    streetNumber: string
    city: {
      id: number
      uId: string
      stateId: number
      name: string
      statusId: number
      state: string | null
    }
  }
  categories: Array<object>
  products: IProductStoreDTO[]
}
