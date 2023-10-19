import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: `layouts/create-blog`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.blog],
    }),
    //!
    overView: build.mutation({
      query: (data) => ({
        url: `servey`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.servey],
    }),
    //!
    singleBlog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `layouts/blog/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    //!
    blogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `layouts/blog`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    overviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `servey/`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.servey],
    }),
    //!
    updateBlog: build.mutation({
      query: (data) => ({
        url: `layouts/update-blog/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    //!
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `layouts/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    //!
    createFaq: build.mutation({
      query: (data) => ({
        url: `layouts/create-faq`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.faq],
    }),
    //!
    faqs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `layouts/faq`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useSingleBlogQuery,
  useUpdateBlogMutation,
  useCreateFaqMutation,
  useFaqsQuery,
  useOverViewMutation,
  useOverviewsQuery,
} = blogApi;
