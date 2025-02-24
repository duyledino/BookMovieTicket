import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from './favouriteSlice.js'

export const store = configureStore({
    reducer:{
        favourites: favouriteReducer
    }
})