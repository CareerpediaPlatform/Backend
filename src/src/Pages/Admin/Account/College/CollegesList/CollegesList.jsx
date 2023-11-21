import "./CollegesList.scss";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

//Components
import AllColleges from "./Components/AllColleges/AllColleges";

// Popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const CollegesList = () => {
  const { close } = useContext(SideBarContext);

  // Popup
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  // Creating New Recruiter
  let mailFormat =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const [recruiter, setRecruiter] = useState({
    email: "",
    password: "",
  });

  const { email, password } = recruiter;

  const generatePassword = (e) => {
    e.preventDefault();
    if (email == "") {
      return toast.error("please enter email first !");
    }
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }

    const length = 4;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const passwordArray = new Uint32Array(length);
    window.crypto.getRandomValues(passwordArray);

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(passwordArray[i] % charset.length);
    }

    setRecruiter({ ...recruiter, password: "careerpedia" + generatedPassword });
  };

  const handleEmailChange = (e) => {
    setRecruiter({ ...recruiter, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return toast.error("email required!");
    }
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }
    toast.success("New College Created !");
    console.log(college);
  };

  return (
    <div className="admin-colleges">
      <Sidebar />
      <div className="admin-colleges-content">
        <Navbar type="college" />
        <div
          className="college-list"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="recruiter-headings">
            <h3>All Colleges</h3>
            <Popup
              trigger={<button>Create New College</button>}
              modal
              onClose={closePopup} // Close the popup when clicked outside
            >
              {(close) => (
                <div className="recruiter-popup">
                  <button className="close-button" onClick={close}>
                    X
                  </button>
                  <form className="create-form">
                    <h3>Create Login</h3>

                    <div className="input-data">
                      <input
                        type="email"
                        placeholder="Email Id"
                        onChange={handleEmailChange}
                      />
                      <input
                        type="text"
                        value={recruiter.password}
                        readOnly
                        placeholder="Enter Password"
                        id="password"
                      />
                      <button
                        onClick={generatePassword}
                        className="generate-btn"
                      >
                        Generate Password
                      </button>
                    </div>
                    <button onClick={handleSubmit} className="submit-btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Popup>
          </div>
          <AllColleges />
        </div>
      </div>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Typography>{children}</Typography>}</div>;
}

export default CollegesList;
