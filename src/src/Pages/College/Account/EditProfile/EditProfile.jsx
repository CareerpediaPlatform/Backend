import "./EditProfile.scss"
import Navbar from "../../../../Components/College/Navbar/Navbar";
import Sidebar from "../../../../Components/College/Sidebar/Sidebar";
import { useContext,useState } from "react";
import { SideBarContext } from "../../../../Context/SidebarContext"
import CollegeImage from "./Components/CollegeImage/CollegeImage";
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CollegeDetails from "./Components/CollegeDetails/CollegeDetails";
import { Link } from "react-router-dom";

// img
import backIcon from "../Assets/backIcon.png"
import TaskBar from "../../../../Components/TaskBar/TaskBar";
import { useSelector } from "react-redux";


const EditProfile = () => {
  const [allData,setAllData]=useState()
  const {close} = useContext(SideBarContext);

// tracker Headings
const basicDetailsHeadings={heading:"Basic Details",para:"Lorem consectetur adipiscing elit."}
const contactHeadings={heading:"Contact Details",para:"Lorem consectetur adipiscing elit."}
const collegeDetailsHeadings={heading:"College Details",para:"Lorem consectetur adipiscing elit."}

// redux
  //
  const {  basicDetails,
    collegeDetails,
    contactDetails
     } = useSelector(
    (state) => state.progBar
  );
  return (
    <div className="college-EditProfile">
    <Sidebar />
    <div className="edit-profile-content" >
      <Navbar type="editProfile" />
      <div className="edit-profile-data" style={{width: close ? "95vw":"85vw", marginLeft: close ?"5vw" : "15vw"}}>
        <div className="edit-profile-components">
        <div className="edit-profile-components-left">
    
        <CollegeImage />
        <div className="taskBars">
        <TaskBar users={{...basicDetailsHeadings}} length={basicDetails} />
        <TaskBar users={{...contactHeadings}} length={contactDetails}  />
        <TaskBar users={{...collegeDetailsHeadings}} length={collegeDetails} />
        </div>
        </div>
        <div className="edit-profile-components-right">
      <BasicDetails setAllData={setAllData} allData={allData}/>
      <ContactDetails  setAllData={setAllData} allData={allData}/>
      <CollegeDetails  setAllData={setAllData} allData={allData}/>
      <div className="buttons">
            <button id="save">Save</button>
        </div>
        </div>
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditProfile