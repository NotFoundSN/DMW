import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import variable from "../../const/const";

const baseURL = variable.api;

const userService = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/user`,
        prepareHeaders: (headers) => {
            const token = window.localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Modelos'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: "POST",
                    body: body,
                }
            },
            providesTags: ["user"]
        }),
        register: builder.mutation({
            query(body) {
                return {
                    url: "/",
                    method: 'POST',
                    body: body,
                };
            },
            providesTags: ["user"],
        }),
    }),
})

export default userService;