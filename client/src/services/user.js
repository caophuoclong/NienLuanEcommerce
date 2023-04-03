import { axiosClient } from "../axiosClient"

export const UserService = {
    getMe: ()=>{
        return axiosClient.get("/customer")
    }
}