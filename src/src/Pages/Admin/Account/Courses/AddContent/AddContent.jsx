import { useContext, useState } from "react";

import "./AddContent.scss";

import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

import { SideBarContext } from "../../../../../Context/SidebarContext";
import Edit from "./Components/Edit/Edit";
import AddModule from "./Components/Form/Components/AddModule/AddModule";
import AddLesson from "./Components/Form/Components/AddLesson/AddLesson";
import CourseDetails from "../CourseDetails/CourseDetails";
import AddExercise from "./Components/Form/Components/AddExercise/AddExercise";
import AddTest from "./Components/Form/Components/AddTest/AddTest";
import AddPart from "./Components/Form/Components/AddPart/AddPart";

const EditPartModule = () => {
  const { close } = useContext(SideBarContext);
  const [active, setActive] = useState(null);

  const handleClick = (prop) => {
    setActive(prop);
  };

  return (
    <div className="admin-courses">
      <Sidebar />
      <div className="admin-courses-content">
        <Navbar type="course" />
        <div
          className="admin-courses-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="admin-courses-edit-part-module">
            <div className="edit-part">
              <Edit handleClick={handleClick} />
            </div>
            <hr />
            <div className="form-part">
              <div style={{ display: active === null ? "" : "none" }}>
                <AddPart />
              </div>
              <div style={{ display: active === 0 ? "" : "none" }}>
                <AddPart />
              </div>
              <div style={{ display: active === 1 ? "" : "none" }}>
                <AddModule />
              </div>
              <div style={{ display: active === 2 ? "" : "none" }}>
                <CourseDetails />
              </div>
              <div style={{ display: active === 3 ? "" : "none" }}>
                <AddLesson />
              </div>
              <div style={{ display: active === 4 ? "" : "none" }}>
                <AddExercise />
              </div>
              <div style={{ display: active === 5 ? "" : "none" }}>
                <AddTest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPartModule;
