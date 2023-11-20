import "./Csep.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../Components/Student/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Component
import CourseOverview from "../Lms/CourseOverview/CourseOverview";

const Csep = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="student-csep">
      <Sidebar />
      <div className="csep-content">
        <Navbar type="csep" />
        <div
          className="csep-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <CourseOverview type = "csep"/>
        </div>
      </div>
    </div>
  );
};

export default Csep;
