import { ICategory } from "./category"

export interface IProduct {
  _id?: string
  name: string
  category: ICategory
  detail: Array<IProductDetail>
  description?: string
  meta: Array<IProductMeta>
  createdAt: string
  updatedAt: string
}
export interface IProductMeta {
  _id?: number
  images: string
  price: number
  sold: number
  stock: number
  attribute: Array<{
    key: string
    value: any
  }>
}
export interface IProductDetail {
  _id?: number
  key: string
  value: any
  deleted?: boolean
}
