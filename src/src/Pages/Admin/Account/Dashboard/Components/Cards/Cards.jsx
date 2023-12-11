import "./Cards.scss";

const CardData = [
  {
    title: "Students",
    description: "Number of students in careerpedia platform",
    csep: 1800,
    csap: 600,
  },
  {
    title: "College Admins",
    description: "Number of college admins in careerpedia platform",
    total: 50,
  },
  {
    title: "Mentors",
    description: "Number of mentors in careerpedia platform",
    csep: 18,
    csap: 6,
  },
  {
    title: "Courses",
    description: "Number of courses in careerpedia platform",
    csep: 10,
    csap: 2,
  },
];

const Cards = () => {
  return (
    <div className="admin-cards">
      {CardData.map((data) => {
        const { title, description, csep, csap, total } = data;
        return (
          <div className="admin-card"  key={crypto.randomUUID()}>
            <div className="titles">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <div className="count">
              {csep !== undefined && csap !== undefined && (
                <div className="courses">
                  <div className="course">
                    <p className="circle"></p>
                    <p>CSEP</p>
                    <p id="blue-text">{csep}</p>
                  </div>
                  <div className="course">
                    <p className="circle"></p>
                    <p>CSAP</p>
                    <p id="yellow-text">{csap}</p>
                  </div>
                </div>
              )}
              <div className="total">
                <h2 className={total !== undefined ? "total1" : ""}>
                  {total !== undefined ? total : csep + csap}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
