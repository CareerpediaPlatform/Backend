import "./EducationalDetails.scss";

const EducationalData = {
  HighestEducation: "Lorem Ipsum",
  BachelorsDegree: "Lorem Ipsum",
  DegreePercentage: "80%",
  DepartmentBranch: "Lorem Ipsum",
  StartYear: 2010,
  EndYear: 2020,
};

const EducationalDetails = () => {
  return (
    <div className="educational-details">
      <div className="educational-heading">
        <h2>Educational Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="educational-list">
        <div className="educational-data">
          <div className="keys">
            <h3>Highest education</h3>
            <h3>Bachelor's degree</h3>
            <h3>Degree percentage</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{EducationalData.HighestEducation}</p>
            <p>{EducationalData.BachelorsDegree}</p>
            <p>{EducationalData.DegreePercentage}</p>
          </div>
        </div>

        <div className="educational-data">
          <div className="keys">
            <h3>Department branch</h3>
            <h3>Start year</h3>
            <h3>End year</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{EducationalData.DepartmentBranch}</p>
            <p>{EducationalData.StartYear}</p>
            <p>{EducationalData.EndYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalDetails;
