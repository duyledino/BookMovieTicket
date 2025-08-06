import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingToStore: (state, action) => {
      console.log(action.payload);
      state.booking = action.payload;
    },
  },
});

export const {setBookingToStore} = bookingSlice.actions;
export default bookingSlice.reducer;