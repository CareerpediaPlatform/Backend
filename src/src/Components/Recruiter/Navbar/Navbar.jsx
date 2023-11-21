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
        name: "Recruiter Dashboard",
      };
      break;
      case "candidate":
        head = {
          name: "Candidates",
        };
        break;
  
    case "jobs":
      head = {
        name: "Jobs",
      };
      break;

    case "profile":
      head = {
        name: "Company Profile",
      };
      break;
      case "student-profile":
        head = {
          name: "Student Profile",
        };
        break;
    case "edit-profile":
      head = {
        name: "Company Edit Profile",
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
