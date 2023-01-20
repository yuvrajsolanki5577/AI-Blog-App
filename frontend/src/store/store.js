import { configureStore } from "@reduxjs/toolkit";
import AIReducer from "./features/AI/AISlice";
import authReducer from "./features/auth/authSlice";
import blogReducer from "./features/blog/blogSlice";

const store = configureStore({
    reducer : {
        blog : blogReducer,
        auth : authReducer,
        AI : AIReducer
    },
});

export default store;
