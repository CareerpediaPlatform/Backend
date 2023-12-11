export const authEndpoints = (builder) => (
    {

    // login
    loginMentor: builder.mutation({
        query: ({email,password}) => ({
          url: 'auth/form-login',
          method: 'POST',
          body: {email,password},
        }),
        invalidatesTags: ['accounts'],
      }),
  

    }
    )