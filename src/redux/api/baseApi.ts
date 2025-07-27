import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://flight-server-six.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["Flight"],
});
