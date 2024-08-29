import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { LoginResponse } from "@/dto/response/auth";
import { LoginRequest } from "@/dto/request/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<LoginResponse>, LoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                data: payload
            })
        })
    })
})

export const {
    useLoginMutation,
} = authApi;