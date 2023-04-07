import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import homeSlice from "../features/home"
import productSlice from "../features/product"
import orderSlice from "../features/order"
export const store = configureStore({
  reducer: {
    homeSlice,
    productSlice,
    orderSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
