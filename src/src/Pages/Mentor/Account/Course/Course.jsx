import "./Course.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

import PreviewCourse from "../../../../Components/PreviewCourse/PreviewCourse";

const Course = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="mentor-courses">
      <Sidebar />
      <div className="course-content">
        <Navbar type="course" />
        <div
          className="course-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <PreviewCourse active={0} />
        </div>
      </div>
    </div>
  );
};

export default Course;
