import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HomeService } from '../../services/';

const initialState = {
  products: [],
};
const getHome = createAsyncThunk('get home', () => {
  return HomeService.getProducts();
});

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHome.fulfilled, (state, action) => {
      state.products = action.payload.data;
    });
  },
});

export const { increment } = HomeSlice.actions;
export default HomeSlice.reducer;
