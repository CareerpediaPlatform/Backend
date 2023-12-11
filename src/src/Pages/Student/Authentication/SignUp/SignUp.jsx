import "./SignUp.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

//Images
import SignUpImg1 from "../Assets/google.png";
import SignUpImg2 from "../Assets/linkedin.png";
// 
import { useRegesterStudentMutation } from "../../../../redux/Apis/Student/studentSlice";

// MUI
import {
  Divider,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Checkbox,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

//Global Components
import AuthLeftSide from "../../../../Components/AuthLeftSide/AuthLeftSide";

// Redux
import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  const [regesterStudent,{ isLoading: isLoggingIn}]=useRegesterStudentMutation()
  // Get User details from form
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber:"9999222229",
    role:"student"
  });
  const { firstName, lastName, email, password } = user;
  // redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { User, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || User) {
      navigate("/");
    }
  }, [User, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async(e) => {
    let mailformat =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // Define the password validation criteria using regular expressions
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;


    // first name validation
    const fnameRegex = /^[a-zA-z]{3,}$/;
    e.preventDefault();
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === ""
    ) {
      return toast.error("All Fields Required !");
    }

    if (!firstName.match(fnameRegex)) {
      return toast.error(
        "A minimum 3 characters name contains a combination only characters"
      );
    }
    // last name validation
    const lnameRegex = /^[a-zA-z]{1,}$/;
    e.preventDefault();
    if (!lastName.match(lnameRegex)) {
      return toast.error(
        "A minimum 1 characters name contains a combination only characters"
      );
    }
    // email validation
    if (!email.match(mailformat)) {
      return toast.error("Invalid email !");
    }

    //  password validation
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be between 8 and 15 characters, & include at least one uppercase letter, one lowercase letter, & one number & special char ." );
    } else {
      toast.success("validation is passed");
      const response=await regesterStudent({...user})
      console.log(response)
    }
  };

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="SignUp-Container">
      <AuthLeftSide />

      <div className="SignUpForm">
        <div className="form-container">
          <h3 className="SigUp-Heading">Sign Up for an Account</h3>
          <div className="input-data">
            <div className="names">
              <TextField
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                id="outlined-adornment-name"
                label="First Name"
                placeholder="First Name"
                className="name-input"
                variant="outlined"
              />
              <TextField
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                id="outlined-adornment-name"
                label="Last Name"
                placeholder="Last Name"
                className="name-input"
                variant="outlined"
              />
            </div>
            <TextField
              name="email"
              value={user.email}
              onChange={handleChange}
              id="outlined-adornment-email"
              label="Email Id"
              placeholder="Email Id"
              className="email-input"
            />

            <FormControl variant="outlined" className="password-filed">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                value={user.password}
                onChange={handleChange}
                className="password-input"
                type={showPassword ? "text" : "password"}
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
                placeholder="Password"
              />
            </FormControl>
          </div>

          <div className="SigUp-Checkbox">
            <Checkbox required sx={{ color: "#E2E8F0" }} />
            <p id="Checkbox-Para">
              By creating an account means, you agree to the{" "}
              <span className="Checkbox">Terms & Conditions </span>and our{" "}
              <span className="Checkbox"> Privacy Policy</span>
            </p>
          </div>

          <button className="SignUp-Button" onClick={handleSubmit}>
            Sign Up
          </button>

          <Divider className="FormControl">
            <p>Or Sign up With</p>
          </Divider>

          <div id="SignUp-Media">
            <button id="btn1">
              <img src={SignUpImg1} alt="" />
              Google
            </button>

            <button id="btn2">
              <img src={SignUpImg2} alt="" />
              LinkedIn
            </button>
          </div>

          <p className="SignUp-text">
            Already have an account?{" "}
            <Link className="text-blue" to="/student/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
