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
import interviewDark from "../../Assets/interviewDark.png";
import interviewGrey from "../../Assets/interviewGrey.png";
import courseDark from "../../Assets/courseDark.png";
import courseGrey from "../../Assets/courseGrey.png";
import logoutGrey from "../../Assets/logout.png";
import supportGrey from "../../Assets/supportGrey.png";
import supportDark from "../../Assets/supportDark.png";

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
        <NavLink to="/mentor/dashboard">
          <img
            src={
              isActiveLink("/mentor/dashboard") ? dashboardDark : dashboardGrey
            }
            alt="Dashboard"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/mentor/dashboard"
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
        <NavLink to="/mentor/interviews">
          <img
            src={isActiveLink("/mentor/interviews") ? interviewDark : interviewGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/mentor/interviews"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Interviews
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/mentor/course">
          <img
            src={
              isActiveLink("/mentor/course")
                ? courseDark
                : courseGrey
            }
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/mentor/course"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Courses
        </NavLink>
      ),
    },   
    {
      icon: (
        <NavLink to="/mentor/discussions">
          <img
            src={
              isActiveLink("/mentor/discussions")
                ? supportDark
                : supportGrey
            }
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/mentor/discussions"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Discussions
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

        <Link to="/mentor/profile" className="profile-navigation">
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
