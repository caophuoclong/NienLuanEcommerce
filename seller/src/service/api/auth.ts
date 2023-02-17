import { IUser } from "../../types/user";
import { axiosClient } from "../axiosClient";

export class AuthService{
    static async login({username, password, rememberMe}: {username: string, password: string, rememberMe?: boolean}){
        const response = await axiosClient.post<string>("/auth/login/seller", {username, password, rememberMe})
        return response
    }
    static async refreshToken(){
        return await axiosClient.get<string>("/auth/refreshToken")
    }
    static async getMe(){
        return await axiosClient.get<IUser>("/customer")
    }
}