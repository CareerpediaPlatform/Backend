import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {authEndpoints} from './Endpoints/authEndpoints'

export const studentApi = createApi({
  reducerPath: 'student',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3307/api/v1/student/' }),
  endpoints: (builder) => ({
    // 
    updateAccount: builder.mutation({
      query: ({id, amount}) => ({
        url: `accounts/${id}`,
        method: 'PATCH',
        body: {amount},
      }),
      // invalidatesTags: ['accounts'],
    }),
    ...authEndpoints(builder),
  }),
});

export const {
  // useGetAccountsQuery,
  // Export other hooks from authEndpoints if needed.
  useRegesterStudentMutation,
  useLoginStudentMutation,
  useAuthOtpMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
} = studentApi;
