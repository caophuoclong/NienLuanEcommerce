import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
    lang: 'vi', // language vi or en
}

const SettingsSlice = createSlice({
    initialState,
    name: 'settings',
    reducers:{
        setDarkMode: (state, action) => {
            return{
                ...state,
                darkMode: action ? action.payload : !state.darkMode
            }
        },
        changeLang: (state, action) => {
            return {
                ...state,
                lang: action.payload,
                
            }
        },
    }
})
export const {setDarkMode, changeLang} = SettingsSlice.actions;
export default SettingsSlice.reducer;