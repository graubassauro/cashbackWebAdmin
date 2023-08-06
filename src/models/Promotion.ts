export type Promotion = {
  uId: string
  name: string
  initialDate: string
  finalDate: string
  about: string
  highlight: string
  productUid: string
  brand: string
  productName: string
  productPrice: number
  promotionPriceOff: number
  images: string[]
  id: number
}

export type PromotionGroup = Pick<
  Promotion,
  'uId' | 'name' | 'initialDate' | 'finalDate'
>
