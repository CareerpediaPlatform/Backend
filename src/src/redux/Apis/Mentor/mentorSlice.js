import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {authEndpoints} from "./Endpoints/authEndpoints";

export const mentorApi = createApi({
  reducerPath: 'mentor',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3307/api/v1/mentor/' }),
  endpoints: (builder) => ({


    // getAccounts: builder.query({
    //   query: () => `accounts`,
    //   transformResponse:(response)=>response.sort((a,b)=>b.amount-a.amount),
    //   providesTags: ['accounts'],
    // }),

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
  // getAccounts,
  useLoginMentorMutation,

} = mentorApi;
