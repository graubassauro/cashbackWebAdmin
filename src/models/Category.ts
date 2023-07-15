export interface ICategoryDTO {
  id: number
  uId: string
  parentId?: number | null
  statusId?: number
  name: string
  categoryParent?: string | null
  categories: Array<ICategoryDTO>
}
