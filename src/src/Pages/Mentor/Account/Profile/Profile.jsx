import "./Profile.scss";
import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import Close from "./Assets/close-circle.png";
import { Link } from "react-router-dom";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import EducationalDetails from "./Components/EducationalDetails/EducationalDetails";
import WorkExperience from "./Components/WorkExperience/WorkExperience";
import Form from "./Components/Form/Form";

// MUI
import { Modal, Box } from "@mui/material";

const Profile = () => {
  const { close } = useContext(SideBarContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const customStyles = {
    // Define your custom styles here
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      background: "white",
      height: "40%",
      borderRadius: "10px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div className="mentor-profile">
      <Sidebar />
      <div className="profile-content">
        <Navbar type="profile" />
        <div
          className="profile-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="mentor-profile">
            <div className="edit-section">
              <Link to="/mentor/edit-profile">
                <button>Edit Profile</button>
              </Link>
              <span>|</span>
              <button onClick={handleOpen}>Change Password</button>

              {/* pop up */}
              <Popup
                open={open} // Use the open state to control the visibility of the popup
                modal
                contentStyle={customStyles.content}
                overlayStyle={customStyles.overlay}
              >
                <div className="popup-div">
                  <Form />
                  <img
                    src={Close}
                    className="popup-close"
                    onClick={handleClose}
                  />
                </div>
              </Popup>
            </div>

            <PersonalDetails />
            <hr className="division" />
            <ContactDetails />
            <hr className="division" />
            <EducationalDetails />
            <hr className="division" />
            <WorkExperience />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
