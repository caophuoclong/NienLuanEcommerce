import { ICategory } from "./category";

export interface IProduct{
    id?: number,
    name: string,
    // price: number,
    category: ICategory,
    // stock: number,
    detail: {
        [key: string]: string
    }
    // description: string;
    meta: Array<{
        [key: string]: string
    }>
}