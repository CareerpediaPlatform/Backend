import "./EditProfile.scss";
import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import EducationalDetails from "./Components/EducationalDetails/EducationalDetails";
import WorkExperience from "./Components/WorkExperience/WorkExperience";
import MentorProfile from "./Components/MentorProfile/MentorProfile";
import TaskBar from "../../../../Components/TaskBar/TaskBar";

// Image
import backIcon from "../Assets/backIcon.png";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { close } = useContext(SideBarContext);

  // data
  const [allData, setAllData] = useState();
  const {
    personalDetails,
    educationDetails,
    contactDetails,
    experienceDetails,
  } = useSelector((state) => state.progBar);

  // tracker Headings
  const personalHeadings = {
    heading: "Personal Details",
    para: "Lorem consectetur adipiscing elit.",
  };
  const contactHeadings = {
    heading: "Contact Details",
    para: "Lorem consectetur adipiscing elit.",
  };
  const educationHeadings = {
    heading: "Education Details",
    para: "Lorem consectetur adipiscing elit.",
  };
  const experienceHeadings = {
    heading: "Work Experience",
    para: "Lorem consectetur adipiscing elit.",
  };

  return (
    <div className="mentor-edit-profile">
      <Sidebar />
      <div className="edit-profile-content">
        <Navbar type="editProfile" />
        <div
          className="edit-profile-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="edit-profile-components">
            <div className="edit-profile-components-left">
              {/* back button */}
              <Link to="../profile">
                <div className="back-btn">
                  <img src={backIcon} alt="backIcon" />
                </div>
              </Link>
              <MentorProfile />
              <div className="taskBars">
                <TaskBar
                  users={{ ...personalHeadings }}
                  length={personalDetails}
                />
                <TaskBar
                  users={{ ...contactHeadings }}
                  length={contactDetails}
                />
                <TaskBar
                  users={{ ...educationHeadings }}
                  length={educationDetails}
                />
                <TaskBar
                  users={{ ...experienceHeadings }}
                  length={experienceDetails}
                />
              </div>
            </div>
            <div className="edit-profile-components-right">
              <PersonalDetails setAllData={setAllData} allData={allData} />
              <ContactDetails setAllData={setAllData} allData={allData} />
              <EducationalDetails setAllData={setAllData} allData={allData} />
              <WorkExperience setAllData={setAllData} allData={allData} />
              <div className="buttons">
                <button id="save">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
