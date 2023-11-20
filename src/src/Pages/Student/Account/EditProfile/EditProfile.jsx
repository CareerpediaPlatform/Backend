import "./EditProfile.scss";
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../../../Context/SidebarContext";
import StudentImage from "./Components/StudentImage/StudentImage";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import EducationDetails from "./Components/EducationDetails/EducationDetails";
import WorkExperience from "./Components/WorkExperience/WorkExperience";

// image
import uploadIcon from "../Assets/cloudUpload.png";

import TaskBar from "../../../../Components/TaskBar/TaskBar";
import { useSelector, useDispatch } from "react-redux";
const styles = {
  input: {
    opacity: "0%",
    position: "absolute",
  },
};

const handleChange = ()=>{
  console.log("cv uploaded")
}

const EditProfile = () => {
  const { close } = useContext(SideBarContext);
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

  // data
  const [allData, setAllData] = useState();

  //
  const {
    personalDetails,
    educationDetails,
    contactDetails,
    experienceDetails,
  } = useSelector((state) => state.progBar);

  return (
    <div className="student-EditProfile">
      <Sidebar />
      <div className="edit-profile-content">
        <Navbar type="edit-profile" />
        <div
          className="edit-profile-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="edit-profile-components">
            <div className="edit-profile-components-left">
              <StudentImage />
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
              <EducationDetails setAllData={setAllData} allData={allData} />
              <WorkExperience setAllData={setAllData} allData={allData} />
              <div className="buttons">
                <button>
                  <img src={uploadIcon} alt="icon" />
                  <p>Upload CV</p>
                  <input
                    type="file"
                    name="CV"
                    onChange={handleChange}
                    style={styles.input}
                  />
                </button>
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
