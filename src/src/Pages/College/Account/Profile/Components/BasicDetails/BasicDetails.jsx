import "./BasicDetails.scss";
import { useState } from "react";

// Components
import Form from "../Form/Form";
import Popup from "reactjs-popup";
import Close from "./Assets/close-circle.png";

// Icons
import Profile from "../../../Assets/profileIcon.png";
import user from "../../../Assets/user.png";

import { Link } from "react-router-dom";

const PersonalData = {
  instituteName: "Lorem Ipsum",
  founderName: "John Doe",
  website: "www.loremipsum.com",
  EmailId: "loremipsum@gmail.com",
  MobileNumber: 9988776661,
  LinkedInProfile:
    "https://www.linkedin.com/pulse/easy-share-link-generator-social-media-networks-raul-colon/",
};

const BasicDetails = () => {
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
    <div className="personal-details">
      <div className="edit-icon">
        <Link to="../edit-profile">
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
            <img src={Close} className="popup-close" onClick={handleClose} />
          </div>
        </Popup>
      </div>

      <div className="personal-details-data">
        <div className="personal-heading">
          <h2>Basic Details</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum
          </p>
        </div>
        <div className="personal-list">
          <div className="personal-data">
            <div className="image-logo">
              <label htmlFor="fileInput">
                <img src={user} alt="Static" className="img-default" />
              </label>
            </div>

            <div className="keys">
              <h3>Institute name</h3>
              <h3>Founder name</h3>
              <h3>Website</h3>
            </div>
            <div className="keys">
              <h4>:</h4>
              <h4>:</h4>
              <h4>:</h4>
            </div>
            <div className="keys">
              <p>{PersonalData.instituteName}</p>
              <p>{PersonalData.founderName}</p>
              <p>{PersonalData.website}</p>
            </div>
          </div>

          <div className="personal-data">
            <div className="keys">
              <h3>Email ID</h3>
              <h3>Mobile number</h3>
              <h3>Linkedin profile</h3>
            </div>
            <div className="keys">
              <h4>:</h4>
              <h4>:</h4>
              <h4>:</h4>
            </div>
            <div className="keys">
              <p>{PersonalData.EmailId}</p>
              <p>{PersonalData.MobileNumber}</p>
              <p id="linkedIn">{PersonalData.LinkedInProfile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
