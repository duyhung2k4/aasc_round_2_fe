import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { ContactModel } from "@/models/contact";
import { AddContactRequest } from "@/dto/request/contact";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        listContact: builder.query<QueryReturnType<ContactModel[]>, string>({
            query: (payload) => ({
                ...endPoint.contact.getAll(),
                params: {
                    auth: payload
                }
            })
        }),
        addContact: builder.query<QueryReturnType<ContactModel[]>, { contact: AddContactRequest, token: string }>({
            query: (payload) => ({
                ...endPoint.contact.add(),
                params: { auth: payload.token },
                data: payload.contact,
            })
        }),
    })
})

export const {
    useListContactQuery,
    useAddContactQuery,
} = contactApi;