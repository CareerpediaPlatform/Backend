import "./PersonalDetails.scss";
// reduce
import { useSelector, useDispatch } from "react-redux";
import { personalProgress } from "../../../../../../redux/editProgressBar";
import { Counter } from "../Counter";
import { useEffect, useState } from "react";

const PersonalDetails = ({ setAllData, allData }) => {
  const [data, setData] = useState();
  //
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data) {
      let leng = Counter(data);
      dispatch(personalProgress(leng * 16.6666667));
      setAllData({ ...allData, ...data });
    }
  }, [data]);
  return (
    <div className="edit-personalDetails">
      <div className="edit-personalDetails-heading">
        <h2>Personal Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="edit-personalDetails-fields">
        <div className="edit-personalDetails-fields-field">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="edit-personalDetails-fields-field">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="edit-personalDetails-fields-field">
          <label>Email Id</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="edit-personalDetails-fields-field">
          <label>Date Of Birth</label>
          <input
            type="date"
            id="pure-date"
            aria-describedby="date-design-prepend"
            name="dateOfBirth"
            onChange={handleChange}
          />
        </div>

        <div className="edit-personalDetails-fields-field">
        <label>Gender</label>
          <select name="gender" id="gender"  onChange={handleChange}>
            <option value="Select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="edit-personalDetails-fields-field">
          <label>Registered Mobile Number</label>
          <input
            type="number"
            id="phone-number"
            placeholder="Enter your mobile number"
            name="mobileNumber"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="edit-personalDetails-fields-field">
          <label>LinkedIn Profile</label>
          <input
            type="text"
            placeholder="Enter your LinkedIn Url"
            name="linkedIn"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
