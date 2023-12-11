import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authService from './authService'

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  personalDetails: 0,
  educationDetails: 0,
  contactDetails: 0,
  experienceDetails: 0,
  // college admin
  basicDetails:0,
  collegeDetails:0
}

export const progressSlice = createSlice({
  name: 'progressData',
  initialState,
  reducers: {
    personalProgress: (state, action) => {
        state.personalDetails = action.payload;
      },
    educationProgress: (state, action) => {
        state.educationDetails = action.payload;
      },
    contactProgress: (state, action) => {
        state.contactDetails = action.payload;
      },
    experienceProgress: (state, action) => {
        state.experienceDetails = action.payload;
      },
      // college
      basicDetailsProgress: (state, action) => {
        state.basicDetails = action.payload;
      },
      collegeDetailsProgress: (state, action) => {
        state.collegeDetails = action.payload;
      },
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },

})

export const { reset,personalProgress,educationProgress ,contactProgress,experienceProgress,
  basicDetailsProgress,collegeDetailsProgress} = progressSlice.actions
export default progressSlice.reducer
