import { configureStore } from '@reduxjs/toolkit';
import homeSliceReducer from "./slices/home.slice";
export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
  },
});
