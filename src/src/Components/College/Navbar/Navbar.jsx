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
        name: "College Admin",
      };
      break;
    case "students":
      head = {
        name: "Students",
      };
      break;
      case "student-profile":
        head = {
          name: "Student Profile",
        };
        break;
    case "jobs":
      head = {
        name: "Jobs",
      };
      break;
    case "profile":
      head = {
        name: "College Profile",
      };
      break;
    case "editProfile":
      head = {
        name: "College Profile Edit",
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
