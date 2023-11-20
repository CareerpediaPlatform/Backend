import "./Dashboard.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import Cards from "./Components/Cards/Cards";

import CsepGraph from "./Components/CsepGraph/CsepGraph";
import CsapGraph from "./Components/CsapGraph/CsapGraph";
import StudentsPerformance from "./Components/StudentsPerformance/StudentsPerformance";
import AcademicPerformance from "./Components/AcademicPerformance/AcademicPerformance";

const Dashboard = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="recruiter-dashboard">
      <Sidebar />
      <div className="recruiter-dashboard-content">
        <Navbar type="dashboard" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <Cards />

          <div className="bar-charts">
            <StudentsPerformance />
            <AcademicPerformance/>
          </div>
          <div className="bar-charts">
            <CsepGraph />
            <CsapGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
