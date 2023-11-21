export const LogicalEndpoints={
       // logicalreasoning
       // logicalreasoning Course Content
       lrCourseContent:builder.query({
        query: () => ({
          url: `${userId}/logicalreasoning/course-content`,
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

          // logicalreasoning Attachments 
          lrAttachments:builder.query({
            query: () => ({
              url: `${userId}/logicalreasoning/attachments`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // logicalreasoning Discussion 
          lrDiscussion:builder.query({
            query: () => ({
              url: `${userId}/logicalreasoning/discussion`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // logicalreasoning Upload Files 
          lrUploadFiles:builder.mutation({
            query: (formData) => ({
              url: `${userId}/logicalreasoning/upload-files`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{formData}
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // logicalreasoning Post Note 
          lrSendingNotes:builder.mutation({
            query: (notes) => ({
              url: `${userId}/logicalreasoning/note`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{notes}
            }),
            invalidatesTags: ['accounts'],
          }), 
}