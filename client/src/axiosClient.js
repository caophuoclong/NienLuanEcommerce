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
const publicApi = [
    /\/product\/.*/,
    /\/auth\/.*/,
    /\/address\/.*/,

]
axiosClient.interceptors.request.use((config)=>{
    console.log(config.url);
    const isPublic = publicApi.find(item => item.test(config.url));
    if(isPublic) return config;
    const token = localStorage.getItem("access_token")
    if(!token || token === undefined || token === "undefined" || token === null || token === "null")
    {
        const err = new Error("Please login to do this action");
        err.name = "TokenNotGiven"
        throw err;
    }
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => response.data, async (error)=>{
    if(error.name === "TokenNotGiven"){
        alert(error.message);
    }
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