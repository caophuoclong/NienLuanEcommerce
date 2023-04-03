import { axiosClient } from "../axiosClient"

export const AddressService = {
    getAllProvince: ()=>{
        return axiosClient.get("/address/province")
    },
    getDistrict: (provinceCode)=>{
        return axiosClient.get("/address/district", {
            params: {
                provinceCode
            }
        })
    },
    getWards: (districtCode)=>{
        return axiosClient.get("/address/ward",{
            params: {
                districtCode
            }
        })
    }
}