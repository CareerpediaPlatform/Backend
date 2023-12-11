import React from "react";
// import "./WorkExperience.scss";

const WorkExpData = {
  Occupation: "Lorem Ipsum",
  JobRole: "Lorem Ipsum",
  StartDate: 2010,
  EndDate: 2020,
};

const WorkExperience = () => {
  return (
    <div className="mentor-details">
      <div className="mentor-heading">
        <h2>Work Experience</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="personal-list">
        <div className="personal-data">
          <div className="keys">
            <h3>Occupation</h3>
            <h3>Job role</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{WorkExpData.Occupation}</p>
            <p>{WorkExpData.JobRole}</p>
          </div>
        </div>

        <div className="personal-data">
          <div className="keys">
            <h3>Start date</h3>
            <h3>End date</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{WorkExpData.StartDate}</p>
            <p>{WorkExpData.EndDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
