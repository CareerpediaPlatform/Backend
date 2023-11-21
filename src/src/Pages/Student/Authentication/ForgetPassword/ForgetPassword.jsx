import "./ForgetPassword.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// Material UI
import { OutlinedInput, InputLabel, FormControl } from "@mui/material";

//Global Components
import AuthLeftSide from "../../../../Components/AuthLeftSide/AuthLeftSide";

const ForgetPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const { email} = user;
  // const history = useHistory();
  let mailFormat =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const handleSubmit = () => {
    if (email === "") {
      return toast.error("Email required !");
    }
    
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }

    return toast.success("success !");
  };
  
  const isValidEmail = email.match(mailFormat);
  
  return (
    <div>
      {/* sign-in-page */}
      <div className="sign-in-page">
        {/* part-1 */}
        <AuthLeftSide />

        {/* part-2 */}
        <div className="form">
          <div className="forget-password">
            {/* sign -in account heading page*/}
            <div className="email-password">
              <h2>Forgot password</h2>
              <p>Welcome back! Please enter your details.</p>
            </div>
            {/* username and password */}
            <div className="user-inputs">
              <FormControl variant="outlined" className="password-input">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  label="Email"
                  className="input_password"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
              </FormControl>
            </div>

            {isValidEmail ? (
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
    </div>
  );
};

export default ForgetPassword;
