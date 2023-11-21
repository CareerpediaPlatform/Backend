import "./Dashboard.scss";
import { useContext, useState } from "react";

// Navbar and Sidebar
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import Cards from "./Components/Cards/Cards";
import SubjectProgress from "./Components/SubjectProgress/SubjectProgress";
import CourseOverview from "./Components/CourseOverview/CourseOverview";
import EGraph from "./Components/EGraph/EGraph";
import CourseGraph from "./Components/CourseGraph/CourseGraph";
import Level from "./Components/Levels/Level";
import BookSlot from "./Components/BookSlot/BookSlot";
import Upgrade from "./Components/Upgrade/Upgrade";

const Dashboard = () => {
  const { close } = useContext(SideBarContext);

  const [data, setData] = useState("")

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="dashboard" />
        <div
          className="dashboard-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="middle-components">
            <SubjectProgress />
            <Cards />
            <CourseOverview />
            <div className="graphs">
              <EGraph />
              <CourseGraph />
            </div>
          </div>

          <div className="right-sideBar">
            <Level setData={setData}/>
            <BookSlot data={data}/>
            <Upgrade />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





