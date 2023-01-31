import { axiosCLient } from "../axiosClient"

const HomeService = {
    getProducts: async ()=>{
        return axiosCLient.get("/products");
    }
}
export default HomeService;