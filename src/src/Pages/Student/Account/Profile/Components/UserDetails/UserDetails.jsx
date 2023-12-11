import "./UserDetails.scss";
import { useState } from "react";
import Popup from "reactjs-popup";
import Close from "./Assets/close-circle.png";
import Form from "../Form/Form";

import emailIcon from "../../../Assets/email.png";
import telephoneIcon from "../../../Assets/telephone.png";
import userPic from "../../../Assets/userprofile.png";
import pdf from "./Assets/pdff.pdf";
import { Link } from "react-router-dom";

const data = {
  studentName: "Babu",
  number: 7658961300,
  email: "bainasatya245@gmail.com",
  linkedIn: "bainasatya245@gmail.com",
  DOB: "24-05-1996",
  gender: "male",
  pdf: pdf,
};

const UserDetails = () => {
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
    <div className="profile-user">
      <div className="profile-user-left">
        <div className="profile-pic">
          <img src={userPic} alt="profile-pic" />
        </div>

        <div className="profile-user">
          <div className="profile-user-name">
            <h2>{data.studentName}</h2>
          </div>
          <div className="profile-user-contacts">
            <div className="profile-user-contact">
              <img src={telephoneIcon} alt="telephone" />
              <a href={`tel:${data.number}`}>{data.number}</a>
            </div>
            <div className="profile-user-contact">
              <img src={emailIcon} alt="email" />
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div className="profile-user-contact">
              <h5>LinkedIn :</h5>
              <a href={`mailto:${data.linkedIn}`}>{data.linkedIn}</a>
            </div>
          </div>
          <div className="profile-user-contacts">
            <div className="profile-user-contact">
              <h5>Date of Birth :</h5>
              <p>{data.DOB}</p>
            </div>
            <div className="profile-user-contact">
              <h5>Gender :</h5>
              <p>{data.gender}</p>
            </div>
            <div className="profile-user-contact">
              <h5>Resume :</h5>
              <a href={data.pdf} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-user-right">
        <div className="profile-user-left-edit">
          <Link to="../edit-profile">
            <button>Edit Profile</button>
          </Link>
        </div>
        <span>|</span>
        <button onClick={handleOpen}>Change Password</button>
      </div>

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
  );
};

export default UserDetails;
