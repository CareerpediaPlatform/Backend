import './PhoneNumber.scss';
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

//MUI
import {TextField} from "@mui/material";

//Global Components
import AuthLeftSide from '../../../../Components/AuthLeftSide/AuthLeftSide';

const PhoneNumber = () => {
  const [studentMobile, setStudentMobile] = useState({
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentMobile({ ...studentMobile, [name]: value });
  };

  const { phoneNumber } = studentMobile;

  const handleSubmit = () => {
    if (phoneNumber === "") {
      return toast.error("Phone Number required !");
    }
    
    if (phoneNumber.length!=10){
      return toast.error("Invalid Phone Number !");
    }

    return toast.success("Success !");
  };

  const isValidNumber = phoneNumber.length==10;

  return (
    <div className="phone-number-page">
      <AuthLeftSide/>

      <div className="phone-number-part2">
        <div className="phone-number-form">
          <div className="Phone-number-heading">
            <h2>Mobile Number</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <div className="Phone-number-input">
            <TextField
              id="outlined-basic"
              label="Mobile Number"
              variant="outlined"
              type="number"
              placeholder="Mobile Number"
              onChange={handleChange}
              name="phoneNumber"
              className="number-field"
              value={phoneNumber}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
          </div>         
            {isValidNumber ? (
              <Link to="/student/otp" className="sign_button" onClick={handleSubmit}>
                Send OTP
              </Link>
            ) : (
              <button className="sign_button" onClick={handleSubmit}>
                Send OTP
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default PhoneNumber;
