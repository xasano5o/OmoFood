import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetUserToekn = createApi({
    reducerPath: "getUserTokenData",
    baseQuery: api,
    tagTypes: ["getToken"],
    endpoints: (build) => ({
        getUserToken: build.query({
            query: (body) => `users/get_token/`,
            providesTags: ["getToken"],
        }),
        tokenUser: build.mutation({
            query: (body) => ({
                url: `users/token/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["tokenUser"],
        }),
        tokenChecUser: build.mutation({
            query: (body) => ({
                url: `users/check_token/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["checkToken"],
        }),
    }),
});

export const {
    useTokenUserMutation,
    useTokenChecUserMutation,
    useGetUserTokenQuery,
} = GetUserToekn;
