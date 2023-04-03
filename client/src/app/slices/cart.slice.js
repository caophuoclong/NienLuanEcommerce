import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartService } from '../../services/cart';
const initialState = {
  cart: [],
  itemSelected: [],
};
export const getCart = createAsyncThunk('Get cart', () => {
  return CartService.getCart();
});
export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    selectItem: (state, action) => {
      const newItem = [...state.itemSelected];
      if (Array.isArray(action.payload)) {
        action.payload.forEach((item) => {
          const isExist = newItem.find((x) => x._id === item._id);
          if (!isExist) {
            newItem.push(item);
          }
        });
      } else {
        const isExist = newItem.find((x) => x._id === action.payload._id);
        if (!isExist) {
          newItem.push(action.payload);
        }
      }
      console.log("🚀 ~ file: cart.slice.js:22 ~ newItem:", newItem)

      return {
        ...state,
        itemSelected: newItem,
      };
    },
    removeItem: (state, action)=>{
        const currentItems = [...state.itemSelected];
        if(Array.isArray(action.payload)){
            action.payload.forEach(item =>{
                const index = currentItems.findIndex(x => x._id === item._id);
                if(index !== -1){
                    currentItems.splice(index, 1);
                }
            })
        }else{
            const index = currentItems.findIndex(x => x._id === action.payload._id);
            if(index !== -1){
                currentItems.splice(index, 1);
            }
        }
        return {
            ...state,
            itemSelected: currentItems
        }
    },
    emptySelected: (state)=>{
      return {
        ...state,
        itemSelected: []
      }
    },
    selectAllItem:(state)=>{
      return{
        ...state,
        itemSelected: [...state.cart]
      }
    },
    updateCart: (state, action)=>{
      const cart = [...state.cart];
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      console.log(action);
      return {
        ...state,
        cart: action.payload,
      };
    });
  },
});

export const { addToCart, selectItem, removeItem, emptySelected, selectAllItem} = CartSlice.actions;
export default CartSlice.reducer;
