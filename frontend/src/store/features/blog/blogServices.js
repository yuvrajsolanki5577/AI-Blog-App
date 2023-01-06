import axios from "axios";
import { setBlogs, setStatus, STATUSES } from "./blogSlice";

const URL = process.env.REACT_APP_BASE_URL;

//Thunk use for Fetching Blogs from backend Aschronusly !!

export function fetchBlogs(){

    return async function fetchBlogsThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await axios.get(`${URL}/post/posts`);
            dispatch(setBlogs(res.data));
            dispatch(setStatus(STATUSES.IDLE));

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}