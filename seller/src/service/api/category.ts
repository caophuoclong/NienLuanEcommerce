import { axiosClient } from '../axiosClient';
export class CategoryService{

    static async findCategoryByName(name: string, lang: "vi" | "en"){
        return (await axiosClient.get("/category", {
            params:{
                name,
                lang
            }
        })).data
    }
}