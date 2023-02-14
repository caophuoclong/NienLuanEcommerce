export interface IProduct{
    id: number,
    name: string,
    price: number,
    category: string,
    stock: number,
    description: string;
    meta?: {
        [key: string]: string
    }
}