import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_LOCAL_URL } from '../../utils/ConstantData'
import { getToken } from '../../utils/LocalStorage'

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_LOCAL_URL,
    prepareHeaders: (headers) => {
      let token: any = getToken()
      headers.set('Content-Type', 'application/json')
      headers.set('Authorization', "Bearer " + token)

      return headers
    },
  }),
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (payload) => ({
        url: `/posts/create-post`,
        method: 'POST',
        body: payload,
      }),
    }),

    allPost: builder.mutation({
      query: (payload) => ({
        url: `/posts/all-posts`,
        method: 'GET',
      }),
    }),

    viewPost: builder.mutation({
      query: (payload) => ({
        url: `/posts/view-post/${payload}`,
        method: 'GET',
      }),
    }),

    deletePost: builder.mutation({
      query: (payload) => ({
        url: '/posts/delete-post',
        method: 'POST',
        body: payload,
      }),
    }),

    updatePost: builder.mutation({
        query: (payload) => ({
          url: '/posts/update-post',
          method: 'POST',
          body: payload,
        }),
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddPostMutation,
  useAllPostMutation,
  useViewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = postApi
