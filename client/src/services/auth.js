import { axiosClient } from "../axiosClient"

export const AuthService = {
    signin: (data)=>{
        return axiosClient.post("/auth/login", data);
    },
    refreshToken(){
        return axiosClient.get("/auth/refreshToken")
    },
    logout(){
        return axiosClient.post("/auth/logout")
    }
}