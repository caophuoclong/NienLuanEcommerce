import { ICategory } from "./category"

export interface IProduct {
  _id?: number
  name: string
  category: ICategory
  detail:Array<IProductDetail>,
  description?: string
  meta: Array<IProductMeta>
}
export interface IProductMeta {
  _id?: number
  images: string
  price: number
  sold: number
  stock: number
  attribute: Array<{
      key: string;
      value: any;
    }>
}
export interface IProductDetail{
  _id?: number;
  key: string;
  value: any;
  deleted?: boolean;
}