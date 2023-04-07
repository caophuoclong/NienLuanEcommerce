import { axiosClient } from "../axiosClient"

export const CartService = {
    addToCart: (dto)=>{
        return axiosClient.post("/cart", dto)
    },
    getCart: ()=>{
        return axiosClient.get("/cart")
    },
    update: (data)=>{
        return axiosClient.patch("/cart", data)
    }
}