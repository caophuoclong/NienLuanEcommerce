import { IProduct } from "../../types/product";
import { axiosClient } from '../axiosClient';

export class ProductService {
    static async addProduct(product: IProduct){
        return (await axiosClient.post("/product", product)).data;
    }
    static async getMyProducts(){
        return (await axiosClient.get<Array<IProduct>>("/product/shop")).data;
    }
}