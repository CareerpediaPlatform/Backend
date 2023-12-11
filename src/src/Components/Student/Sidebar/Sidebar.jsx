import { useContext } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

// styled component
import {
  SideBarContainer,
  TopWrapper,
  ProfileData,
  SideBarButton,
  ProfileImg,
} from "./SidebarStyle";

// icons
import dashboardDark from "../../Assets/dashboardDark.png";
import dashboardGrey from "../../Assets/dashboardGrey.png";
import csapDark from "../../Assets/csapDark.png";
import csapGrey from "../../Assets/csapGrey.png";
import englishDark from "../../Assets/englishDark.png";
import englishGrey from "../../Assets/englishGrey.png";
import jobDark from "../../Assets/jobDark.png";
import jobGrey from "../../Assets/jobGrey.png";
import referDark from "../../Assets/referDark.png";
import referGrey from "../../Assets/referGrey.png";
import supportDark from "../../Assets/supportDark.png";
import supportGrey from "../../Assets/supportGrey.png";
import interviewDark from "../../Assets/interviewDark.png";
import interviewGrey from "../../Assets/interviewGrey.png";
import logoutGrey from "../../Assets/logout.png";

import logoImg from "../../Assets/logoImg.png";
import userImg from "../../Assets/Image.png";
import points from "../../Assets/points.png";
import level from "../../Assets/level.png";
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
        <NavLink to="/student/dashboard">
          <img
            src={
              isActiveLink("/student/dashboard") ? dashboardDark : dashboardGrey
            }
            alt="Dashboard"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/dashboard"
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
        <NavLink to="/student/basic-course">
          <img
            src={
              isActiveLink("/student/basic-course") ? englishDark : englishGrey
            }
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/basic-course"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Basic Course
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/student/csep">
          <img
            src={isActiveLink("/student/csep") ? csapDark : csapGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/csep"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          CSEP
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/student/csap">
          <img
            src={isActiveLink("/student/csap") ? csapDark : csapGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/csap"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          CSAP
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/student/job">
          <img
            src={isActiveLink("/student/job") ? jobDark : jobGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/job"
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
    {
      icon: (
        <NavLink to="/student/refer">
          <img
            src={isActiveLink("/student/refer") ? referDark : referGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/refer"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Refer & Earn
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/student/interview">
          <img
            src={
              isActiveLink("/student/interview") ? interviewDark : interviewGrey
            }
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/interview"
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
        <NavLink to="/student/support">
          <img
            src={isActiveLink("/student/support") ? supportDark : supportGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/student/support"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Support
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

        <Link to="/student/profile" className="profile-navigation">
          <ProfileData close={close ? "true" : undefined}>
            <div className="user">
              <img src={userImg} alt="" />
              <p>Katie Pena</p>
            </div>
            <div className="levels">
              <div className="level">
                <img src={points} alt="" />
                <p>1,354</p>
              </div>
              <div className="level">
                <img src={level} alt="" />
                <p>Primary Level</p>
              </div>
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

      <SideBarButton
        onClick={handleSidebarView}
        close={close ? "true" : undefined}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 18 }} />
      </SideBarButton>
    </SideBarContainer>
  );
};

export default Sidebar;
