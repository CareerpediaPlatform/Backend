import "./Profile.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Close from "./Assets/close-circle.png";

// Sidebar and Navbar
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CompanyDetails from "./Components/CompanyDetails/CompanyDetails";
import Form from "./Components/Form/Form";

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
    <div className="recruiter-profile">
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
          <div className="recruiter-profile">
            <div className="edit-section">
              <Link to="/recruiter/edit-profile">
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

            <BasicDetails />
            <hr className="division" />
            <ContactDetails />
            <hr className="division" />
            <CompanyDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
