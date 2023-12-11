export const authEndpoints = (builder) => (
  {
    registerStudent: builder.mutation({
      query: ({email,firstName,lastName,password,phoneNumber,role}) => ({
        url: 'auth/form-signup',
        method: 'POST',
        body: {email,firstName,lastName,password,phoneNumber,role}
      }),
      // invalidatesTags: ['accounts'],
    }),

    // login
    loginStudent: builder.mutation({
      query: ({email,password}) => ({
        url: 'auth/form-signin',
        method: 'POST',
        body: {email,password},
      }),
      invalidatesTags: ['accounts'],
    }),

    // otp
    authOtp: builder.mutation({
      query: (otp) => ({
        url: 'otp',
        method: 'POST',
        body: {otp},
      }),
      invalidatesTags: ['accounts'],
    }),

    // change password
    changePassword:builder.mutation({
      query: (email,password) => ({
        url: 'forget/password',
        method: 'POST',
        body: {email,password},
      }),
      invalidatesTags: ['accounts'],
    }),

    // forget password
    forgetPassword:builder.mutation({
      query: (email) => ({
        url: 'forget/password',
        method: 'POST',
        body: {email},
      }),
      invalidatesTags: ['accounts'],
    }),
  }
)