import "./StudentDetails.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Component
import StudentProfile from "../../../../Components/StudentProfile/StudentProfile";
import SelectedButtons from "./SelectedButtons/SelectedButtons";

const StudentDetails = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="college-student">
      <Sidebar />
      <div className="student-content">
        <Navbar type="student-profile" />
        <div
          className="student-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="individual-profile">
            <StudentProfile />
            <SelectedButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
