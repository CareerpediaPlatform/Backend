import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import progressSlice from './editProgressBar'
import lmsSlice from './lmsSlice'
// import goalReducer from '../features/goals/goalSlice'
import { studentApi } from './Apis/Student/studentSlice'
import { mentorApi } from './Apis/Mentor/mentorSlice'
import { collegeApi } from './Apis/College/collegeSlice'
import { adminApi } from './Apis/Admin/Admin'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    progBar:progressSlice,
    lmsContent:lmsSlice,
    [studentApi.reducerPath]:studentApi.reducer,
    [mentorApi.reducerPath]:mentorApi.reducer,
    [collegeApi.reducerPath]:collegeApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
  .concat(studentApi.middleware)
  .concat(mentorApi.middleware)
  .concat(collegeApi.middleware)
  .concat(adminApi.middleware)
})
