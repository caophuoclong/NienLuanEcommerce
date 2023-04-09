import { ICategory } from "./category"
export enum ProductStatus {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  HIDE = "HIDE",
}
export interface IProduct {
  _id: string
  name: string
  category: ICategory
  detail: Array<IProductDetail>
  description?: string
  variants: Array<{
    type: string
    options: {
      _id: number
      value: string
      image?: string
    }[]
  }>
  createdAt: string
  updatedAt: string
  hasVariant: boolean
  price: number
  stock: number
  sold: number
  variantDetails: Array<{
    sku: string
    key: string
    price: number
    stock: number
  }>
  images: {
    type: "link" | "file"
    images: {
      link: string
      name?: string
      size?: number
      type?: string
    }[]
  }
  status: ProductStatus
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
