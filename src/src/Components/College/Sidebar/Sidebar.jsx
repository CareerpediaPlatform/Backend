import { useContext } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

// styled component
import {
  SideBarContainer,
  TopWrapper,
  ProfileData,
  SideBarButton,
  ProfileImg,
} from "../../Student/Sidebar/SidebarStyle";

// icons
import dashboardDark from "../../Assets/dashboardDark.png";
import dashboardGrey from "../../Assets/dashboardGrey.png";
import studentDark from "../../Assets/studentDark.png";
import studentGrey from "../../Assets/studentGrey.png";
import jobDark from "../../Assets/jobDark.png";
import jobGrey from "../../Assets/jobGrey.png";
import logoutGrey from "../../Assets/logout.png";

import logoImg from "../../Assets/logoImg.png";
import userImg from "../../Assets/Image.png";
import logo from "../../Assets/logo.png";

// Context
import { SideBarContext } from "../../../Context/SidebarContext";

// MUI
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Sidebar = () => {
  const { close, handleSidebarView } = useContext(SideBarContext);

  // changing image src
  const location = useLocation();
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const listOne = [
    {
      icon: (
        <NavLink to="/college/dashboard">
          <img
            src={
              isActiveLink("/college/dashboard") ? dashboardDark : dashboardGrey
            }
            alt="Dashboard"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/college/dashboard"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Dashboard
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/college/students">
          <img
            src={isActiveLink("/college/students") ? studentDark : studentGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/college/students"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Students
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/college/jobs">
          <img
            src={isActiveLink("/college/jobs") ? jobDark : jobGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/college/jobs"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Jobs
        </NavLink>
      ),
    },
  ];

  const listTwo = [
    {
      icon: (
        <NavLink to="/student/login">
          <img src={logoutGrey} alt="Image" />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/login"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Logout
        </NavLink>
      ),
    },
  ];

  return (
    <SideBarContainer close={close ? "true" : undefined}>
      <TopWrapper close={close ? "true" : undefined}>
        <Link to="/" className="logo">
          {close ? <img src={logo} alt="" /> : <img src={logoImg} alt="" />}
        </Link>

        <Link to="/college/profile" className="profile-navigation">
          <ProfileData close={close ? "true" : undefined}>
            <div className="user">
              <img src={userImg} alt="" />
              <p>Katie Pena</p>
            </div>
          </ProfileData>

          <ProfileImg close={close ? "true" : undefined}>
            <img src={userImg} alt="" />
          </ProfileImg>
        </Link>

        <div className="sidebar-top">
          {listOne.map((item, index) => {
            const { name, icon } = item;
            return (
              <div className="icon-list" key={index}>
                <p>{icon}</p>
                <p className="icon-name">{name}</p>
              </div>
            );
          })}
        </div>
      </TopWrapper>
      <div className="sidebar-bottom">
        {listTwo.map((item, index) => {
          const { name, icon } = item;
          return (
            <div className="icon-list" key={index}>
              <p>{icon}</p>
              <p className="icon-name">{name}</p>
            </div>
          );
        })}
      </div>

      <SideBarButton onClick={handleSidebarView} close={close ? "true" : undefined}>
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 18 }} />
      </SideBarButton>
    </SideBarContainer>
  );
};

export default Sidebar;
