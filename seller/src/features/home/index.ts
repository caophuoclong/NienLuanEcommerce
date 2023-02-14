import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { itemId, RatingSubItemId, SalesSubItemId, selectedPage, subItemId } from '../../types/home';
interface HomeSlice{
    showNavBar: boolean,
    page: itemId,
    subItem:{
        [key in itemId]?: subItemId
    },
    selectedPage: selectedPage,
}
const initialState: HomeSlice = {
    showNavBar: true,
    page: itemId.HOME,
    subItem:{
        [itemId.SALES]: SalesSubItemId.PRODUCTS,
        [itemId.RATING]: RatingSubItemId.REVIEWS
    },
    selectedPage: "home"
}

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
    }
    }
})

export const {toggleNavBar, changePage, changeSubItemPage, changeSelectedPage} = homeSlice.actions;
export default homeSlice.reducer;