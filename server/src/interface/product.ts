import { Category } from '../database/entities/category/index';
export interface IProduct {
  _id?: string;
  name: string;
  category: Category;
  detail: Array<IProductDetail>;
  description?: string;
  variant: Array<IProductVariant>;
  sold?: number;
  price?: number;
  stock?: number;
}
export interface IProductVariant {
  _id?: string;
  images: string;
  price: number;
  sold: number;
  stock: number;
  attribute: Array<{
    key: string;
    value: any;
  }>;
}
export interface IProductDetail {
  _id?: number;
  key: string;
  value: any;
  deleted?: boolean;
}
