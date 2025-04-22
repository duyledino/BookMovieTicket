import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    innerMovie:[]
}

const innerMovieSlice = createSlice({
    name: "innerMovie",
    initialState,
    reducers:{
        addAll: (state,action)=>{
            console.log(action.payload);
            const newMovies = action.payload.filter(movie=>!state.innerMovie.some(inner=>inner.film_id === movie.film_id));
            state.innerMovie = [...state.innerMovie,...newMovies];
        }
    }
})

export const{addAll} = innerMovieSlice.actions;
export default innerMovieSlice.reducer;