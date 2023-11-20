import React from "react";

export const SignUp = React.lazy(() =>
  import("../../Pages/Student/Authentication/SignUp/SignUp")
);
export const SignIn = React.lazy(() =>
  import("../../Pages/Student/Authentication/SignIn/SignIn")
);
export const ForgetPassword = React.lazy(() =>
  import("../../Pages/Student/Authentication/ForgetPassword/ForgetPassword")
);
export const Otp = React.lazy(() =>
  import("../../Pages/Student/Authentication/Otp/Otp")
);
export const ChangePassword = React.lazy(() =>
  import("../../Pages/Student/Authentication/ChangePassword/ChangePassword")
);
export const PhoneNumber = React.lazy(() =>
  import("../../Pages/Student/Authentication/PhoneNumber/PhoneNumber")
);
export const StudentProfile = React.lazy(() =>
  import("../../Pages/Student/Account/Profile/Profile")
);
export const StudentEditProfile = React.lazy(() =>
  import("../../Pages/Student/Account/EditProfile/EditProfile")
);
export const StudentDashboard = React.lazy(() =>
  import("../../Pages/Student/Account/Dashboard/Dashboard")
);
export const BasicCourse = React.lazy(() =>
  import("../../Pages/Student/Account/BasicCourse/BasicCourse")
);
export const Csap = React.lazy(() =>
  import("../../Pages/Student/Account/Csap/Csap")
);
export const Csep = React.lazy(() =>
  import("../../Pages/Student/Account/Csep/Csep")
);
export const Job = React.lazy(() =>
  import("../../Pages/Student/Account/Job/Job")
);
export const Support = React.lazy(() =>
  import("../../Pages/Student/Account/Support/Support")
);
export const Refer = React.lazy(() =>
  import("../../Pages/Student/Account/Refer/Refer")
);
export const Exercise = React.lazy(() =>
  import(
    "../../Pages/Student/Account/Lms/CoursePlayer/Components/CourseContent/Components/Exercise/Components/Exam/Exam"
  )
);
export const Interview = React.lazy(() =>
  import(
    "../../Pages/Student/Account/Interview/Interview"
  )
);
export const BookSlot = React.lazy(() =>
  import(
    "../../Pages/Student/Account/BookSlot/BookSlot"
  )
);
export const CoursePlayer=React.lazy(() =>
import(
  "../../Pages/Student/Account/Lms/CoursePlayer/CoursePlayer"
)
);
export const CoursePreviews=React.lazy(() =>
import("../../Pages/Student/Account/Lms/CoursePreviews/CoursePreviews")
);
export const SingleJobDetail=React.lazy(() =>
import("../../Pages/Student/Account/Job/Components/SingleJobDetails/SingleJobDetail")
);
export const AppliedJobs=React.lazy(() =>
import("../../Pages/Student/Account/Job/Components/AppliedJobs/AppliedJobs")
);