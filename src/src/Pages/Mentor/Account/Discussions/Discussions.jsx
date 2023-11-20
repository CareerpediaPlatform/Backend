import "./Discussions.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import AllThreads from "./Components/AllThreads/AllThreads";


const Discussions = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="mentor-discussion">
      <Sidebar />
      <div className="discussion-content">
        <Navbar type="discussion" />
        <div
          className="discussion-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
         <AllThreads/>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
