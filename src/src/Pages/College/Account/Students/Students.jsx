import "./Students.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/College/Sidebar/Sidebar";
import Navbar from "../../../../Components/College/Navbar/Navbar";

import StudentList from "./Components/StudentList";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

const Students = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="college-colleges">
      <Sidebar />
      <div className="college-colleges-content">
        <Navbar type="students" />
        <div
          className="college-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <StudentList/>
        </div>
      </div>
    </div>
  );
};

export default Students;
