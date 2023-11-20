import "./Jobs.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../Components/College/Sidebar/Sidebar";
import Navbar from "../../../../Components/College/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

import JobList from "./Components/JobList";
const Jobs = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="college-colleges-jobs">
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
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
