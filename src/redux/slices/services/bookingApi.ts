import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: `bookings/`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.booking],
    }),
    //!

    //!
    booking: build.query({
      query: () => {
        return {
          url: `bookings/my-bookings`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.booking],
    }),
    //!
    allBookings: build.query({
      query: () => {
        return {
          url: `bookings/`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.booking],
    }),
    //! get single
    singleBooking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `bookings/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.comment, tagTypes.review],
    }),
    //! delete student
    cancelBooking: build.mutation({
      query: () => ({
        url: `bookings/cancel-bookings`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    //!
    updateBooking: build.mutation({
      query: (data) => ({
        url: `bookings/update-booking/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useBookingQuery,
  useCancelBookingMutation,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useAllBookingsQuery,
  useSingleBookingQuery,
} = bookingsApi;
