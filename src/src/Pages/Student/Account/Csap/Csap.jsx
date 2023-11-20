import "./Csap.scss";

import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../Components/Student/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Component
import CourseOverview from "../Lms/CourseOverview/CourseOverview";

const Csap = () => {

  const { close } = useContext(SideBarContext);
  return (
    <div className="student-csap">
      <Sidebar />
      <div className="csap-content">
        <Navbar type="csap" />
        <div
          className="csap-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <CourseOverview type = "csap"/>
        </div>
      </div>
    </div>
  );
};

export default Csap;
