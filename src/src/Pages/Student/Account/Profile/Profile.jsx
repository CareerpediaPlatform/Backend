import "./Profile.scss";
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import { useContext } from "react";
import { SideBarContext } from "../../../../Context/SidebarContext";

import UserDetails from "./Components/UserDetails/UserDetails";
import EducationDetails from "./Components/EducationDetails/EducationDetails";
import ExperienceDetails from "./Components/ExperienceDetails/ExperienceDetails";

const Profile = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="student-profile">
      <Sidebar />
      <div className="profile-content">
        <Navbar type="profile" />
        <div
          className="profile-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="profile-components">
            <UserDetails />
            <EducationDetails />
            <ExperienceDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
