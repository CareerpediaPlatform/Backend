import "./StudentProfile.scss";
import {useNavigate } from "react-router-dom";

// Components
import UserDetails from "./Components/UserDetails/UserDetails";
import StudentPerformance from "./Components/StudentPerformance/StudentPerformance";
import EducationDetails from "./Components/EducationDetails/EducationDetails";
import ExperienceDetails from "./Components/ExperienceDetails/ExperienceDetails";

// Icon
import icon from "./Assets/backIcon.png";

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="student-profile">
      <div className="back-icon">
        <img src={icon} alt="" onClick={handleGoBack}/>
      </div>
      <UserDetails />
      <StudentPerformance />
      <EducationDetails />
      <ExperienceDetails />
    </div>
  );
};

export default StudentProfile;
