import { IAddress } from "./address"

export interface IUser {
  _id: string
  firstName?: string
  lastName?: string
  middleName?: string
  shop_name?: string
  dob?: string
  gender?: string
  imgUrl: string
  auth: {
    email: string
    phone: string
    username: string
  }
  address: IAddress
  createdAt: number
}
