import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data) => ({
        url: `services/create-service`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.service],
    }),
    //!
    addToCart: build.mutation({
      query: (data) => ({
        url: `services/addToCart`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.cart],
    }),
    //!
    getMyCart: build.query({
      query: () => {
        return {
          url: `services/cart`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.cart],
    }),
    //!
    singleService: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.comment, tagTypes.review],
    }),
    //!
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `services`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    //!
    updateService: build.mutation({
      query: (data) => ({
        url: `services/update-service/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    //!
    deleteService: build.mutation({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
    addComment: build.mutation({
      query: (data) => ({
        url: `services/${data.id}/add-comment`,
        method: "PUT",
        data: data,
      }),

      invalidatesTags: [tagTypes.comment],
    }),
    addReview: build.mutation({
      query: (data) => ({
        url: `services/${data.id}/add-review`,
        method: "PUT",
        data: data,
      }),

      invalidatesTags: [tagTypes.review],
    }),
    //!
    removeFromCart: build.mutation({
      query: (id) => ({
        url: `services/${id}/cart`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useServicesQuery,
  useSingleServiceQuery,
  useUpdateServiceMutation,
  useAddToCartMutation,
  useAddCommentMutation,
  useAddReviewMutation,
  useGetMyCartQuery,
  useRemoveFromCartMutation,
} = serviceApi;
