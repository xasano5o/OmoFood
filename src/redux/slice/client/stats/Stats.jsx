import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const Stats = createApi({
    reducerPath: "getStats",
    baseQuery: api,
    tagTypes: ["getStats"],
    endpoints: (build) => ({
        getStats: build.query({
            query: (body) => "orders/general_statistics/",
            providesTags: ["getStats"],
        }),
      
    }),
});

export const {
    useGetStatsQuery,
 
} = Stats;
