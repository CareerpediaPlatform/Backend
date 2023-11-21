import React from "react";

export const CollegeLogin = React.lazy(() =>
  import("../../Pages/College/Authentication/Login/Login")
);
export const CollegeDashboard = React.lazy(() =>
  import("../../Pages/College/Account/Dashboard/Dashboard")
);
export const CollegeProfile = React.lazy(() =>
  import("../../Pages/College/Account/Profile/Profile")
);
export const CollegeEditProfile = React.lazy(() =>
  import("../../Pages/College/Account/EditProfile/EditProfile")
);
export const CollegeStudents = React.lazy(()=>
import ("../../Pages/College/Account/Students/Students")
)
export const CollegeStudentProfile = React.lazy(()=>
import ("../../Pages/College/Account/StudentDetails/StudentDetails")
)
export const CollegeJobs = React.lazy(()=>
import ("../../Pages/College/Account/Jobs/Jobs")
)
