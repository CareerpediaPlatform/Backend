import "./BasicCourse.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../Components/Student/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Component
import Courses from "./Components/Courses/Courses";

const English = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="basic">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="basic-course" />
        <div
          className="basic-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <Courses />
        </div>
      </div>
    </div>
  );
};

export default English;
