import React from "react";

export const MentorLogin = React.lazy(() =>
  import("../../Pages/Mentor/Authentication/Login/Login")
);
export const MentorDashboard = React.lazy(() =>
  import("../../Pages/Mentor/Account/Dashboard/Dashboard")
);
export const MentorProfile = React.lazy(() =>
  import("../../Pages/Mentor/Account/Profile/Profile")
);
export const MentorEditProfile = React.lazy(() =>
  import("../../Pages/Mentor/Account/EditProfile/EditProfile")
);
export const  Interviews = React.lazy(()=>
import("../../Pages/Mentor/Account/Interviews/Interviews")
);
export const  Course = React.lazy(()=>
import("../../Pages/Mentor/Account/Course/Course")
);
export const Discussions = React.lazy(()=>
 import("../../Pages/Mentor/Account/Discussions/Discussions")
);

