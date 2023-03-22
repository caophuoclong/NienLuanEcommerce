import { axiosClient } from "../axiosClient"

const ProductService = {
    getProducts: async ()=>{
        const response = (await axiosClient.get("/product/home"));
        return response;
    },
    getProduct: async (id)=>{
        const response = (await axiosClient.get(`/product/get/${id}`));
        return response;
    },
    searchProduct: async(name, lang)=>{
        return (await axiosClient.get("/product/search",{
            params: {
                name,
                lang
            }
        }))
    },
    getCategoryProducts: async (_id)=>{
        return (await axiosClient.get("/product/search/category",{
            params: {
                _id
            }
        }))
    },
    getShopProducts: async(name)=>{
        return (await axiosClient.get("/product/search/shop",{
            params: {
                shop: name
            }
        }))
    }
}
export default ProductService;