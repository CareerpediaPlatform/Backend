import "./Preview.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";
import PreviewCourse from "../../../../../Components/PreviewCourse/PreviewCourse";

const Preview = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-dashboard-content">
        <Navbar type="preview" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <PreviewCourse admin={true} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
