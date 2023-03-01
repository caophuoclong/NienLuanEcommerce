import { axiosCLient } from "../axiosClient"

const ProductService = {
    getProducts: async ()=>{
        const response = (await axiosCLient.get("/product/home"));
        console.log("🚀 ~ file: home.js:6 ~ getProducts: ~ response:", response)
        return response;
    },
    getProduct: async (id)=>{
        const response = (await axiosCLient.get(`/product/get/${id}`));
        return response;
    }
}
export default ProductService;