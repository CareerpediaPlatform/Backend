import "./SingleStudentDetails.scss";
import { useState, useContext, forwardRef } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Components
import StudentProfile from "../../../../../Components/StudentProfile/StudentProfile";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

const SingleStudentDetails = () => {
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
    <div className="admin-single-student">
      <Sidebar />
      <div className="single-student-content">
        <Navbar type="student-profile" />
        <div
          className="single-student-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="single-student">
            <StudentProfile />
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

export default SingleStudentDetails;
