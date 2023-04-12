import { IAddress } from "./address"
import { IUser } from "./user"

export enum OrderStatus {
  PENDING = "PENDING", // when the order is created
  PROCESSING = "PROCESSING", // when the order is paid or the payment is confirmed or shop accept payment method
  DELIVERING = "DELIVERING", // when the order is delivering to the customer
  DELIVERED = "DELIVERED", // when the customer received the order
  CANCELLED = "CANCELLED", // when the customer cancel the order or the shop cancel the order
  RETURNED = "RETURNED", // when the shop received the order after the customer return the order
  REFUNDED = "REFUNDED", // when the shop refunded the order
}
export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
export enum PaymentType {
  COD = "COD",
  CREDIT_CARD = "CREDIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  PAYPAL = "PAYPAL",
}
interface OrderProductItem {
  _id: number
  price: number
  quantity: number

  product: {
    _id: number
    name: string
    price: number
    stock: number
    hasVariant: boolean
    variants: {
      [key: string]: {
        _id: number
        value: string
        image?: string
      }
    }
    description: string
  }
}
interface Order {
  address: IAddress
  customer: IUser
  shippingCost: number
  shipping: null
  status: OrderStatus
  _id: number
  createdAt: number
  orderItems: Array<OrderProductItem>
  payment: {
    _id: number
    createdAt: number
    status: PaymentStatus
    type: PaymentType
  }
}
export type { Order, OrderProductItem }
