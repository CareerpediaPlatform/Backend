import "./ChangePassword.scss";
import { useState } from "react";

// Material UI
import { OutlinedInput, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthLeftSide from "../../../../Components/AuthLeftSide/AuthLeftSide";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      const person = {
        newPassword,
      };
      console.log(person);
    } else {
      alert("Invalid!");
    }
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="main-container">
      <AuthLeftSide />
      <div className="form_container">
        <div className="form_Subcontainer">
          <div className="textContainer">
            <h2 className="heading_setPassword">Set Your Password</h2>
            <span className="text">Welcome back! please enter your detail</span>
          </div>
          <div className="input_container">
            <FormControl variant="outlined" className="signin-input">
              <InputLabel htmlFor="outlined-adornment-email">
                Enter New password
              </InputLabel>
              <OutlinedInput
                name="password"
                type={"Password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                id="outlined-adornment-email"
                label="Enter New password"
                className="input_password"
                placeholder="Enter New password"
              />
            </FormControl>

            <FormControl variant="outlined" className="signin-input">
              <InputLabel htmlFor="outlined-adornment-password">
                Re-Enter Password
              </InputLabel>
              <OutlinedInput
                name="password"
                className="input_password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Re-Enter Password"
                label="Re-Enter Password"
              />
            </FormControl>
          </div>
          <button className="sign_button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
