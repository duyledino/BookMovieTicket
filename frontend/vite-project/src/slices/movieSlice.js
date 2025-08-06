import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    myMovies:[]
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        addMoviesInPage: (state,action)=>{
            const newMovies = action.payload.filter(movie=>!state.myMovies.some(m=>m.id === movie.id))
            state.myMovies = [...state.myMovies, ...newMovies];
        }
    }
})

export const {addMoviesInPage} = movieSlice.actions;
export default movieSlice.reducer;