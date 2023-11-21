import React from "react";
// import "./WorkExperience.scss";

const CompanyData = {
  EstablishYear: "Lorem Ipsum",
  CurrentYear: "Lorem Ipsum",
  Employees:50,
  Departments:4,
  AnnualIncome: 2010,
  EndYear: 2020,
};

const CompanyDetails = () => {
  return (
    <div className="mentor-details">
      <div className="mentor-heading">
        <h2>Company Experience</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="personal-list">
        <div className="personal-data">
          <div className="keys">
            <h3>Establish Year</h3>
            <h3>Current Year</h3>
            <h3>Number of Employees</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{CompanyData.EstablishYear}</p>
            <p>{CompanyData.CurrentYear}</p>
            <p>{CompanyData.Employees}</p>
          </div>
        </div>

        <div className="personal-data">
          <div className="keys">
            <h3>Departments</h3>
            <h3>Annual Income</h3>
            <h3>End Year</h3>           
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{CompanyData.Departments}</p>
            <p>{CompanyData.AnnualIncome}</p>
            <p>{CompanyData.EndYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
