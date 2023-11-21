import "./SignIn.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

// images
import Google from "../Assets/google.png";
import LinkedIn from "../Assets/linkedin.png";

//MUI
import {
  Divider,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//Global Components
import AuthLeftSide from "../../../../Components/AuthLeftSide/AuthLeftSide";
import { useLoginStudentMutation } from "../../../../redux/Apis/Student/studentSlice";

const SignIn = () => {
  const [loginStudent] = useLoginStudentMutation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    let mailFormat =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // Define the password validation criteria using regular expressions
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;

    e.preventDefault();
    // email validation
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }

    //  password validation
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be between 8 and 15 characters, & include at least one uppercase letter, one lowercase letter, & one number & special char ."
      );
    } else {
      toast.success("validation is passed");
      const response = await loginStudent({ ...user });
    }
    setUser({
      email: "",
      password: "",
    });
  };

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="student-page">
      <AuthLeftSide />
      <div className="student-part2">
        <div className="student-form">
          <div className="student-heading">
            <h2>Sign in to your Account</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <div className="student-input">
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              className="email-field"
              name="email"
              value={user.email}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            /> 
            <Tooltip title="Password must be greater than characters including special character" arrow>
              <FormControl
                variant="outlined"
                placeholder="Password"
                className="password-field"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="input-field"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Tooltip>
            <div className="forget-password">
              <Link to="/student/forget-password">Forgot Password?</Link>
            </div>
          </div>

          <div className="student-button">
            <button onClick={handleSubmit}>Sign In</button>
          </div>

          <Divider className="divider">
            <Link to="/student/phone-number" className="dividerLink">
              Or sign in with Mobile Number
            </Link>
          </Divider>
          <div className="SignIn-Media">
            <button className="btn1" variant="outlined">
              <img src={Google} alt="" />
              <span>Google</span>
            </button>

            <button className="btn2" variant="outlined">
              <img src={LinkedIn} alt="" />
              <span>LinkedIn</span>
            </button>
          </div>

          <p className="student-span">
            Don't have an account?
            <Link to="/student/signup" id="sign-in-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
