import React from "react";
import "./CoursePreviews.scss";
import { useContext } from "react";
import Sidebar from "../../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Student/Navbar/Navbar";
import PreviewCourse from "../../../../../Components/PreviewCourse/PreviewCourse";
import { SideBarContext } from "../../../../../Context/SidebarContext";
import { useParams } from "react-router-dom";
const CoursePreviews = () => {
  const { course, courseID } = useParams();
  const { close } = useContext(SideBarContext);
  console.log(courseID);
  return (
    <div className="student-preview">
      <Sidebar />
      <div className="student-preview-content">
        <Navbar type={course} />
        <div
          className="student-preview-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <PreviewCourse active={courseID} paths={course} />
        </div>
      </div>
    </div>
  );
};

export default CoursePreviews;
