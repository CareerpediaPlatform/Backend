import "./Otp.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";

//Global Components
import AuthLeftSide from "../../../../Components/AuthLeftSide/AuthLeftSide"


const Otp = () => {

  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const [otp, setOtp] = useState(null);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtpArray([
      ...otpArray.map((d, idx) => (idx === index ? element.value : d)),
    ]);
    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    if (!otp && otp === "" && otp <= 3) {
      return toast.error("invalid otp!");
    }
    setOtp({ otp: otpArray.join("") });
    console.log(otp);
  };
  return (
    <div id="Otp-Container">
      <AuthLeftSide />
      <div className="Otp-Form">
        <div className="Otp-Sub-Form">
          <div className="Otp-Headings">
            <h3 id="Otp-head">Enter OTP</h3>
            <small id="Otp-para">Please enter valid OTP</small>
          </div>

          <div className="Otp-Form-Input">
            <div className="Otp-Input">
              {otpArray.map((data, index) => {
                return (
                  <input
                    className="otp-field"
                    type="text"
                    name="otpArray"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
            <div className="resend">
              <button>Resend OTP</button>
            </div>
          </div>

          <div className="Otp-Form-Buttons">
            <button id="Otp-Button" onClick={handleSubmit}>
              Sumbit OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
