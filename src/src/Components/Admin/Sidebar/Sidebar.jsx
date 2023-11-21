import { useContext } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

// icons
import dashboardDark from "../../Assets/dashboardDark.png";
import dashboardGrey from "../../Assets/dashboardGrey.png";
import collegeDark from "../../Assets/collegeDark.png";
import collegeGrey from "../../Assets/collegeGrey.png";
import studentDark from "../../Assets/studentDark.png";
import studentGrey from "../../Assets/studentGrey.png";
import mentorDark from "../../Assets/mentorDark.png";
import mentorGrey from "../../Assets/mentorGrey.png";
import recruiterDark from "../../Assets/recruiterDark.png"
import recruiterGrey from "../../Assets/recruiterGrey.png"
import courseDark from "../../Assets/courseDark.png";
import courseGrey from "../../Assets/courseGrey.png";
import jobDark from "../../Assets/jobDark.png";
import jobGrey from "../../Assets/jobGrey.png";
import interviewDark from "../../Assets/interviewDark.png";
import interviewGrey from "../../Assets/interviewGrey.png";
import logoutGrey from "../../Assets/logout.png";
import logoImg from "../../Assets/logoImg.png";
import logo from "../../Assets/logo.png";

// styled component
import {
  SideBarContainer,
  TopWrapper,
  SideBarButton,
} from "../../Student/Sidebar/SidebarStyle";

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
        <NavLink to="/admin/dashboard">
          <img
            src={
              isActiveLink("/admin/dashboard") ? dashboardDark : dashboardGrey
            }
            alt="Dashboard"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/dashboard"
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
        <NavLink to="/admin/colleges">
          <img
            src={isActiveLink("/admin/colleges") ? collegeDark : collegeGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/colleges"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Colleges
        </NavLink>
      ),
    },   
    {
      icon: (
        <NavLink to="/admin/students">
          <img
            src={
              isActiveLink("/admin/students")
                ? studentDark
                : studentGrey
            }
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/students"
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
        <NavLink to="/admin/mentors">
          <img
            src={isActiveLink("/admin/mentors") ? mentorDark : mentorGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/mentors"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Mentors
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/admin/recruiters">
          <img
            src={isActiveLink("/admin/recruiters") ? recruiterDark : recruiterGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/recruiters"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
        Recruiters
        </NavLink>
      ),
    },
    {
      icon: (
        <NavLink to="/admin/courses">
          <img
            src={isActiveLink("/admin/courses") ? courseDark : courseGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/courses"
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
        <NavLink to="/admin/jobs">
          <img
            src={isActiveLink("/admin/jobs") ? jobDark : jobGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/jobs"
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
        <NavLink to="/admin/interviews">
          <img
            src={isActiveLink("/admin/interviews") ? interviewDark : interviewGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/interviews"
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
        <NavLink to="/admin/payments">
          <img
            src={isActiveLink("/admin/payments") ? interviewDark : interviewGrey}
            alt="Image"
          />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/payments"
          style={({ isActive }) => {
            return {
              color: isActive ? "#FF9F43" : "#64748B",
            };
          }}
        >
          Payments
        </NavLink>
      ),
    },
  ];

  const listTwo = [
    {
      icon: (
        <NavLink to="/admin/login">
          <img src={logoutGrey} alt="Image" />
        </NavLink>
      ),
      name: (
        <NavLink
          to="/admin/login"
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
