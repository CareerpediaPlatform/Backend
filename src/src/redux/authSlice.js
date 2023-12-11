import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  User: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// export const logout = createAsyncThunk('auth/logout', async () => {
//   await authService.logout()
// })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },

})

export const { reset } = authSlice.actions
export default authSlice.reducer
