import "./SingleCollegeDetails.scss";

import { useState, useContext, forwardRef } from "react";
import { Link } from "react-router-dom";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";

// Icon
import backIcon from "./Assets/backIcon.png";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CollegeDetails from "./Components/CollegeDetails/CollegeDetails";

const SingleCollegeDetails = () => {
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
    <div className="admin-single-college">
      <Sidebar />
      <div className="single-college-content">
        <Navbar type="college-profile" />
        <div
          className="single-college-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="single-college">
            <div className="back">
            <Link to="/admin/colleges">
              <img src={backIcon} alt="" />
              </Link>
            </div>
            <div className="single-college-profile">
              <BasicDetails />
              <hr className="division" />
              <ContactDetails />
              <hr className="division" />
              <CollegeDetails />
            </div>
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

export default SingleCollegeDetails;
