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
      console.log(map);
      if (map !== undefined) {
        map.forEach((value) => {
          if (state.theater[value.Theater.theater_id])
            state.theater[value.Theater.theater_id].push({
              calendar_id: value.calendar_id,
              Theater: value.Theater,
              showtime: value.showtime,
              seat_Calendar: value.seat_Calendar,
            });
          else
            state.theater[value.Theater.theater_id] = [
              {
                calendar_id: value.calendar_id,
                Theater: value.Theater,
                showtime: value.showtime,
                seat_Calendar: value.seat_Calendar,
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
