import { baseApi } from "./baseApi";

export const flightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFlight: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/flights",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Flight"],
    }),

    getFlights: builder.query({
      query: (query) => {
        return {
          url: "/flights/search",
          method: "GET",
          params: {
            destination: query.destination,
            origin: query.origin,
            date: query.date,
          },
        };
      },
      providesTags: ["Flight"],
    }),

    getFlightById: builder.query({
      query: (id) => {
        return {
          url: `/flights/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Flight"],
    }),

    deleteFlight: builder.mutation({
      query: ({ id, token }) => ({
        url: `/flights/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Flight"],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useCreateFlightMutation,
  useDeleteFlightMutation,
  useGetFlightByIdQuery,
} = flightApi;
