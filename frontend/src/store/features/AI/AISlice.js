import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../blog/blogSlice";


const AISlice = createSlice({

    name : 'AI' ,

    initialState : {
        blog : "",
        status : STATUSES.IDLE
    },

    reducers : {

        setBlog(state,action){
            state.blog = action.payload;
        },

        setStatus(state,action){
            state.status = action.payload;
        }
    }
});

export const { setBlog, setStatus} = AISlice.actions;
export default AISlice.reducer;