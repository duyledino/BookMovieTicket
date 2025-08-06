import { createSlice } from "@reduxjs/toolkit";
import { getFormatTime } from "../utils/getFormatDateNow";

const initialState = {
  theater: {},
};

const theaterSlice = createSlice({
  initialState,
  name: "theater",
  reducers: {
    setTheater: (state, action) => {
      state.theater={};
      const map = action.payload;
      if (map !== undefined) {
        map.forEach((value) => {
          if (state.theater[value.theater.theater_id])
            state.theater[value.theater.theater_id].push({
              calendar_id: value.calendar_id,
              theater: value.theater,
              showtime: value.showtime,
              seat_calendar: value.seat_Calendar,
            });
          else
            state.theater[value.theater.theater_id] = [
              {
                calendar_id: value.calendar_id,
                theater: value.theater,
                showtime: value.showtime,
                seat_calendar: value.seat_calendar,
              },
            ];
        });
      }
    },
    resetTheater: () => initialState,
  },
});

export const { setTheater, resetTheater } = theaterSlice.actions;
export default theaterSlice.reducer;
