export const csepEndpoints={
    // csep
       // csep Course Content
       csepCourseContent:builder.query({
        query: () => ({
          url: `${userId}/csep/course-content`,
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

          // csep Attachments 
          csepAttachments:builder.query({
            query: () => ({
              url: `${userId}/csep/attachments`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csep Discussion 
          csepDiscussion:builder.query({
            query: () => ({
              url: `${userId}/csep/discussion`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csep Upload Files 
          csepUploadFiles:builder.mutation({
            query: (formData) => ({
              url: `${userId}/csep/upload-files`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{formData}
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csep Post Note 
          csepSendingNotes:builder.mutation({
            query: (notes) => ({
              url: `${userId}/csep/note`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{notes}
            }),
            invalidatesTags: ['accounts'],
          }),
}