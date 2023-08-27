type PromotionImage = {
  productImageUId: string
  url: string
}

export type PromotionProduct = {
  brand: string
  images: PromotionImage[]
  name: string
  productId: number
  productPrice: number
  productUid: string
  promotionPriceOff: number
}

export type Promotion = {
  uId: string
  name: string
  initialDate: string
  endDate: string
  about: string
  highlight: string
  productUid: string
  brand: string
  productName: string
  productPrice: number
  promotionPriceOff: number
  images: string[]
  status: 'Active'
  products: PromotionProduct[]
  id: number
}

export type PromotionGroup = Pick<
  Promotion,
  'uId' | 'name' | 'initialDate' | 'endDate'
>
