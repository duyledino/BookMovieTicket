import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    favourites : []
}

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers:{
        storeFavourite: (state,action)=>{
            state.favourites = action.payload;
        },
        clearFavourite:(state,action)=>{
            state.favourites = [];
        }
    }
})

export const {storeFavourite,clearFavourite} = favouriteSlice.actions;
export default favouriteSlice.reducer;