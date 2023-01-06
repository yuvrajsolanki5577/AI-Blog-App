import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR : 'error',
    LOADING : 'loading',
    SUCCESS : 'success'
});

const blogSlice = createSlice({
    
    name : 'blogs',
    
    initialState : {
        data : [],
        status : STATUSES.IDLE,
        message : ''
    },
    
    reducers : {
        setBlogs(state,action){
            state.data = action.payload;
        },
        setStatus(state,action){
            state.status = action.payload;
        },
        setMessage(state,action){
            state.message = action.payload;
        }
    }
});

export const { setBlogs , setStatus, setMessage} = blogSlice.actions;
export default blogSlice.reducer;