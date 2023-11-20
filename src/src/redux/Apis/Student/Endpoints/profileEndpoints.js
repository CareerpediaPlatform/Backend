export const profileEndpoints={

    // Post Profile-pic
    getSingleJob:builder.mutation({
        query: () => ({
          url: `${userId}/profile-pic`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

    // Update student details
    getSingleJob:builder.mutation({
        query: ({}) => ({
          url: `${userId}/details`,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
          body: {},
        }),
        invalidatesTags: ['accounts'],
      }),

    // Get student details
    getSingleJob:builder.query({
        query: () => ({
          url: `${userId}/details`,
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

}