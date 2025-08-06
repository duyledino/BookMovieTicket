import {configureStore} from '@reduxjs/toolkit'
import pageReducer from '../slices/pageSlice.js'
import movieReducer from '../slices/movieSlice.js'
import MovieDetailReducer from '../slices/movieDetailSlice.js'
import innerMovieReducer from '../slices/innerMovieSlice.js'
import usersReducer from '../slices/usersSlice.js'
import userDetailReducer from '../slices/userDetail.js'
import calendarReducer from '../slices/calendarsSlice.js'
import toastReducer from '../slices/toastSlice.js'
import globalVariableReducer from '../slices/globalVariableSlice.js'
import popCornReducer from '../slices/popcornSlice.js';
import seatCalendarReducer  from '../slices/seatCalendarSlice.js'
import theaterCalendarReducer from '../slices/theaterSlice.js'
import bookingReducer from '../slices/bookingSlice.js'

const store = configureStore({
    reducer:{
        theater: theaterCalendarReducer,
        seatCalendar: seatCalendarReducer,
        pages: pageReducer,
        movies: movieReducer,
        movieDetail: MovieDetailReducer,
        innerMovies: innerMovieReducer,
        users: usersReducer,
        userDetail: userDetailReducer,
        calendars: calendarReducer,
        toasts: toastReducer,
        globalVariable: globalVariableReducer,
        popCorn: popCornReducer,
        booking: bookingReducer
    }
})

export default store;