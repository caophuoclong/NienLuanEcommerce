import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartService } from '../../services/cart';
const initialState = {
  cart: [],
  itemSelected: [],
};
export const getCart = createAsyncThunk('Get cart', () => {
  return CartService.getCart();
});
export const updateCartItem = createAsyncThunk('Update cart item', (data) => {
  return CartService.update(data);
});
export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    removeCartItem: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload),
      };
    },
    selectItem: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.product.sku === action.payload ? { ...c, selected: true } : c,
        ),
      };
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.product.sku === action.payload ? { ...c, selected: false } : c,
        ),
      };
    },
    emptySelected: (state) => {
      return {
        ...state,
        cart: state.cart.map((c) => ({
          ...c,
          selected: false,
        })),
      };
    },
    selectAllItem: (state) => {
      return {
        ...state,
        cart: state.cart.map((c) => ({
          ...c,
          selected: true,
        })),
      };
    },
    selectAllProductShop: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.product.shop._id === action.payload ? { ...c, selected: true } : c,
        ),
      };
    },
    removeProductShop: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.product.shop._id === action.payload ? { ...c, selected: false } : c,
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      console.log(action);
      return {
        ...state,
        cart: action.payload.map((c) => {
          return {
            ...c,
            selected: false,
          };
        }),
      };
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const cart = state.cart.map((c) => {
        if (c._id === action.payload._id) {
          return {
            ...c,
            ...action.payload.field,
          };
        } else {
          return c;
        }
      });
      return {
        ...state,
        cart,
      };
    });
  },
});

export const {
  addCartItem,
  selectItem,
  removeItem,
  emptySelected,
  selectAllItem,
  selectAllProductShop,
  removeProductShop,
  removeCartItem,
} = CartSlice.actions;
export default CartSlice.reducer;
