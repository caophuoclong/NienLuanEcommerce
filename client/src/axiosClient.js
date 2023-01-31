import axios from "axios";
import { BASE_URL } from "./configs";

export const axiosCLient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosCLient.interceptors.request.use(({ headers, ...config }) => ({
    ...config,
    headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}));
axiosCLient.interceptors.response.use((response)=>{
    return response.data;
}, (error) => {
    if (error.response.status === 401) {
        // Refresh token
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

