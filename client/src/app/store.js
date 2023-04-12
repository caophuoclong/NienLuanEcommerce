import { configureStore } from '@reduxjs/toolkit';
import homeSliceReducer from "./slices/home.slice";
import settingsSliceReducer from "./slices/setting.slice";
import cartSliceReducer from "./slices/cart.slice"
import orderSlice from './slices/order.slice';
export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
    settings: settingsSliceReducer,
    cart: cartSliceReducer,
    order: orderSlice
  },
});
