import { useContext } from "react";

//Context
import { SideBarContext } from "../../../Context/SidebarContext";

// images
import notification from "../../Assets/notification.png";

// style component
import { NavbarDiv } from "../../Student/Navbar/NavbarStyle";

const Navbar = ({ type }) => {
  let head;
  const { close } = useContext(SideBarContext);

  switch (type) {
    case "dashboard":
      head = {
        name: "Careerpedia Admin",
      };
      break;
    case "college":
      head = {
        name: "Colleges",
      };
      break;
    case "college-profile":
      head = {
        name: "College Admin Profile",
      };
      break;
    case "student":
      head = {
        name: "Students",
      };
      break;
    case "student-profile":
      head = {
        name: "Student Profile",
      };
      break;
    case "mentor":
      head = {
        name: "Mentors",
      };
      break;
    case "mentor-profile":
      head = {
        name: "Mentor Profile",
      };
      break;
    case "recruiter":
      head = {
        name: "Recruiters",
      };
      break;
    case "recruiter-profile":
      head = {
        name: "Recruiter Profile",
      };
      break;
    case "course":
      head = {
        name: "Courses",
      };
      break;
    case "job":
      head = {
        name: "Jobs",
      };
      break;
    case "interview":
      head = {
        name: "Interviews",
      };
      break;
    case "preview":
      head = {
        name: "Course Preview",
      };
      break;
    case "payment":
      head = {
        name: "Payment Details",
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
