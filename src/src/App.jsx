import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Utils
import ScrollToTop from "./Utils/ScrollToTop";

//Pages
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

//Admin Pages
import {
  AdminLogin,
  AdminDashboard,
  StudentsList,
  SingleStudentDetails,
  CollegesList,
  SingleCollegeDetails,
  MentorsList,
  SingleMentorDetails,
  Courses,
  CourseDetails,
  AddContent,
  JobsList,
  SingleJobDetails,
  Payments,
  CoursePreview,
  AdminInterviews,
  AdminRecruiters,
  SingleRecruiterDetails,
} from "./Utils/PagesImport/AdminPagesImport";
const adminRoutesData = [
  {
    path: "login",
    element: <AdminLogin />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "students",
    element: <StudentsList />,
  },
  {
    path: "student/:id",
    element: <SingleStudentDetails />,
  },
  {
    path: "colleges",
    element: <CollegesList />,
  },
  {
    path: "college/:id",
    element: <SingleCollegeDetails />,
  },
  {
    path: "mentors",
    element: <MentorsList />,
  },
  {
    path: "mentor/:id",
    element: <SingleMentorDetails />,
  },
  {
    path: "courses",
    element: <Courses />,
  },
  {
    path: "add-content",
    element: <AddContent />,
  },
  {
    path: "course-details",
    element: <CourseDetails />,
  },
  {
    path: "jobs",
    element: <JobsList />,
  },
  {
    path: "job/:id",
    element: <SingleJobDetails />,
  },
  {
    path: "payments",
    element: <Payments />,
  },
  {
    path: "preview",
    element: <CoursePreview />,
  },
  {
    path: "interviews",
    element: <AdminInterviews />,
  },
  {
    path: "recruiters",
    element: <AdminRecruiters />,
  },
  {
    path: "recruiter/:id",
    element: <SingleRecruiterDetails />,
  },
];

//Student Pages
import {
  SignUp,
  SignIn,
  ForgetPassword,
  Otp,
  ChangePassword,
  PhoneNumber,
  StudentProfile,
  StudentEditProfile,
  StudentDashboard,
  BasicCourse,
  Csap,
  Csep,
  Job,
  Support,
  Refer,
  Exercise,
  Interview,
  BookSlot,
  CoursePlayer,
  CoursePreviews,
  SingleJobDetail,
  AppliedJobs,
} from "./Utils/PagesImport/StudentPagesImport";
const studentRoutesData = [
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "change-password",
    element: <Otp />,
  },
  {
    path: "otp",
    element: <ChangePassword />,
  },
  {
    path: "phone-number",
    element: <PhoneNumber />,
  },
  {
    path: "profile",
    element: <StudentProfile />,
  },
  {
    path: "edit-profile",
    element: <StudentEditProfile />,
  },
  {
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "basic-course",
    element: <BasicCourse />,
  },
  {
    path: "csap",
    element: <Csap />,
  },
  {
    path: "csep",
    element: <Csep />,
  },
  {
    path: "job",
    element: <Job />,
  },
  {
    path: "job/:id",
    element: <SingleJobDetail />,
  },
  {
    path: "support",
    element: <Support />,
  },
  {
    path: "refer",
    element: <Refer />,
  },
  {
    path: "exercise",
    element: <Exercise />,
  },
  {
    path: "interview",
    element: <Interview />,
  },
  {
    path: "book-slot",
    element: <BookSlot />,
  },
  {
    path: ":course/course-content/:courseID",
    element: <CoursePlayer />,
  },
  {
    path: ":course/preview/:courseID",
    element: <CoursePreviews />,
  },
  {
    path: "applied-jobs",
    element: <AppliedJobs />,
  },
];

//Mentor Pages
import {
  MentorLogin,
  MentorDashboard,
  MentorProfile,
  MentorEditProfile,
  Interviews,
  Course,
  Discussions,
} from "./Utils/PagesImport/MentorPagesImport";

const mentorRoutesData = [
  {
    path: "login",
    element: <MentorLogin />,
  },
  {
    path: "profile",
    element: <MentorProfile />,
  },
  {
    path: "edit-profile",
    element: <MentorEditProfile />,
  },
  {
    path: "dashboard",
    element: <MentorDashboard />,
  },
  {
    path: "interviews",
    element: <Interviews />,
  },
  {
    path: "course",
    element: <Course />,
  },
  {
    path: "discussions",
    element: <Discussions />,
  },
];

//College Pages
import {
  CollegeLogin,
  CollegeDashboard,
  CollegeProfile,
  CollegeEditProfile,
  CollegeStudents,
  CollegeStudentProfile,
  CollegeJobs,
} from "./Utils/PagesImport/CollegePagesImport";
const collegeRoutesData = [
  {
    path: "login",
    element: <CollegeLogin />,
  },
  {
    path: "profile",
    element: <CollegeProfile />,
  },
  {
    path: "edit-profile",
    element: <CollegeEditProfile />,
  },
  {
    path: "dashboard",
    element: <CollegeDashboard />,
  },
  {
    path: "students",
    element: <CollegeStudents />,
  },
  {
    path: "student/:id",
    element: <CollegeStudentProfile />,
  },
  {
    path: "jobs",
    element: <CollegeJobs />,
  },
];

// Recruiter Pages
import {
  RecruiterLogin,
  RecruiterDashboard,
  RecruiterCandidates,
  RecruiterJobs,
  RecruiterProfile,
  RecruiterEditProfile,
  RecruiterStudentProfile,
  CreateJob,
  EditJob,
} from "./Utils/PagesImport/RecruiterPagesImport";
const recruiterRoutesData = [
  {
    path: "login",
    element: <RecruiterLogin />,
  },
  {
    path: "profile",
    element: <RecruiterProfile />,
  },
  {
    path: "edit-profile",
    element: <RecruiterEditProfile />,
  },
  {
    path: "dashboard",
    element: <RecruiterDashboard />,
  },
  {
    path: "candidates",
    element: <RecruiterCandidates />,
  },
  {
    path: "jobs",
    element: <RecruiterJobs />,
  },
  {
    path: "create-job",
    element: <CreateJob />,
  },
  {
    path: "edit-job",
    element: <EditJob />,
  },
  {
    path: "student/:id",
    element: <RecruiterStudentProfile />,
  },
];

//Fallback Screen
import Fallback from "./Components/Fallback/Fallback";
import MobileScreen from "./Components/MobileScreen/MobileScreen";

// Redux
import { useSelector, useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const { User, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  if (User) {
    navigate("/");
  }

  return (
    <>
      <ScrollToTop>
        {window.innerWidth > 1000 ? (
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route path="/admin">
              {adminRoutesData.map((route) => (
                <Route
                  key={crypto.randomUUID()}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Fallback />}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>

            {/* Student Routes */}
            <Route path="/student">
              {studentRoutesData.map((route) => (
                <Route
                  key={crypto.randomUUID()}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Fallback />}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>

            {/* Mentor Routes */}
            <Route path="/mentor">
              {mentorRoutesData.map((route) => (
                <Route
                  key={crypto.randomUUID()}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Fallback />}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>

            {/* College Routes */}
            <Route path="/college">
              {collegeRoutesData.map((route) => (
                <Route
                  key={crypto.randomUUID()}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Fallback />}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>

            {/* Recruiter Routes */}
            <Route path="/recruiter">
              {recruiterRoutesData.map((route) => (
                <Route
                  key={crypto.randomUUID()}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Fallback />}>
                      {route.element}
                    </React.Suspense>
                  }
                />
              ))}
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          <MobileScreen />
        )}
      </ScrollToTop>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
