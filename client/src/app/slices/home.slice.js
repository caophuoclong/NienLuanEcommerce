import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductService } from '../../services/';
import { UserService } from '../../services/user';
import { HomeService } from '../../services/home';
const user = {
  _id: '',
  auth: {
    email: '',
    phone: '',
    username: '',
  },
  firstName: '',
  lastName: '',
  middleName: '',
  gender: '',
  dob: '',
  avatar: '',
  cartLength: 0,

};
const initialState = {
  products: [],
  loggedIn: false,
  user,
  categories: []
};
export const getHome = createAsyncThunk('get home', () => {
  return ProductService.getProducts();
});
export const getMe = createAsyncThunk('Get me', async () => {
  const data = await UserService.getMe();
  return data;
});
export const getAllCategories = createAsyncThunk("Get all cateogires", ()=>{
  return HomeService.getCategories();
})

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setDefaultUser: (state) => {
      return {
        ...state,
        user: user,
      };
    },
    addCartItem: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          cartLength: state.user.cartLength + action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHome.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action)=>{
      state.categories = action.payload;
    })
  },
});

export const { setDefaultUser, setUser, addCartItem } = HomeSlice.actions;
export default HomeSlice.reducer;
