import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
}

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {};
            console.log(action.payload);
            state.user = action.payload;

        },
        resetUser: ()=>initialState
    },
});

export const {setUser,resetUser} = userDetailSlice.actions;
export default userDetailSlice.reducer;
