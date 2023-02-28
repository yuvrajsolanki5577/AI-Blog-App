import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../blog/blogSlice";


const AISlice = createSlice({

    name : 'AI' ,

    initialState : {
        title : "",
        blog : "",
        status : STATUSES.IDLE
    },

    reducers : {

        setTitle(state,action){
            state.title = action.payload;
        },

        setBlog(state,action){
            state.blog = action.payload;
        },

        setStatus(state,action){
            state.status = action.payload;
        },

        resetBlog(state,action){
            state.title = ""
            state.blog = ""
            state.status = STATUSES.IDLE
        }
        
    }
});

export const { setTitle, setBlog, setStatus, resetBlog} = AISlice.actions;
export default AISlice.reducer;