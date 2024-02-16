import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const User = createApi({
    reducerPath: "getUser",
    baseQuery: api,
    tagTypes: ["User"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (body) =>
                "users/change_all_status/",
            method: "GET",
            providesTags: ["User"],
        }),

        createUser: build.mutation({
            query: (body) => ({
                url: `users/${body?.id}/change_status/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        deleteUser: build.mutation({
            query: (body) => ({
                url: `users/auto_delete_user/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useDeleteUserMutation

} = User;
