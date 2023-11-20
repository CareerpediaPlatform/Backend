import "./AllCourses.scss";
import { useContext } from "react";
import AllCourse from "./Components/AllCourse";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

const AllCourses = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="admin-courses">
      <Sidebar />
      <div className="admin-course-content">
        <Navbar type="course" />
        <div
          className="course-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <AllCourse />
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
