import { createSlice } from "@reduxjs/toolkit";

interface ProductSlice{

}
const initialState: ProductSlice = {

}

export const ProductSlice = createSlice({
    name: "Product slice",
    initialState,
    reducers:{
        
    }
})

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;