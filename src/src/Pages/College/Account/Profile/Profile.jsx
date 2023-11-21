import "./Profile.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/College/Navbar/Navbar";
import Sidebar from "../../../../Components/College/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CollegeDetails from "./Components/CollegeDetails/CollegeDetails";

const Profile = () => {
  const { close } = useContext(SideBarContext);

  return (
    <div className="college-admin-profile">
      <Sidebar />
      <div className="college-admin-profile-content">
        <Navbar type="profile" />
        <div
          className="college-admin-profile-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="college-admin-profile-components">
            <BasicDetails />
            <hr className="division"/>
            <ContactDetails />
            <hr className="division"/>
            <CollegeDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
