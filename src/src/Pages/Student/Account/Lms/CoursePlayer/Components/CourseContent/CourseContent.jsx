import { useState } from "react";
import "./CourseContent.scss";

// images
import book from "../../../../Assets/book.png";
import clock from "../../../../Assets/clock.png";
import VideosList from "./Components/Videos/VideosList";
import Test from "./Components/Test/Test";
import Exercise from "./Components/Exercise/Exercise";
const CourseContent = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="course-content">
      <div className="course-content-module">
        <div className="course-content-module-thumbnail">
          <div className="module-duration">
            <img src={clock} alt="clock" />
            <h3>2 hours to complete</h3>
          </div>
          <div className="module-heading">
            <h2>Introduction to Graphic Design</h2>
          </div>
          <div className="module-description">
            <p>
              This module provides an overview of the course and a review of the
              main tools used in descriptive statistics to visualize inform
            </p>
          </div>

          <div className="module-bottom">
            <img src={book} alt="book" />
            <p>06 videos (Total 38 mints), Exercise, Test </p>
            {active ? (
              <button onClick={() => setActive(null)}>see less</button>
            ) : (
              <button onClick={() => setActive(1)}>See All</button>
            )}
          </div>
        </div>

        <div className={active ? "video-list" : "none"}>
          <VideosList />
          <Exercise />
          <Test />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
