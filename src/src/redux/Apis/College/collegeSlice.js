import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const collegeApi = createApi({
  reducerPath: 'college',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/photos' }),
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => ``,
      transformResponse:(response)=>response.sort((a,b)=>b.amount-a.amount),
      providesTags: ['accounts'],
    }),
   
  }),
});

export const {
  getAccounts
} = collegeApi;
