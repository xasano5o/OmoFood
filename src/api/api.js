import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiUrl = "http://omo-food.mahmudhx.beget.tech/api/v1/";
export const baseUrl = apiUrl;

const token = localStorage.getItem("user");

axios.defaults.baseURL = baseUrl;



export const api = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
