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
        cart: [
          ...state.cart,
          {
            ...action.payload,
            selected: false,
          },
        ],
      };
    },
    removeCartItem: (state, action) => {
      // const tmpCart = [...state.cart];
      // action.payload.forEach((item) => {
      //   const index = tmpCart.findIndex((c) => c.product.sku === item.productVariantDetail.sku);
      //   console.log(index);
      //   if (index !== -1) {
      //     tmpCart.splice(index, 1);
      //   }
      // });
      const listSku = action.payload.map((x) => x.product.sku);
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => !listSku.includes(cartItem.product.sku),
        ),
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
        cart: state.cart.map((c) => {
          if (!c.product.deleted) {
            return ({
              ...c,
              selected: true,
            });
          }else{
            return {
              ...c,
              selected: false
            };
          }
        }),
      };
    },
    selectAllProductShop: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((c) =>
          (c.product.shop._id === action.payload && c.product.deleted === false) ? { ...c, selected: true } : c,
        ),
      };
    },
    removeProductShop: (state, action) => {
      return {
        ...state,
        cart: state.cart.map((c) =>
          (c.product.shop._id === action.payload && c.product.deleted === false) ? { ...c, selected: false } : c,
        ),
      };
    },
    deleteProductItem: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product._id !== action.payload._id,
        ),
      };
    },
    removeManyCartItem: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((cart) => !action.payload.includes(cart._id)),
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
  removeManyCartItem,
  addCartItem,
  selectItem,
  removeItem,
  emptySelected,
  selectAllItem,
  selectAllProductShop,
  removeProductShop,
  removeCartItem,
  deleteProductItem,
} = CartSlice.actions;
export default CartSlice.reducer;
