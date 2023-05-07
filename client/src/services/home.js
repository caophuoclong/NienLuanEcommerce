import { axiosClient } from "../axiosClient"

export const HomeService ={
    getCategories: ()=>{
        return axiosClient.get("/category/categories")
    }
}