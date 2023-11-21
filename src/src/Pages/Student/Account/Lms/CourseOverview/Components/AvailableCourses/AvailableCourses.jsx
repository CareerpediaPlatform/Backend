import "../MyCourses/MyCourses.scss";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Image
import img from "../Assets/thumbnail.png";
import lessonIcon from "../Assets/lessons.png";
import studentIcon from "../Assets/students.png";
import { Link } from "react-router-dom";

// card data
const csepCourseData = [
  {
    img: img,
    date: "28 July 2022",
    title: "UI Design ",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "ui",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "Development",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "development",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "Testing",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "testing",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "Digital marketing",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "dm",
  },
];
const csapCourseData = [
  {
    img: img,
    date: "28 July 2022",
    title: "TOEFL",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "toefl",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "IELTS",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "ielts",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "GRE",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerAmount: "$380",
    originalAmount: "$500",
    type: "gre",
  },
];

const AvailableCourses = ({ type }) => {
  const dataToMap = type === "csep" ? csepCourseData : csapCourseData;

  const [filteredType, setFilteredType] = useState("all");

  const handleFilter = (filterType) => {
    setFilteredType(filterType);
  };
  const filteredCourses =
    filteredType === "all"
      ? dataToMap
      : dataToMap.filter((course) => course.type === filteredType);

  // Animation
  const animationControls = useAutoAnimate();

  return (
    <div className="course-details">
      {type === "csep" ? (
        <div className="filter">
          <h2>Available Courses</h2>
          <div className="filter-options">
            <button
              className={`filter-option ${
                filteredType === "all" ? "active" : ""
              }`}
              onClick={() => handleFilter("all")}
            >
              All Courses
            </button>
            <button
              className={`filter-option ${
                filteredType === "ui" ? "active" : ""
              }`}
              onClick={() => handleFilter("ui")}
            >
              Design
            </button>
            <button
              className={`filter-option ${
                filteredType === "development" ? "active" : ""
              }`}
              onClick={() => handleFilter("development")}
            >
              Development
            </button>
            <button
              className={`filter-option ${
                filteredType === "testing" ? "active" : ""
              }`}
              onClick={() => handleFilter("testing")}
            >
              Testing
            </button>
            <button
              className={`filter-option ${
                filteredType === "dm" ? "active" : ""
              }`}
              onClick={() => handleFilter("dm")}
            >
              DIgital Marketing
            </button>
          </div>
        </div>
      ) : (
        <div className="filter">
          <h2>Available Courses</h2>
          <div className="filter-options">
            <button
              className={`filter-option ${
                filteredType === "all" ? "active" : ""
              }`}
              onClick={() => handleFilter("all")}
            >
              All Courses
            </button>
            <button
              className={`filter-option ${
                filteredType === "toefl" ? "active" : ""
              }`}
              onClick={() => handleFilter("toefl")}
            >
              TOEFL
            </button>
            <button
              className={`filter-option ${
                filteredType === "ielts" ? "active" : ""
              }`}
              onClick={() => handleFilter("ielts")}
            >
              IELTS
            </button>
            <button
              className={`filter-option ${
                filteredType === "gre" ? "active" : ""
              }`}
              onClick={() => handleFilter("gre")}
            >
              GRE
            </button>
          </div>
        </div>
      )}

      <div className="course-cards">
        {filteredCourses.map((course, index) => {
          const {
            img,
            date,
            title,
            lessons,
            students,
            description,
            offerAmount,
            originalAmount,
          } = course;

          return (
            <div
              key={index}
              className={`course-card ${
                course.type === filteredType || filteredType === "all"
                  ? "visible"
                  : "hidden"
              }`}
              data-type={course.type}
              ref={animationControls.ref}
            >
              <div className="thumbnail">
                <img src={img} alt="" />
              </div>
              <div className="details">
                <h3>{date}</h3>
                <h2>{title}</h2>
                <div className="total">
                  <div className="lessons">
                    <img src={lessonIcon} alt="" />
                    <p> Lessons : {lessons}</p>
                  </div>
                  <div className="lessons">
                    <img src={studentIcon} alt="" />
                    <p> Students : {students}</p>
                  </div>
                </div>
                <p>{description}</p>
              </div>
              <div className="pricing">
                <div className="cost">
                  <p className="offer">{offerAmount}</p>
                  <p className="original">{originalAmount}</p>
                </div>
                <Link to={`preview/1`}>
                  <button>Know More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableCourses;
