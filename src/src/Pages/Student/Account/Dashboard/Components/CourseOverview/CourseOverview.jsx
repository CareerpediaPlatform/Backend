import React from "react";
import "./CourseOverview.scss";


import Exercise from "./Components/Exercise/Exercise"
import Test from "./Components/Test/Test";
import VideosList from "./Components/Videos/VideosList";

const CourseOverview = () => {
  return (
    <div className="course-content">
      <div className="course-heading">
        <h3>Graphic Design</h3>
      </div>
      <div className="course-content-part">
        <div className="course-heading">
          <h4>Introduction to Graphic Design</h4>
          <p>
            This module provides an overview of the course and a review of the
            main tools used in descriptive statistics to visualize inform
          </p>
        </div>

       <VideosList/>
       <Exercise/>
       <Test/>
      </div>
    </div>
  );
};

export default CourseOverview;
