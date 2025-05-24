import { createSlice } from "@reduxjs/toolkit";

const initialState={
    globalChange: false
}

const globalVariableSlice = createSlice({
    name:"globalChange",
    initialState,
    reducers:{
        setChange:(state)=>{
            state.globalChange = !state.globalChange
        }
    }
});

export const {setChange} = globalVariableSlice.actions
export default globalVariableSlice.reducer;