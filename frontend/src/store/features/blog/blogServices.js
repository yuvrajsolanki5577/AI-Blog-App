import axios from "axios";
import { setBlogs, setStatus, STATUSES } from "./blogSlice";

//Thunk use for Fetching Blogs from backend Aschronusly !!

export function fetchBlogs(){

    return async function fetchBlogsThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.get(`/post/posts`);
            dispatch(setBlogs(res.data));
            dispatch(setStatus(STATUSES.IDLE));

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}