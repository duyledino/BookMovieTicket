import { createSlice } from "@reduxjs/toolkit";
import {
  fixFormatDateRespone,
  getDateRespone,
} from "../utils/getFormatDateNow";

const initialState = {
  seat_Calendar: {},
  specificCalendars: [],
};

const seatCalendarSlice = createSlice({
  name: "seat_Calendar",
  initialState,
  reducers: {
    setSeatCalendar: (state, action) => {
      state.seat_Calendar = {};
      const allCalendar = action.payload; // support nested arrays
      allCalendar.forEach((t) => {
        const key = t.calendar_id;

        if (state.seat_Calendar[key]) {
          state.seat_Calendar[key].push(t);
        } else {
          state.seat_Calendar[key] = [t];
        }
      });
    },
    setCalendarDetail: (state, action) => {
      const allCalendar = action.payload;
      const temp = []
      allCalendar.forEach((t) => {
        const objectCalendar = {};
        const key = getDateRespone(t.showtime)[0];
        if (
          !state.specificCalendars.find(
            (item, index) => item.calendar_id === t.calendar_id
          )
        ) {
          objectCalendar[key] = getDateRespone(t.showtime)[1];
          objectCalendar["calendar_id"] = t.calendar_id;
          state.specificCalendars.push(objectCalendar);
          temp.push(objectCalendar);
        }
      });
    },
    resetSeatCalendar: () => initialState,
  },
});

export const { setSeatCalendar, resetSeatCalendar, setCalendarDetail } =
  seatCalendarSlice.actions;
export default seatCalendarSlice.reducer;
