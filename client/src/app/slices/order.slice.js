import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderService } from '../../services/order';

const initialState = {
  loading: false,
  orders: [],
};
export const getAllOrders = createAsyncThunk('Get all Orders', async () => {
  return await OrderService.getAllOrders();
});

export const OrderSlice = createSlice({
  name: 'Order Slice',
  initialState,
  reducers: {
    handleChangeStatus: (state, action)=>{
      return {
        ...state,
        orders: state.orders.map((order) => {
          if(order._id === action.payload._id){
            return {
              ...order,
              status: action.payload.status
            }
          }else{
            return order
          }
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAllOrders.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      return {
        ...state,
        orders: action.payload.sort((a, b) => +b.createdAt - +a.createdAt),
        loading: false,
      };
    });
  },
});

export const {handleChangeStatus} = OrderSlice.actions;
export default OrderSlice.reducer;
