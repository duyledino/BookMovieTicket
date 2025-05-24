import { createSlice } from "@reduxjs/toolkit";
import {
  fixFormatDateRespone,
  getDateRespone,
} from "../utils/getFormatDateNow";

const initialState = {
  seat_Calendar: {},
  specificCalendars:{}
};

const seatCalendarSlice = createSlice({
  name: "seat_Calendar",
  initialState,
  reducers: {
    setSeatCalendar: (state, action) => {
      state.seat_Calendar = {};
      const allCalendar = action.payload; // support nested arrays
      console.log(allCalendar);
      allCalendar.forEach((t) => {
        const key = getDateRespone(t.showtime)[0];

        if (state.seat_Calendar[key]) {
          state.seat_Calendar[key].push(t);
        } else {
          state.seat_Calendar[key] = [t];
        }
      });
    },
    setCalendarDetail: (state, action) => {
      state.specificCalendars = {};
      const allCalendar = action.payload; 
      console.log(allCalendar);
      allCalendar.forEach((t) => {
        const key = getDateRespone(t.showtime)[0];

        if (!state.specificCalendars[key]) {
          state.specificCalendars[key] = getDateRespone(t.showtime)[1];
        }
      });
    },
    resetSeatCalendar: () => initialState,
  },
});

export const { setSeatCalendar, resetSeatCalendar,setCalendarDetail } = seatCalendarSlice.actions;
export default seatCalendarSlice.reducer;
