import React from "react";

export const RecruiterLogin = React.lazy(() =>
  import("../../Pages/Recruiter/Authentication/Login/Login")
);
export const RecruiterDashboard = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Dashboard/Dashboard")
);
export const RecruiterCandidates = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Candidates/Candidates")
);
export const RecruiterJobs = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Jobs/Jobs")
);
export const RecruiterProfile = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Profile/Profile")
);
export const RecruiterStudentProfile = React.lazy(() =>
  import("../../Pages/Recruiter/Account/StudentDetails/StudentDetails")
);
export const RecruiterEditProfile = React.lazy(() =>
  import("../../Pages/Recruiter/Account/EditProfile/EditProfile")
);
export const CreateJob = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Jobs/ActiveJobs/Components/CreateJob/CreateJob")
);
export const EditJob = React.lazy(() =>
  import("../../Pages/Recruiter/Account/Jobs/ActiveJobs/Components/EditJob/EditJob")
);