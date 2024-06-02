import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_LOCAL_URL } from '../../utils/ConstantData'
import { getToken } from '../../utils/LocalStorage'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_LOCAL_URL,
    prepareHeaders: (headers) => {
      let token: any = getToken()
      headers.set('Content-Type', 'application/json')
      headers.set('Authorization', token)

      return headers
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: `/auth/register`,
        method: 'POST',
        body: payload,
      }),
    }),

    resetOtp: builder.mutation({
      query: (payload) => ({
        url: `/auth/reset-otp`,
        method: 'POST',
        body: payload,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: `/auth/verify-otp`,
        method: 'POST',
        body: payload,
      }),
    }),

    login: builder.mutation({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignUpMutation,
  useResetOtpMutation,
  useVerifyOtpMutation,
} = userApi
