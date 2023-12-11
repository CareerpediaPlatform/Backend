import React from "react";
import "./EducationDetails.scss";

import UniversityImage from "../../Assets/Vector.png";
import CalenderImage from "../../Assets/Calender.png";

const EducationData = [
  {
    degree: "Bachelors in Science (Bcom)",
    profession: "Computer Engineering",
    university: "Harvard University, Cambridge",
    gpa: "3.71",
    date: "2019-2023",
  },
  {
    degree: "Bachelors in Science (BSc)",
    profession: "Computer Engineering",
    university: "Harvard University, Cambridge",
    gpa: "3.71",
    date: "2019-2023",
  },
  {
    degree: "Bachelors in Science (BSc)",
    profession: "Computer Engineering",
    university: "Harvard University, Cambridge",
    gpa: "3.71",
    date: "2019-2023",
  },
];

const EducationDetails = () => {
  return (
    <div className="education-details">
      <div className="education-details-heading">
        <h2>Education Details</h2>
      </div>

      <div className="education-details-single-card">
        {EducationData.map((education, index) => {
          return (
            <div className="education-details-card" key={index}>
              <div className="education-details-degree-profession">
                <h3>{education.degree}</h3>
                <p>{education.profession}</p>
              </div>
              <div className="education-details-university">
                <img src={UniversityImage} alt="" />
                <h3>{education.university}</h3>
              </div>
              <div className="education-details-gpa">
                <h3>
                  {education.gpa}
                  <span id="gpa">GPA</span>
                </h3>
                <div className="education-details-year">
                  <img src={CalenderImage} alt="" />
                  <span>{education.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationDetails;
