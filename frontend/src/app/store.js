import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice"
import postReducer from "../features/blog/blogSlice";


export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        auth: authReducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});