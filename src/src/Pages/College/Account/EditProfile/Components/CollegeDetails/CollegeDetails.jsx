import { useEffect, useState } from "react";
import "./CollegeDetails.scss";
import { useDispatch } from "react-redux";
import { Counter } from "../Counter";
import { collegeDetailsProgress } from "../../../../../../redux/editProgressBar";

const CollegeDetails = ({ allData, setAllData, progress }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  // onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      let leng = Counter(data);
      dispatch(collegeDetailsProgress(leng * 16.66666));
      setAllData({ ...allData, ...data });
    }
  }, [data]);
  return (
    <div className="edit-collegeDetails">
      <div className="edit-collegeDetails-heading">
        <h2>College Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="edit-collegeDetails-fields">
        <div className="edit-collegeDetails-fields-field">
          <label>Accreditation</label>
          <input
            type="text"
            placeholder="Enter college accreditation"
            name="accreditation"
            onChange={handleChange}
          />
        </div>
        <div className="edit-collegeDetails-fields-field">
          <label>College Code</label>
          <input
            type="text"
            placeholder="Enter college Code"
            name="CollegeCode"
            onChange={handleChange}
          />
        </div>

        <div className="edit-collegeDetails-fields-field">
          <label>Number of Students</label>
          <input
            type="number"
            id="phone-number"
            placeholder="Enter number of students"
            name="numberOfStudents"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="edit-collegeDetails-fields-field">
          <label>Departments</label>
          <input
            type="text"
            placeholder="Enter department"
            name="departments"
            onChange={handleChange}
          />
        </div>

        <div className="edit-collegeDetails-fields-field">
          <label>Start Year</label>
          <input
            type="date"
            id="pure-date"
            aria-describedby="date-design-prepend"
            name="startYear"
            onChange={handleChange}
          />
        </div>

        <div className="edit-collegeDetails-fields-field">
          <label>Current Year</label>
          <input
            type="date"
            id="pure-date"
            aria-describedby="date-design-prepend"
            name="endYear"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
