import { baseApi } from "./baseApi";

export const flightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: (query) => {
        console.log(query);
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
    }),
  }),
});

export const { useGetFlightsQuery } = flightApi;
