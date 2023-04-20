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
    },
    deleteProductItem: (sku)=>{
        return axiosClient.delete("/cart/product", {
            params:{
                sku
            }
        })

    },
    handleDeleteManyCartItem: (data)=>{
        console.log(data);
        return axiosClient.delete("/cart/product/many", {
            data
        })
    }
}