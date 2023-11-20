import React, { useState } from "react";
import "./ActiveJobs.scss";

import { Link } from "react-router-dom";

//icons
import Briefcase from "../Assets/briefcase.png";
import Money from "../Assets/money.png";
import Profile from "../Assets/profile.png";
import Vector from "../Assets/Vector.png";

const jobData = [
  {
    id: 1,
    title: "Design",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 2,
    title: "Development",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 3,
    title: "Development",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 4,
    title: "Development",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 5,
    title: "Testing",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 6,
    title: "Development",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 7,
    title: "Design",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 8,
    title: "Testing",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 9,
    title: "Testing",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 10,
    title: "Development",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
  {
    id: 11,
    title: "Design",
    money: "$800 - $1,000",
    type: "Full Time",
    Shift: "Day Shift",
    Openings: 5,
    location: "Madhapur • Hyderabad, Telangana • 2 days ago",
    description:
      "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
  },
];

const ActiveJobs = () => {
  const [selectedTitle, setSelectedTitle] = useState("All");

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  const filteredJobs =
    selectedTitle === "All"
      ? jobData
      : jobData.filter((job) => job.title === selectedTitle);

  return (
    <div>
      <div className="active-jobs-container">
        <div className="active-job-role-filters">
          <select
            value={selectedTitle}
            onChange={handleTitleChange}
            className="course-dropdown"
          >
            <option value="All">All Titles</option>
            {Array.from(new Set(jobData.map((job) => job.title))).map(
              (title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              )
            )}
          </select>
          <Link to="/recruiter/create-job">
            <button className="create-job">Create Job</button>
          </Link>
        </div>
        {filteredJobs.map((job) => (
          <div className="active-job-card" key={job.id}>
            <div className="heading">
              <h3 className="job-heading">{job.title}</h3>
              <p className="job-location">{job.location}</p>
            </div>
            <div className="icons-container">
              <div className="icons-main">
                <span className="icons">
                  <img src={Money} alt="Money" className="icon" />
                  <span className="text">{job.money}</span>
                </span>
                <span className="icons">
                  <img src={Briefcase} alt="Briefcase" className="icon" />
                  <span className="text">{job.type}</span>
                </span>
              </div>
              <div className="icons-main">
                <span className="icons">
                  <img src={Vector} alt="Vector" className="icon" />
                  <span className="text">{job.Shift}</span>
                </span>
                <span className="icons">
                  <img src={Profile} alt="Profile" className="icon" />
                  <span className="text">{job.Openings} Openings</span>
                </span>
              </div>
            </div>
            <p className="description">{job.description}</p>

            <div className="button-container">
              <Link to="/recruiter/edit-job" className="button1">
                Edit
              </Link>
              <button className="button2">Deactivate </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveJobs;
