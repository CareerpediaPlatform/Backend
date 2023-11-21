import "./MentorsList.scss";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

//Components
import AllMentors from "./Components/AllMentors/AllMentors";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

// Popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const MentorsList = () => {
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

  const handleEmailChange = (e) => {
    setRecruiter({ ...recruiter, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (email === "" && password === "") {
    //   return toast.error("email and password required!");
    // }
    // if (password === "") {
    //   return toast.error("please generate password first !");
    // }
    if (email === "") {
      return toast.error("email required!");
    }
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }
    toast.success("New Mentor Created !");
  };

  // Changing dropdown options

  const [typeValue, setTypeValue] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setTypeValue(selectedOption);

    if (selectedOption === "csap") {
      setCourseOptions(["GRE", "TOFEL"]);
    } else if (selectedOption === "csep") {
      setCourseOptions(["Front-end", "Back-end", "UI/UX Designer", "Testing"]);
    } else {
      setCourseOptions(["Course"]);
    }
  };

  return (
    <div className="admin-mentors">
      <Sidebar />
      <div className="admin-mentors-content">
        <Navbar type="mentor" />
        <div
          className="mentor-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="mentor-headings">
            <h3>All Mentors</h3>
            <Popup
              trigger={<button>Create New Mentor</button>}
              modal
              onClose={closePopup} // Close the popup when clicked outside
            >
              {(close) => (
                <div className="mentor-popup">
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
                      <select
                        id="firstDropdown"
                        value={typeValue}
                        onChange={handleDropdownChange}
                        className="select"
                      >
                        <option value="" disabled>
                          Type
                        </option>
                        <option value="csap">CSAP</option>
                        <option value="csep">CSEP</option>
                      </select>
                      <select id="secondDropdown" className="select">
                        <option value="">Course</option>
                        {courseOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={handleSubmit} className="submit-btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Popup>
          </div>
          <AllMentors />
        </div>
      </div>
    </div>
  );
};

export default MentorsList;
