import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    toasts:[]
}

const toastSlice = createSlice({
    name:"toasts",
    initialState,
    reducers:{
        addToast:(state,action)=>{
            const temp = action.payload;
            state.toasts.push({id:Date.now(),message:temp.message,type:temp.type});
        },
        removeToast:(state,action)=>{
            state.toasts = state.toasts.filter((s)=>(s.id!==action.payload))
        }
    }
})

export const {addToast,removeToast} = toastSlice.actions;
export default toastSlice.reducer;