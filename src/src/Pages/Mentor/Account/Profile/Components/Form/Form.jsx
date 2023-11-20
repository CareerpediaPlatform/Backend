import "./Form.scss";
import { useState } from "react";

//input-field
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [secondPassword, setSecondPassword] = useState(false);
  const handleClickSecondPassword = () => {
    setSecondPassword(!secondPassword);
  };
  return (
    <div className="form">
      <FormControl variant="outlined" className="password-field">
        <InputLabel htmlFor="outlined-adornment-password">
          Old Password
        </InputLabel>
        <OutlinedInput
          name="password"
          className="input-field"
          // value={confirmPassword}
          // onChange={handleConfirmPasswordChange}
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
          placeholder="Old Password"
          label="Old Password"
        />
      </FormControl>

      <FormControl variant="outlined" className="password-field">
        <InputLabel htmlFor="outlined-adornment-password">
          New Password
        </InputLabel>
        <OutlinedInput
          name="password"
          className="input-field"
          // value={confirmPassword}
          // onChange={handleConfirmPasswordChange}
          id="outlined-adornment-password"
          type={secondPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickSecondPassword}
                edge="end"
              >
                {secondPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="New Password"
          label="New Password"
        />
      </FormControl>
      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default Form;
