import authSlice from "./slice/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";
import { contactApi } from "./api/contact";


export const rootReducer = combineReducers({
    authSlice: authSlice.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
})