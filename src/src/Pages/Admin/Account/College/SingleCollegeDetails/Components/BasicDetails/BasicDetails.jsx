import React from 'react';

import "./BasicDetails.scss";
import Profile from "../../Assets/picture.png";
import TextField from "@mui/material/TextField";

const BasicData = {
    InstituteName: "Lorem Ipsum",
    FounderName: "John Deo",
    Website: "www.loremIpsum.com",
    EmailId: "loremipsum@gmail.com",
    MobileNumber: 9988776661,
    LinkedInProfile:
      "https://www.linkedin.com/pulse/easy-share-link-generator-social-media-networks-raul-colon/",
  };

const BasicDetails = () => {
  return (
    <div className="basic-details">
    <div className="basic-heading">
      <h2>Basic Details</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
        vulputate libero et velit interdum
      </p>
    </div>
    <div className="basic-list">
      <div className="basic-data">
        <div className="image-logo">
          <img
            src={Profile}
            alt="Static"
            className="img-default"
          />
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
          <p>{BasicData.InstituteName}</p>
          <p>{BasicData.FounderName}</p>
          <p>{BasicData.Website}</p>
        </div>
      </div>

      <div className="basic-data">
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
          <p>{BasicData.EmailId}</p>
          <p>{BasicData.MobileNumber}</p>
          <p id="linkedIn">{BasicData.LinkedInProfile}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BasicDetails