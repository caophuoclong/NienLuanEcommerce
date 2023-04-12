import { axiosClient } from "../axiosClient"

export const OrderService = {
    checkOut: (data)=>{
        return axiosClient.post("/order", data);
    },
    getExistingCard: ()=>{
        return axiosClient.get("/order/card");
    },
    getAllOrders: ()=>{
        return axiosClient.get("/order") 
    }
}