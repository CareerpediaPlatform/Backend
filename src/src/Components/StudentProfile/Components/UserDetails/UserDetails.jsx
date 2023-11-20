import "./UserDetails.scss";

import pdf from "./Assets/pdff.pdf";

import emailIcon from "./Assets/email.png";
import telephoneIcon from "./Assets/telephone.png";
import userPic from "./Assets/userprofile.png";
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
    </div>
  );
};

export default UserDetails;
