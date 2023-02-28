import { IProduct } from "../../types/product"
import { axiosClient } from "../axiosClient"

export class ProductService {
  static async addProduct(product: IProduct) {
    return (await axiosClient.post("/product", product)).data
  }
  static async getMyProducts() {
    return (await axiosClient.get<Array<IProduct>>("/product/shop")).data
  }
  static async getProduct(_id?: string) {
    return (
      await axiosClient.get<{
        product: IProduct
        categories: Array<any>
      }>("/product" + "/get" + "/" + _id)
    ).data
  }
  static async editProduct(product: IProduct) {
    return (await axiosClient.put("/product", product)).data
  }
}
