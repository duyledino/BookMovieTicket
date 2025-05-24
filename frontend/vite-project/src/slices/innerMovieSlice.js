import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    innerMovie:[]
}

const innerMovieSlice = createSlice({
    name: "innerMovie",
    initialState,
    reducers:{
        addAll: (state,action)=>{
            state.innerMovie = action.payload;
        },
        resetAll:(state)=>{
            state=initialState;
        }
    }
})

export const{addAll,resetAll} = innerMovieSlice.actions;
export default innerMovieSlice.reducer;