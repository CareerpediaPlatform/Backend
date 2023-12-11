import "../BasicDetails/BasicDetails.scss"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Counter } from "../Counter";

import { collegeDetailsProgress } from "../../../../../../redux/editProgressBar";

const CompanyDetails = ({ allData, setAllData, progress }) => {
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
    <div className="edit-Details">
      <div className="edit-Details-heading">
        <h2>Company Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="input-fields">
        <div className="field">
          <label>Establish Year</label>
          <input
            type="number"
            placeholder="Enter Establish Year"
            name="accreditation"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Current Year</label>
          <input
            type="text"
            placeholder="Enter Current Year"
            name="deemed"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Number of Employees</label>
          <input
            type="number"
            id="phone-number"
            placeholder="Enter number of employees"
            name="numberOfStudents"
            autocomplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Departments</label>
          <input
            type="text"
            placeholder="Enter department"
            name="departments"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Annual Income</label>
          <input
            type="text"
            placeholder="Enter Annual Income"
            name="endYear"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
