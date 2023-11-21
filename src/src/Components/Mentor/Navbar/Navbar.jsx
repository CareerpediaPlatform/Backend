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
        name: "Dashboard",
      };
      break;
    case "interviews":
      head = {
        name: "Interviews",
      };
      break;
    case "course":
      head = {
        name: "Course",
      };
      break;
    case "discussion":
      head = {
        name: "Discussions",
      };
      break;
    case "profile":
      head = {
        name: "Mentor Profile",
      };
      break;
    case "editProfile":
      head = {
        name: "Mentor Profile Edit",
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
