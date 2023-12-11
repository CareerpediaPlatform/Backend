import "./SingleMentorDetails.scss";
import { useState, useContext, forwardRef } from "react";
import { Link } from "react-router-dom";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

//MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

// Components
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import EducationalDetails from "./Components/EducationalDetails/EducationalDetails";
import WorkExperience from "./Components/WorkExperience/WorkExperience";

// Icon
import backIcon from "./Assets/backIcon.png";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleMentorDetails = () => {
  const { close } = useContext(SideBarContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event === true) {
      console.log("your access is removed !");
      setOpen(false);
    } else if (event === false) {
      console.log("your access is safe !");
      setOpen(false);
    }
  };
  return (
    <div className="admin-single-mentors">
      <Sidebar />
      <div className="single-mentor-content">
        <Navbar type="mentor-profile" />
        <div
          className="single-mentor-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="single-mentor-profile">
            <div className="back">
              <Link to="/admin/mentors">
                <img src={backIcon} alt="" />
              </Link>
            </div>
            <PersonalDetails />
            <hr className="division" />
            <ContactDetails />
            <hr className="division" />
            <EducationalDetails />
            <hr className="division" />
            <WorkExperience />
            <div className="remove-access">
              <Button variant="outlined" onClick={handleClickOpen}>
                <span>Remove Access</span>
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                className="dialog-button"
              >
                <DialogContent>
                  <DialogContentText className="dialog-content">
                    <span>Do you want to remove this Account ?</span>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(true)}>Yes</Button>
                  <Button onClick={() => handleClose(false)}>No</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMentorDetails;
