import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    detail: {}
}

const movieDetailSlice = createSlice({
    name: "detail",
    initialState,
    reducers:{
        addDetail: (state,action)=>{
            state.detail = action.payload;
        },
        resetDetail: ()=>initialState
    }
})

export const {addDetail,resetDetail} = movieDetailSlice.actions;
export default movieDetailSlice.reducer;