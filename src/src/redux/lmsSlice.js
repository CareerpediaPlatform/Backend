import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  allCourses:null,
  myCourses:null,
  playingVideo: null,
  courseContent: null,
  Attachments:null,
  Discussion:null
}


export const lmsSlice = createSlice({
  name: 'lms',
  initialState,
  reducers: {
    disscussion: (state, action) => {
      state.Discussion = action.payload;
    },
    reset: (state) => {
      state.allCourses = null
      state.myCourses = null
      state.playingVideo = null
      state.courseContent = null
      state.Attachments = null
      state.Discussion = null
    }
  },

})

export const { reset,disscussion} = lmsSlice.actions
export default lmsSlice.reducer
