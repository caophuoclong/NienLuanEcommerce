import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductService } from '../../services/';
import { UserService } from '../../services/user';
const user = {
    _id: "",
    auth: {
      email: "",
      phone: "",
      username: ""
    },
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dob: "",
    avatar: ""
  }
const initialState = {
  products: [],
  loggedIn: false,
  user
};
export const getHome = createAsyncThunk('get home', () => {
  return ProductService.getProducts();
});
export const getMe = createAsyncThunk("Get me", async ()=>{
  const data = await UserService.getMe()
  return data;
})

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setUser: (state, action)=>{
      return {
        ...state,
        user: action.payload
      }
    },
    setDefaultUser: (state)=>{
      return{
        ...state,
        user: user
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHome.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getMe.fulfilled, (state, action)=>{
      state.user = action.payload;
    })
  },
});

export const { setDefaultUser, setUser } = HomeSlice.actions;
export default HomeSlice.reducer;
