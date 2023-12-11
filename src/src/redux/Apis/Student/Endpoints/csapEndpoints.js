export const csapEndpoints={
    // CSAP

    // csap get all cources list
    csapCourseList:builder.query({
     query: () => ({
       url: `${userId}/csap/listcourses`,
       headers: {
         Authorization: 'Bearer YOUR_AUTH_TOKEN',
       },
     }),
     invalidatesTags: ['accounts'],
   }),

    // csap get detail  About perticular Course
    csapCourseById:builder.query({
     query: (id) => ({
       url: `${userId}/csap/listcourses/${id}`,
       headers: {
         Authorization: 'Bearer YOUR_AUTH_TOKEN',
       },
     }),
     invalidatesTags: ['accounts'],
   }),
       // csap Course Content
       csapCourseContent:builder.query({
        query: () => ({
          url: `${userId}/csap/course-content`,
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),

          // csap Attachments 
          csapAttachments:builder.query({
            query: () => ({
              url: `${userId}/csap/attachments`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csap Discussion 
          csapDiscussion:builder.query({
            query: () => ({
              url: `${userId}/csap/discussion`,
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csap Upload Files 
          csapUploadFiles:builder.mutation({
            query: (formData) => ({
              url: `${userId}/csap/upload-files`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{formData}
            }),
            invalidatesTags: ['accounts'],
          }),

          
          // csap Post Note 
          csapSendingNotes:builder.mutation({
            query: (notes) => ({
              url: `${userId}/csap/note`,
              method: 'POST',
              headers: {
                Authorization: 'Bearer YOUR_AUTH_TOKEN',
              },
              body:{notes}
            }),
            invalidatesTags: ['accounts'],
          }),
}