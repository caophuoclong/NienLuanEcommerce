import { axiosClient } from "../axiosClient"

export const CartService = {
    addToCart: (dto)=>{
        return axiosClient.post("/cart", dto)
    },
    getCart: ()=>{
        return axiosClient.get("/cart")
    },
    update: (_id, field)=>{
        return axiosClient.patch("/cart", {
            _id,
            field
        })
    }
}