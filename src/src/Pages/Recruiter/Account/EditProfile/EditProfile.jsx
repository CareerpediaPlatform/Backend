import "./EditProfile.scss";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

// Sidebar and Navbar
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import RecruiterProfile from "./Components/RecruiterProfile/RecruiterProfile";
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CompanyDetails from "./Components/CompanyDetails/CompanyDetails";
import TaskBar from "../../../../Components/TaskBar/TaskBar";

// img
import backIcon from "../Assets/backIcon.png";

const EditProfile = () => {
  const [allData, setAllData] = useState();
  const { close } = useContext(SideBarContext);

  // tracker Headings
  const basicDetailsHeadings = {
    heading: "Basic Details",
    para: "Lorem consectetur adipiscing elit.",
  };
  const contactHeadings = {
    heading: "Contact Details",
    para: "Lorem consectetur adipiscing elit.",
  };
  const collegeDetailsHeadings = {
    heading: "Company Details",
    para: "Lorem consectetur adipiscing elit.",
  };

  // redux
  const { basicDetails, collegeDetails, contactDetails } = useSelector(
    (state) => state.progBar
  );
  return (
    <div className="college-EditProfile">
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
              <RecruiterProfile />
              <div className="taskBars">
                <TaskBar
                  users={{ ...basicDetailsHeadings }}
                  length={basicDetails}
                />
                <TaskBar
                  users={{ ...contactHeadings }}
                  length={contactDetails}
                />
                <TaskBar
                  users={{ ...collegeDetailsHeadings }}
                  length={collegeDetails}
                />
              </div>
            </div>
            <div className="edit-profile-components-right">
              <BasicDetails setAllData={setAllData} allData={allData} />
              <ContactDetails setAllData={setAllData} allData={allData} />
              <CompanyDetails setAllData={setAllData} allData={allData} />
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
