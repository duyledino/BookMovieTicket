import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    popCorns:[]
}

const popCornSlice = createSlice({
    name:"popCorns",
    initialState,
    reducers:{
        setPopCorn: (state,action)=>{
            state.popCorns = [];
            state.popCorns = action.payload;
        }
    }
});

export default popCornSlice.reducer;
export const {setPopCorn} = popCornSlice.actions