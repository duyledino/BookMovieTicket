import {configureStore} from '@reduxjs/toolkit'
import pageReducer from '../slices/pageSlice.js'
import movieReducer from '../slices/movieSlice.js'
import MovieDetailReducer from '../slices/movieDetailSlice.js'
import innerMovieReducer from '../slices/innerMovieSlice.js'
import usersReducer from '../slices/usersSlice.js'
import userDetailReducer from '../slices/userDetail.js'
import calendarReducer from '../slices/calendarsSlice.js'

const store = configureStore({
    reducer:{
        pages: pageReducer,
        movies: movieReducer,
        movieDetail: MovieDetailReducer,
        innerMovies: innerMovieReducer,
        users: usersReducer,
        userDetail: userDetailReducer,
        calendars: calendarReducer
    }
})

export default store;