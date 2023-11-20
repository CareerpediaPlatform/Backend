import "./Interview.scss";
import { useContext } from "react";

// Navbar and Sidebar
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

import List from "./Components/List";

const Interview = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="student-interview">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="interview" />
        <div
          className="dashboard-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="interview">
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
