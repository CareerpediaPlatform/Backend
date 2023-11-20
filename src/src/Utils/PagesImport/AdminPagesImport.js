import React from "react";

export const AdminLogin = React.lazy(() =>
  import("../../Pages/Admin/Authentication/Login/Login")
);
export const AdminDashboard = React.lazy(() =>
  import("../../Pages/Admin/Account/Dashboard/Dashboard")
);
export const StudentsList = React.lazy(() =>
  import("../../Pages/Admin/Account/Student/StudentsList/StudentsList")
);
export const SingleStudentDetails = React.lazy(() =>
  import(
    "../../Pages/Admin/Account/Student/SingleStudentDetails/SingleStudentDetails"
  )
);
export const CollegesList = React.lazy(() =>
  import("../../Pages/Admin/Account/College/CollegesList/CollegesList")
);
export const SingleCollegeDetails = React.lazy(() =>
  import(
    "../../Pages/Admin/Account/College/SingleCollegeDetails/SingleCollegeDetails"
  )
);
export const MentorsList = React.lazy(() =>
  import("../../Pages/Admin/Account/Mentor/MentorsList/MentorsList")
);
export const SingleMentorDetails = React.lazy(() =>
  import("../../Pages/Admin/Account/Mentor/SingleMentorDetails/SingleMentorDetails")
);
export const Courses = React.lazy(() =>
  import("../../Pages/Admin/Account/Courses/AllCourses/AllCourses")
);
export const JobsList = React.lazy(() =>
  import("../../Pages/Admin/Account/Jobs/JobsList/JobsList")
);
export const SingleJobDetails = React.lazy(() =>
  import("../../Pages/Admin/Account/Jobs/SingleJobDetails/SingleJobDetails")
);
export const Payments = React.lazy(() =>
  import("../../Pages/Admin/Account/Payment/Payment")
);
export const CoursePreview = React.lazy(() =>
  import("../../Pages/Admin/Account/Courses/Preview/Preview")
);
export const CourseDetails = React.lazy(()=>
import ("../../Pages/Admin/Account/Courses/CourseDetails/CourseDetails")
)

export const AddContent = React.lazy(()=>
import("../../Pages/Admin/Account/Courses/AddContent/AddContent")
)
export const AdminInterviews = React.lazy(()=>
import("../../Pages/Admin/Account/Interviews/Interviews")
)
export const AdminRecruiters =  React.lazy(()=>
import('../../Pages/Admin/Account/Recruiters/Recruiters')
)
export const SingleRecruiterDetails = React.lazy(()=>
import ("../../Pages/Admin/Account/Recruiters/SingleRecruiterDetails/SingleRecruiterDetails")
)