import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: `/ategory/create-category`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.category],
    }),
    //!
    singleCategory: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    //!
    categories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `category`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          categories: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),
    //!
    updateCategory: build.mutation({
      query: (data) => ({
        url: `category/update-category/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    //!
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useSingleCategoryQuery,
} = categoryApi;
