import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Order, OrderStatus } from "../../types/order"
import { OrderService } from "../../service/api/order"
export interface IOrder {
  order: Array<
    Order & {
      selected: boolean
    }
  >
}
export const getOrders = createAsyncThunk("Get orders", async () => {
  return (await OrderService.getOrders()).data
})
const initialState: IOrder = {
  order: [],
}
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        _id: number
        status: OrderStatus
      }>
    ) => {
      return {
        ...state,
        order: state.order.map((pr: any) =>
          pr._id === action.payload._id
            ? {
                ...pr,
                status: action.payload.status,
              }
            : pr
        ),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload.map((pr: any) => ({
          ...pr,
          selected: false,
        })),
      }
    })
  },
})

export const { updateOrderStatus } = orderSlice.actions
export default orderSlice.reducer
