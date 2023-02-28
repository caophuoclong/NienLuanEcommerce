import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthService } from "../../service/api/auth"
import {
  itemId,
  RatingSubItemId,
  SalesSubItemId,
  selectedPage,
  subItemId,
} from "../../types/home"
import { IUser } from "../../types/user"
interface HomeSlice {
  showNavBar: boolean
  page: itemId
  subItem: {
    [key in itemId]?: subItemId
  }
  selectedPage: selectedPage
  user: IUser
  lang: "en" | "vi"
  sort: Record<
    "name" | "category" | "sold" | "price" | "stock" | "created" | "updated",
    "down" | "up"
  >
}
const initialState: HomeSlice = {
  showNavBar: true,
  page: itemId.HOME,
  subItem: {
    [itemId.SALES]: SalesSubItemId.PRODUCTS,
    [itemId.RATING]: RatingSubItemId.REVIEWS,
  },
  selectedPage: "home",
  user: {} as IUser,
  lang: "vi",
  sort: {
    name: "up",
    category: "up",
    price: "up",
    sold: "up",
    stock: "up",
    created: "down",
    updated: "down",
  },
}
export const getMe = createAsyncThunk("Get me", async () => {
  return (await AuthService.getMe()).data
})
export const homeSlice = createSlice({
  name: "Home page",
  initialState,
  reducers: {
    toggleNavBar(state: typeof initialState) {
      return {
        ...state,
        showNavBar: !state.showNavBar,
      }
    },
    changePage(state: typeof initialState, action: PayloadAction<itemId>) {
      return {
        ...state,
        page: action.payload,
      }
    },
    changeSubItemPage(
      state,
      action: PayloadAction<{
        page: itemId
        subItem: subItemId
      }>
    ) {
      console.log(action.payload)
      return {
        ...state,
        subItem: {
          ...state.subItem,
          [action.payload.page]: action.payload.subItem,
        },
      }
    },
    changeSelectedPage(
      state: typeof initialState,
      action: PayloadAction<selectedPage>
    ) {
      return {
        ...state,
        selectedPage: action.payload,
      }
    },
    changeLanguage(
      state: typeof initialState,
      action: PayloadAction<"en" | "vi">
    ) {
      return {
        ...state,
        lang: action.payload,
      }
    },
    toggleSortCategory(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          category: state.sort.category === "up" ? "down" : "up",
        },
      }
    },
    toggleSortPrice(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          price: state.sort.price === "up" ? "down" : "up",
        },
      }
    },
    toggleSortSold(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          sold: state.sort.sold === "up" ? "down" : "up",
        },
      }
    },
    toggleSortStock(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          stock: state.sort.stock === "up" ? "down" : "up",
        },
      }
    },
    toggleSortName(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          name: state.sort.name === "up" ? "down" : "up",
        },
      }
    },
    toggleSortCrated(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          name: "up",
          category: "up",
          price: "up",
          sold: "up",
          stock: "up",
          created: state.sort.created === "up" ? "down" : "up",
        },
      }
    },
    toggleSortUpdated(state: typeof initialState) {
      return {
        ...state,
        sort: {
          ...state.sort,
          name: "up",
          category: "up",
          price: "up",
          sold: "up",
          stock: "up",
          updated: state.sort.updated === "up" ? "down" : "up",
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMe.fulfilled,
      (state: typeof initialState, action: PayloadAction<IUser>) => {
        return {
          ...state,
          user: action.payload,
        }
      }
    )
  },
})

export const {
  toggleNavBar,
  changePage,
  changeSubItemPage,
  changeSelectedPage,
  changeLanguage,
  toggleSortCategory,
  toggleSortName,
  toggleSortPrice,
  toggleSortSold,
  toggleSortStock,
  toggleSortCrated,
  toggleSortUpdated,
} = homeSlice.actions
export default homeSlice.reducer
