export const englishEndpoints={
    // ENGLISH
       // English Course Content
       englishCourseContent:builder.query({
        query: () => ({
          url: `${userId}/english/course-content`,
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

          // English Attachments 
          englishAttachments:builder.query({
            query: () => ({
              url: `${userId}/english/attachments`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // English Discussion 
          englishDiscussion:builder.query({
            query: () => ({
              url: `${userId}/english/discussion`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // English Upload Files 
          englishUploadFiles:builder.mutation({
            query: (formData) => ({
              url: `${userId}/english/upload-files`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{formData}
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // English Post Note 
          englishSendingNotes:builder.mutation({
            query: (notes) => ({
              url: `${userId}/english/note`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{notes}
            }),
            invalidatesTags: ['accounts'],
          }),
}