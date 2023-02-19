import { ICategory } from "./category";

export interface IProduct{
    _id?: string,
    name: string,
    // price: number,
    category: ICategory,
    // stock: number,
    detail: {
        [key: string]: any
    }
    description?: string;
    meta: Array<{
        [key: string]: any
    }>
}