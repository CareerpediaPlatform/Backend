import "./SingleRecruiterDetails.scss";
import { useState, useContext, forwardRef } from "react";
import { Link } from "react-router-dom";

// Sidebar and Navbar
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

//MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";

// Components
import BasicDetails from "./Components/BasicDetails/BasicDetails";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import CompanyDetails from "./Components/CompanyDetails/CompanyDetails";

// Icon
import backIcon from"../Assets/backIcon.png"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleRecruiterDetails = () => {
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
    <div className="admin-single-recruiters">
      <Sidebar />
      <div className="single-recruiter-content">
        <Navbar type="recruiter-profile" />
        <div
          className="single-recruiter-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="single-recruiter-profile">
            <div className="back">
              <Link to="/admin/recruiters">
                <img src={backIcon} alt="" />
              </Link>
            </div>
            <BasicDetails />
            <hr className="division" />
            <ContactDetails />
            <hr className="division" />
            <CompanyDetails />

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

export default SingleRecruiterDetails;
