import "./Courses.scss";

// Image
import img from "../../Assets/thumbnail.png";
import lessonIcon from "../../Assets/lessons.png";
import studentIcon from "../../Assets/students.png";
import { Link } from "react-router-dom";

// card data
const CardData = [
  {
    img: img,
    date: "28 July 2022",
    title: "English",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: img,
    date: "28 July 2022",
    title: "Logical Reasoning",
    lessons: 30,
    students: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const MyCourses = () => {
  return (
    <div className="basic-course-details">
      <h2>Basic Course</h2>
      <div className="course-cards">
        {CardData.map((data, i) => {
          const { img, date, title, lessons, students, description } = data;
          return (
            <div className="course-card" key={crypto.randomUUID()}>
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
                <Link to={`preview/0`}>
                  <button>Start Learning</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
