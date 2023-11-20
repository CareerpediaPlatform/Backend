import "./BookSlot.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Images
import LevelImage from "../Levels/Assets/BigLevel.png";
import CalenderImage from "./Assets/calendar.png";
import ClockImage from "./Assets/clock.png";
import VideoImage from "./Assets/video.png";

const BookSlot = ({ data }) => {
  const [slots, setSlots] = useState(0);

  return (
    <div className="BookASlot">
      <div className="BookSlot" style={{ display: slots ? "none" : "flex" }}>
        <h3>Book A Slot</h3>
        <img src={LevelImage} alt="" />
        <h4>{data}</h4>
        <p>
          You want to level check your skill and eligibility by attending
          interview
        </p>
        <Link to="/student/book-slot">
          <button className="bookSlot-button">Book Slot</button>
        </Link>
      </div>

      <div
        className="UpComingInterview"
        style={{ display: slots ? "flex" : "none" }}
      >
        <h3>UpComing Interview</h3>
        <img src={LevelImage} alt="" />
        <h5>{data}</h5>

        <div className="schedule">
          <img src={CalenderImage} alt="" />
          <p>4th Jan 2023</p>
        </div>
        <div className="schedule">
          <img src={ClockImage} alt="" />
          <p>9:00am - 9:30am</p>
        </div>
        <div className="schedule">
          <img src={VideoImage} alt="" />
          <p>
            https://meet.google.com/<span>rcd-sini-tyj</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookSlot;
