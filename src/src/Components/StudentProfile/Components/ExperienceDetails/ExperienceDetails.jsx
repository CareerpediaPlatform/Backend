import React from "react";
import "./ExperienceDetails.scss";

const ExperienceData = [
  {
    companyName: "Apple",
    position: "Software Developer",
    year: "2",
    month: "6",
    startAt: "01/01/2021",
    endAt: "31/07/2023",
  },
  {
    companyName: "Apple",
    position: "Software Developer",
    year: "2",
    month: "6",
    startAt: "01/01/2021",
    endAt: "31/07/2023",
  },
  {
    companyName: "Apple",
    position: "Software Developer",
    year: "2",
    month: "6",
    startAt: "01/01/2021",
    endAt: "31/07/2023",
  },
];

const ExperienceDetails = () => {
  return (
    <div className="experience-details">
      <div className="experience-details-heading">
        <h2>Experience Details</h2>
      </div>

      <div className="experience-details-single-card">
        {ExperienceData.map((experience, index) => {
          return (
            <div className="experience-details-card" key={index}>
              <div className="experience-details-companyName-position">
                <h3>{experience.companyName}</h3>
                <p>{experience.position}</p>
              </div>

              <div className="experience-details-year-month">
                <div className="experience-details-year-month-part">
                  <h3>
                    {experience.year}
                    <span id="year">Y</span>
                  </h3>
                  <h3>
                    {experience.month}
                    <span id="month">M</span>
                  </h3>
                </div>
                <div className="experience-details-year">
                  <span>Start: {experience.startAt}</span>
                  <span>End: {experience.endAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceDetails;
