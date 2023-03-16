import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: [],
    length: 0
}
export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            return {
                ...state,
                cart: [
                    ...state.cart,
                    action.payload
                ]
            }
        }
    }
})

export const {addToCart} = CartSlice.actions;
export default CartSlice.reducer;