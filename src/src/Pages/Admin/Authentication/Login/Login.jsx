import "./Login.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";

//MUI
import {
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

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = admin;

  const [showPassword, setShowPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
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
    }
    setAdmin({
      email: "",
      password: "",
    });
  };

  return (
    <div className="admin-page">
      <AuthLeftSide />
      <div className="admin-part2">
        <div className="admin-form">
          <div className="admin-heading">
            <h2>Sign in to your Account</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <div className="admin-input">
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              className="email-field"
              name="email"
              value={admin.email}
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
                value={admin.password}
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
          </div>

          <div className="admin-button">
            <button onClick={handleSubmit}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
