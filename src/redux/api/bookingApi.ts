import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/bookings",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
