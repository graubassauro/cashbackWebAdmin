export interface ICategoryDTO {
  id: number
  uId: number
  parentId?: number | null
  statusId?: number
  name: string
  categoryParent?: string | null
  categories: Array<ICategoryDTO>
}

export type IBrandORCategory = {
  id: number
  uId: number
  name: string
  categories: Array<IBrandORCategory>
}
