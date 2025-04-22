import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    page: 1
}

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers:{
        addPage: (state)=>{
            state.page = state.page + 1;
        }
    }
})

export const {addPage} = pageSlice.actions;
export default pageSlice.reducer;