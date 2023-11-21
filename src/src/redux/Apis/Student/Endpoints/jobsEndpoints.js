export const jobsEndpoints={
        // Get All Threads
        getAllJobs:builder.query({
            query: () => ({
              url: `${userId}/jobs/alljobs`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

        // get Single Job Detail
        getSingleJob:builder.query({
            query: () => ({
              url: `${userId}/jobs/${jobId}`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

        // Apply for the job
        getSingleJob:builder.mutation({
            query: () => ({
              url: `${userId}/jobs/${jobId}/apply`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

        // List Of Applied Jobs
        getSingleJob:builder.query({
            query: () => ({
              url: `${userId}/jobs/Applied`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),


}