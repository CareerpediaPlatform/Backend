import { useEffect, useState } from "react";
import "./ContactDetails.scss";
import { useDispatch } from "react-redux";
import { Counter } from "../Counter";
import { contactProgress } from "../../../../../../redux/editProgressBar";

const ContactDetails = ({ allData, setAllData }) => {
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
      dispatch(contactProgress(leng * 16.66666));
      setAllData({ ...allData, ...data });
    }
  }, [data]);
  return (
    <div className="edit-contactDetails">
      <div className="edit-contactDetails-heading">
        <h2>Contact Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="edit-contactDetails-fields">
        <div className="edit-contactDetails-fields-field">
          <label>Address Line</label>
          <input
            type="text"
            placeholder="Enter your address line"
            name="addressLine"
            onChange={handleChange}
          />
        </div>
        <div className="edit-contactDetails-fields-field">
          <label>City</label>
          <input
            type="text"
            placeholder="Enter your city"
            name="city"
            onChange={handleChange}
          />
        </div>

        <div className="edit-contactDetails-fields-field">
          <label>District</label>
          <input
            type="text"
            placeholder="Enter your district"
            name="district"
            onChange={handleChange}
          />
        </div>

        <div className="edit-contactDetails-fields-field">
          <label>State</label>
          <input
            type="text"
            placeholder="Enter your state"
            name="state"
            onChange={handleChange}
          />
        </div>

        <div className="edit-contactDetails-fields-field">
          <label>Pin code</label>
          <input
            type="number"
            id="phone-number"
            placeholder="Enter your Pin code"
            autoComplete="off"
            name="pinCode"
            onChange={handleChange}
          />
        </div>

        <div className="edit-contactDetails-fields-field">
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter your country"
            name="country"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
