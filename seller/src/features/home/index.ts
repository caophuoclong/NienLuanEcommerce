import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../../service/api/auth";
import { itemId, RatingSubItemId, SalesSubItemId, selectedPage, subItemId } from '../../types/home';
import { IUser } from "../../types/user";
interface HomeSlice{
    showNavBar: boolean,
    page: itemId,
    subItem:{
        [key in itemId]?: subItemId
    },
    selectedPage: selectedPage,
    user: IUser,
    lang: "en" | "vi"
}
const initialState: HomeSlice = {
    showNavBar: true,
    page: itemId.HOME,
    subItem:{
        [itemId.SALES]: SalesSubItemId.PRODUCTS,
        [itemId.RATING]: RatingSubItemId.REVIEWS
    },
    selectedPage: "home",
    user: {} as IUser,
    lang: "vi"
}
export const getMe = createAsyncThunk("Get me", async ()=>{
    return (await AuthService.getMe()).data;
})
export const homeSlice = createSlice({
    name: "Home page",
    initialState,
    reducers:{
        toggleNavBar(state){
            return {
                ...state,
                showNavBar: !state.showNavBar
            }
        },
        changePage(state, action: PayloadAction<itemId>){
            return {
                ...state,
                page: action.payload,                
            }
        },
        changeSubItemPage(state, action: PayloadAction<{
            page: itemId,
            subItem: subItemId
        }>){
            console.log(action.payload);
            return {
                ...state,
                subItem: {
                    ...state.subItem,
                    [action.payload.page]: action.payload.subItem
                }
            }
                
        },
        changeSelectedPage(state, action: PayloadAction<selectedPage>){
        return {
            ...state,
            selectedPage: action.payload
        }
        },
        changeLanguage(state, action: PayloadAction<"en" | "vi">){
            return {
                ...state,
                lang: action.payload
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getMe.fulfilled, (state, action: PayloadAction<IUser>)=>{
            return {
                ...state,
                user: action.payload
            }
        })
    }
})

export const {toggleNavBar, changePage, changeSubItemPage, changeSelectedPage, changeLanguage} = homeSlice.actions;
export default homeSlice.reducer;