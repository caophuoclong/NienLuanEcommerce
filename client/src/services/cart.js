import { axiosClient } from "../axiosClient"

export const CartService = {
    addToCart: (productId)=>{
        return axiosClient.post("/cart", {productId})
    }
}