import React from "react";
import "./CollegeDetails.scss";

const CollegeData = {
  Accreditation: "Lorem Ipsum",
  Students: "Lorem Ipsum",
  Deemed: "Lorem Ipsum",
  Departments: "Lorem Ipsum",
  StartYear: 2010,
};

const CollegeDetails = () => {
  return (
    <div className="college-details">
      <div className="college-heading">
        <h2>College Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="college-list">
        <div className="college-data">
          <div className="keys">
            <h3>Accreditation</h3>
            <h3>Students</h3>
            <h3>Deemed</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{CollegeData.Accreditation}</p>
            <p>{CollegeData.Students}</p>
            <p>{CollegeData.Deemed}</p>
          </div>
        </div>

        <div className="college-data">
          <div className="keys">
            <h3>Departments</h3>
            <h3>Start year</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{CollegeData.Departments}</p>
            <p>{CollegeData.StartYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
