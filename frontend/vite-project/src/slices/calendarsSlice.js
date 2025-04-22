import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    calendars:{},
}

const calendarSlice = createSlice({
    name:"calendars",
    initialState,
    reducers:{
        setCalendars:(state,action)=>{
            state.calendars = action.payload;
        }
    }
})

export const {setCalendars} = calendarSlice.actions
export default calendarSlice.reducer;
