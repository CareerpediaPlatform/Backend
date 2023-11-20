import "./Dashboard.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import Cards from "./Components/Cards/Cards";
import RevenueGraph from "./Components/RevenueGraph/RevenueGraph";
import PerformanceGraph from "./Components/PerformanceGraph/PerformanceGraph";
import CsapGraph from "./Components/CsapGraph/CsapGraph";
import CsepGraph from "./Components/CsepGraph/CsepGraph";

const Dashboard = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-dashboard-content">
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
            <RevenueGraph />
            <PerformanceGraph />
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
