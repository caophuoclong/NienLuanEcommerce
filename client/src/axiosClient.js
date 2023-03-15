import axios, { AxiosError } from "axios"
import { AuthService } from "./services/auth"

const baseUrl = process.env.REACT_APP_BASE_URL

export const axiosClient = axios.create({
    baseURL: `${baseUrl}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})
axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    return config;
})

axiosClient.interceptors.response.use((response) => response.data, async (error)=>{
    if(error.response.status === 401){
        try{
            const response =  await AuthService.refreshToken();
            localStorage.setItem("access_token", response)
            error.config.headers.Authorization = `Bearer ${response}`
            return axiosClient(error.config)
        }catch(error){
            if(error.response.status === 403 && error.response.data.message === "Your refresh token is not valid"){
                alert("Session time out! Please login again!")
                localStorage.removeItem("access_token")
                window.location.href = "/signin"
            }
        }
    }
    else if (error.response.status === 400 && error.response.data.message === "Refresh token is not provided"){
        alert("Session time out! Please login again!")
        localStorage.removeItem("access_token")
        window.location.href = "/signin"
    } else if (error.response.status === 404){
        console.log(error.response.data.message);
        
    }
    else{
        return Promise.reject(error)
    }
})