import React, { useState } from "react";
import "./AllJobs.scss";

import RectangleIcon from "../../Assets/Rectangle.png";
import SearchIcon from "../../Assets/Search.png";
import MapIcon from "../../Assets/map.png";
import FilterIcon from "../../Assets/filter.png";

//icons
import Briefcase from "../../Assets/briefcase.png";
import Money from "../../Assets/money.png";
import Profile from "../../Assets/profile.png";
import Vector from "../../Assets/Vector.png";

import { Link } from "react-router-dom";
const AllJobs = () => {
  const jobData = [
    {
      id: 1,
      logo: RectangleIcon,
      level: 10,
      title: "UI Designer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 11,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 2,
      logo: RectangleIcon,
      level: 3,
      title: "Fronted Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 1,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 3,
      logo: RectangleIcon,
      level: 5,
      title: "Backend Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 5,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 4,
      logo: RectangleIcon,
      level: 2,
      title: "Fronted Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 9,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 5,
      logo: RectangleIcon,
      level: 10,
      title: "Interaction Designer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 17,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 6,
      logo: RectangleIcon,
      level: 8,
      title: "Graphic Designer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 23,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 7,
      logo: RectangleIcon,
      level: 12,
      title: "Web Designer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 10,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 8,
      logo: RectangleIcon,
      level: 11,
      title: "React Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 2,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 9,
      logo: RectangleIcon,
      level: 9,
      title: "Angular Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 4,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 10,
      logo: RectangleIcon,
      level: 6,
      title: "Backend Developer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 25,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
    {
      id: 11,
      logo: RectangleIcon,
      level: 5,
      title: "Graphic Designer",
      money: "$800 - $1,000",
      type: "Full Time",
      Shift: "Day Shift",
      Openings: 5,
      location: "Madhapur • Hyderabad, Telangana",
      postedDaysAgo: 2,
      description:
        "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState("All");

  // Time filter
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("All");

  // Level Filter
  const [selectedLevel, setSelectedLevel] = useState("All");

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredJobs = jobData.filter((job) => {
    const currentDate = new Date();
    const jobDate = new Date();
    jobDate.setDate(currentDate.getDate() - job.postedDaysAgo);

    const isTimePeriodMatch =
      selectedTimePeriod === "All" ||
      (currentDate - jobDate) / (1000 * 3600 * 24) <= selectedTimePeriod;

    const isLevelMatch =
      selectedLevel === "All" || job.level.toString() === selectedLevel;

    return isTimePeriodMatch && isLevelMatch;
  });

  return (
    <div className="student-all-jobs">
      <div className="top">
        <div className="search">
          <img src={SearchIcon} alt="" />
          <input type="text" placeholder="Job Title, Company, or Keywords" />
        </div>
        <hr />

        <div className="search">
          <img src={MapIcon} alt="" />
          <select name="Location" id="Location">
            <option value="Select Location">Select Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
        <hr />

        <div className="search">
          <select
            name="TimePeriod"
            id="TimePeriod"
            onChange={(e) => setSelectedTimePeriod(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">Last day</option>
            <option value="7">Last week</option>
            <option value="30">Last month</option>
          </select>
        </div>

        <hr />

        <div className="search">
          <select
            name="TimePeriod"
            id="TimePeriod"
            onChange={handleLevelChange}
            value={selectedLevel}
          >
            <option value="All">Levels</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
            <option value="6">Level 6</option>
            <option value="7">Level 7</option>
            <option value="8">Level 8</option>
            <option value="9">Level 9</option>
            <option value="10">Level 10</option>
            <option value="11">Level 11</option>
            <option value="12">Level 12</option>
          </select>
        </div>
      </div>
      <div className="active-jobs-container">
        {filteredJobs.map((job) => (
          <div className="active-job-card" key={job.id}>
            <div>
              <h4 className="job-level">Level - {job.level}</h4>
            </div>
            <div className="heading">
              <h3 className="job-heading">{job.title}</h3>
              <p className="job-location">{job.location}</p>
              <p className="job-location">{job.postedDaysAgo} days ago</p>
            </div>
            <div className="icons-container">
              <div className="icons-main">
                <div className="icons">
                  <img src={Money} alt="Money" className="icon" />
                  <p className="text">{job.money}</p>
                </div>
                <div className="icons">
                  <img src={Briefcase} alt="Briefcase" className="icon" />
                  <p className="text">{job.type}</p>
                </div>
              </div>
              <div className="icons-main">
                <div className="icons">
                  <img src={Vector} alt="Vector" className="icon" />
                  <p className="text">{job.Shift}</p>
                </div>
                <div className="icons">
                  <img src={Profile} alt="Profile" className="icon" />
                  <p className="text">{job.Openings} Openings</p>
                </div>
              </div>
            </div>
            <p className="description">{job.description}</p>
            <Link to="/student/job/:id">
              <div className="button-container">
                <button className="button1">Apply Now</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
