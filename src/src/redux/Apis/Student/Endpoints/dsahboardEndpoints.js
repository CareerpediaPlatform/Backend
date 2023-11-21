const Dashboard={
    // DASHBOARD
    // all-courses-progress
    allCourcesProgress:builder.query({
        query: () => ({
          url: 'all-courses-progress',
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        }),
        invalidatesTags: ['accounts'],
      }),
  
         // Employability Bar
         employabilityBar:builder.query({
          query: () => ({
            url: 'employability',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
         // All-Courses-Progress
         allCoursesProgress:builder.query({
          query: () => ({
            url: 'all-courses-progress',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
         // Current Playing Module
         currentPlayingModule:builder.query({
          query: () => ({
            url: 'current-playing-module',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
        
         // English & L.R. Graph
         englishlogicalGraphs:builder.query({
          query: () => ({
            url: 'english-logicalReasoning-graph',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
        
         // CSEP Module Progress Bar
         csepProgressBar:builder.query({
          query: () => ({
            url: 'csep-progress-bar',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
        
         // GET Batch Level
         batchLevel:builder.query({
          query: () => ({
            url: 'batch-level',
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN',
            },
          }),
          invalidatesTags: ['accounts'],
        }),
  
             // Batch Level Details
             batchLevelDetail:builder.query({
              query: () => ({
                url: 'batch-level-detail',
                headers: {
                  Authorization: 'Bearer YOUR_AUTH_TOKEN',
                },
              }),
              invalidatesTags: ['accounts'],
            }),
      
}