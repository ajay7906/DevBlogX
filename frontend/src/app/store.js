import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});