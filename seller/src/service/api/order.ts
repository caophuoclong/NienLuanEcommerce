import { OrderStatus } from "../../types/order"
import { axiosClient } from "../axiosClient"

export class OrderService {
  static async getOrders() {
    return await axiosClient.get("/order/shop")
  }
  static async changeOrderStatus(_id: number, status: OrderStatus) {
    return await axiosClient.patch("/order", {
      _id,
      status,
    })
  }
}
