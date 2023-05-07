import { IProduct } from "../../types/product"
import { axiosClient } from "../axiosClient"

export class ProductService {
  static async addProduct(product: IProduct) {
    return (await axiosClient.post("/product", product)).data
  }
  static async uploadImage(formData: FormData) {
    return (
      await axiosClient.post("/product/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data
  }
  static async getMyProducts() {
    return (await axiosClient.get<Array<IProduct>>("/product/shop")).data
  }
  static async getProducts(name: string) {
    return (
      await axiosClient.get<Array<IProduct>>("/product/q/shop", {
        params: {
          name: name,
        },
      })
    ).data
  }
  static async getProduct(_id?: string) {
    return await axiosClient.get<IProduct>("/product" + "/get" + "/" + _id)
  }
  static async editProduct(product: IProduct) {
    return (await axiosClient.put("/product", product)).data
  }
  static async updateVariantDetailsProduct(
    data: {
      sku: string
      price: number
      stock: number
    }[]
  ) {
    return (await axiosClient.put("/product/variantDetail", data)).data
  }
  static async deleteProduct(_id: string) {
    return (await axiosClient.delete("/product/" + _id)).data
  }
  static async restoreProduct(_id: string) {
    return (await axiosClient.put("/product/restore/" + _id)).data
  }
}
