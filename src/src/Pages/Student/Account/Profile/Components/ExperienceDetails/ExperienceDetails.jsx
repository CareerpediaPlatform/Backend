import "./ExperienceDetails.scss";

const data = [
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
        <h1>Work Experience</h1>
      </div>

      <div className="experience-details-cards">
        {data.map((experience) => {
          return (
            <div className="experience-details-cards-card" key={crypto.randomUUID()}>
              <div className="experience-details-card-headings">
                <h2>{experience.companyName}</h2>
                <p>{experience.position}</p>
              </div>

              <div className="experience-details-card-bottom">
                <div className="experience-details-card-years">
                  <h2>
                    {experience.year}
                    <span>Y</span>
                  </h2>
                  <h2>
                    {experience.month}
                    <span>M</span>
                  </h2>
                </div>
                <div className="experience-details-card-dates">
                  <p>Start:{experience.startAt}</p>
                  <p>End:{experience.endAt}</p>
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
