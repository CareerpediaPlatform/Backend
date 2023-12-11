import "./PersonalDetails.scss";

import Profile from "../../assets/picture.png";

const PersonalData = {
  FirstName: "Lorem",
  LastName: "Ipsum",
  DateOfBirth: "24/04/1997",
  EmailId: "loremipsum@gmail.com",
  MobileNumber: 9988776661,
  LinkedInProfile:
    "https://www.linkedin.com/pulse/easy-share-link-generator-social-media-networks-raul-colon/",
};

const PersonalDetails = () => {
  return (
    <div className="personal-details">
      <div className="personal-heading">
        <h2>Personal Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="personal-list">
        <div className="personal-data">
          <div className="image-logo">
            <img src={Profile} alt="Static" className="img-default" />
          </div>

          <div className="keys">
            <h3>First name</h3>
            <h3>Last name</h3>
            <h3>Date of birth</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{PersonalData.FirstName}</p>
            <p>{PersonalData.LastName}</p>
            <p>{PersonalData.DateOfBirth}</p>
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
  );
};

export default PersonalDetails;
