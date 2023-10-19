import { baseApi } from "@/redux/api/baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServicesAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-services-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
    getBookingAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-bookings-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-users-analytics",
        credentials: "include" as const,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBookingAnalyticsQuery,
  useGetServicesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} = analyticsApi;
