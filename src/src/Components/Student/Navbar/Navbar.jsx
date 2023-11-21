import { useContext } from "react";

//Context
import { SideBarContext } from "../../../Context/SidebarContext";

// images
import notification from "../../Assets/notification.png";

// style component
import { NavbarDiv } from "./NavbarStyle";

const Navbar = ({ type }) => {
  let head;
  const { close } = useContext(SideBarContext);

  switch (type) {
    case "dashboard":
      head = {
        name: "Student Dashboard",
      };
      break;
    case "basic-course":
      head = {
        name: "Basic Course",
      };
      break;

    case "csep":
      head = {
        name: "CSEP",
      };
      break;
    case "csap":
      head = {
        name: "CSAP",
      };
      break;
    case "jobs":
      head = {
        name: "Job",
      };
      break;
    case "refer":
      head = {
        name: "Refer & Earn",
      };
      break;
    case "support":
      head = {
        name: "Support",
      };
      break;
    case "interview":
      head = {
        name: "Interviews",
      };
      break;
    case "profile":
      head = {
        name: "Student Profile",
      };
      break;
    case "edit-profile":
      head = {
        name: "Student Edit Profile",
      };
      break;
    case "exams":
      head = {
        name: "Exams",
      };
      break;
    case "bookSlot":
      head = {
        name: "Book a slot",
      };
      break;

    default:
      break;
  }

  return (
    <NavbarDiv close={close ? "true" : undefined}>
      <div className="nav-head">
        <h2>{head.name}</h2>
      </div>
      <div className="notification">
        <img src={notification} alt="" />
      </div>
    </NavbarDiv>
  );
};

export default Navbar;
