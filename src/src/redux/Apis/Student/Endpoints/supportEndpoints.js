export const supportEndpoints={
    // Get All Threads
    getAllThreads:builder.query({
        query: () => ({
          url: `support/allthreads`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

    // Get Details About Single Threads
    getSingleThreads:builder.query({
        query: () => ({
          url: `support/${threadId}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

    // Post Reply to Single Threads
    replySingleThreads:builder.mutation({
        query: () => ({
          url: `${userId}/support/replay/${threadId}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

    // Get Ongoing Threads
    getOngoingThreads:builder.query({
        query: () => ({
          url: `support/ongoing/threads`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

    // Get Resolved Threads
    getResolvedThreads:builder.query({
        query: () => ({
          url: `support/resolved/threads`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),
}