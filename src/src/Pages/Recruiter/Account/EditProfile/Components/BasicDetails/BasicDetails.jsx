import { useEffect, useState } from "react";
import "./BasicDetails.scss";
import { useDispatch } from "react-redux";
import { Counter } from "../Counter";
import { basicDetailsProgress } from "../../../../../../redux/editProgressBar";

const BasicDetails = ({ allData, setAllData, progress }) => {
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
      dispatch(basicDetailsProgress(leng * 16.66666));
      setAllData({ ...allData, ...data });
    }
  }, [data]);
  return (
    <div className="edit-Details">
      <div className="edit-Details-heading">
        <h2>Basic Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="input-fields">
        <div className="field">
          <label>Company Name </label>
          <input
            type="text"
            placeholder="Enter your Company name "
            name="instituteName"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Founder Name</label>
          <input
            type="text"
            placeholder="Enter your founder name"
            name="founderName"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Email Id</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Mobile Number</label>
          <input
            type="number"
            id="phone-number"
            placeholder="Enter your mobile number"
            name="mobileNumber"
            autocomplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Website</label>
          <input
            type="text"
            placeholder="Enter your Website"
            name="website"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>LinkedIn Profile</label>
          <input
            type="text"
            placeholder="Enter your LinkedIn Url"
            name="linkedInUrl"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
