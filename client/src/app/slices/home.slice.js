import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductService } from '../../services/';

const initialState = {
  products: [],
  loggedIn: false,
};
export const getHome = createAsyncThunk('get home', () => {
  return ProductService.getProducts();
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
      state.products = action.payload;
    });
  },
});

export const { increment } = HomeSlice.actions;
export default HomeSlice.reducer;
