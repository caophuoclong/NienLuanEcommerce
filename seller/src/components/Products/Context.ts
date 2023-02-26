import { createContext, Dispatch } from "react";
import { IProduct } from '../../types/product';
import { initial } from "./Reducer";

const  ProductContext = createContext<[IProduct, Dispatch<any>]>([
    initial,()=> null
]);
export default ProductContext;