import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetProducts = createApi({
    reducerPath: "getProductData",
    baseQuery: api,
    tagTypes: ["Product"],
    endpoints: (build) => ({
        getProduct: build.query({
            query: (body) => `products/`,
            providesTags: ["Product"],
        }),
        getProductCatgori: build.query({
            query: () => `products/?category=true`,
            providesTags: ["Product"],
        }),


        getProductId: build.query({
            query: (body) => ({
                url: `products/${body.ID}`,
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: build.mutation({
            query: (body) => ({
                url: `products/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        createProduct: build.mutation({
            query: (body) => ({
                url: `products/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: build.mutation({
            query: (body) => ({
                url: `products/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductIdQuery,
    useGetProductCatgoriQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = GetProducts;
