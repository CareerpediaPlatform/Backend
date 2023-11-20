import "./CollegeDetails.scss";
const CollegeDetails = () => {
  const ContactData = {
    Accreditation: "2326 Smithfield Avenue",
    Students: "Lubbock",
    CollegeCode: "CP001",
    Departments: "Texas",
    StartYear: "24-12-2020",
    CurrentYear: "24-12-2023",
  };
  return (
    <div className="college-details">
      <div className="college-heading">
        <h2>College Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="college-list">
        <div className="college-data">
          <div className="keys">
            <h3>Accreditation</h3>
            <h3>Number of Students</h3>
            <h3>College Code</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{ContactData.Accreditation}</p>
            <p>{ContactData.Students}</p>
            <p>{ContactData.CollegeCode}</p>
          </div>
        </div>

        <div className="college-data">
          <div className="keys">
            <h3>Departments</h3>
            <h3>Start year</h3>
            <h3>Current year</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{ContactData.Departments}</p>
            <p>{ContactData.StartYear}</p>
            <p>{ContactData.CurrentYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
