import { ICategory } from "./category"

export interface IProduct {
  _id: string
  name: string
  category: ICategory
  detail: Array<IProductDetail>
  description?: string
  variant: Array<IProductVariant>
  createdAt: string
  updatedAt: string
  hasVariant: boolean
  price: number
  stock: number
  sold: number
  images: {
    type: "link" | "file"
    images: {
      link: string
      name?: string
      size?: number
      type?: string
    }[]
  }
}
export interface IProductVariant {
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
  deleted: boolean
}
