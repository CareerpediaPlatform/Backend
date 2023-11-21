import "./EducationDetails.scss";

// import images
import collegeIcon from "../../../Assets/college.jpg";
import calenderIcon from "../../../Assets/calender.png";

const data = [
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
    <div className="education-detail">
      <div className="education-detail-heading">
        <h1>Education Details</h1>
      </div>

      <div className="education-detail-cards">
        {data.map((education) => {
          return (
            <div className="education-detail-cards-card" key={crypto.randomUUID()}>
              <div className="education-detail-card-top">
                <div className="education-detail-card-headings">
                  <h2>{education.degree}</h2>
                  <p>{education.profession}</p>
                </div>
                <div className="education-detail-card-clg-name">
                  <img src={collegeIcon} alt="collegeIcon" />
                  <p>{education.university}</p>
                </div>
              </div>
              <div className="education-detail-card-bottom">
                <div className="education-detail-card-gpa">
                  <h2>{education.gpa}</h2>GPA
                </div>
                <div className="education-detail-card-dates">
                  <img src={calenderIcon} alt="calenderIcon" />
                  <p>{education.date}</p>
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
