import "./SingleJobDetail.scss";
import { useContext } from "react";

import RectangleImage from "./Assets/Rectangle.png";

// Sidebar and Navbar
import Sidebar from "../../../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../../../Components/Student/Navbar/Navbar";

// Context
import { SideBarContext } from "../../../../../../Context/SidebarContext";

const arrow = ">";

const SingleJobData = [
  {
    JobRole: "User Interface Designer",
    Address: "Madhapur, Hyderabad, Telangana. 2 Days ago.",
    Experience: "2-4 years",
    Openings: 5,
    Employment: "Full Time",
    Salary: "$800 - $1000",

    Description:
      "Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience. Execute all visual design stages from concept to final hand-off to engineering. Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks. Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas. Present and defend designs and key milestone deliverables to peers and executive level stakeholders. Conduct user research and evaluate user feedback.",
  },
];

const SingleJobDetail = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="student-single-jobs">
      <Sidebar />
      <div className="student-single-job-content">
        <Navbar type="jobs" />
        <div
          className="single-job-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="single-job-info">
            {SingleJobData.map((singleJob) => {
              return (
                <div className="jobs-image" key={crypto.randomUUID()}>
                  <div className="apply-job">
                    <div className="job-location">
                      <h3>{singleJob.JobRole}</h3>
                      <h4>{singleJob.Address}</h4>
                    </div>
                    <div>
                      <button className="apply-button">Apply Now</button>
                    </div>
                  </div>
                </div>
              );
            })}

            {SingleJobData.map((singleJob, index) => {
              return (
                <div className="details" key={index}>
                  <div className="data">
                    <h3>Experience</h3>
                    <h4>{singleJob.Experience}</h4>
                  </div>
                  <hr />
                  <div className="data">
                    <h3>Openings</h3>
                    <h4>{singleJob.Openings}</h4>
                  </div>
                  <hr />
                  <div className="data">
                    <h3>Employment</h3>
                    <h4>{singleJob.Employment}</h4>
                  </div>
                  <hr />
                  <div className="data">
                    <h3>Salary</h3>
                    <h4>{singleJob.Salary}</h4>
                  </div>
                </div>
              );
            })}
            {SingleJobData.map((singleJob, index) => {
              return (
                <div className="job-description" key={index}>
                  <h3>Description</h3>
                  <h4>{singleJob.Description}</h4>
                </div>
              );
            })}

            <div className="job-description">
              <h3>Responsibilities</h3>
              <ul>
                <li>
                  Identify problems based on the product vision / requirements
                  and come up with delightful design solutions & deliverables.
                </li>
                <li>
                  Conduct design process best practices across projects such as
                  gathering insights, validating problems & solutions,
                  delivering multiple fidelity levels of design, and ensure the
                  final design is implemented properly on production.
                </li>
                <li>
                  Collaborate with Interaction Designers (Design System team) to
                  ensure the implementation of proper design components and
                  patterns and/or improving existing design libraries.
                </li>
              </ul>
            </div>
            <div className="job-description">
              <h3>Requirements</h3>
              <ul>
                <li>
                  Identify problems based on the product vision / requirements
                  and come up with delightful design solutions & deliverables.
                </li>
                <li>
                  Conduct design process best practices across projects such as
                  gathering insights, validating problems & solutions,
                  delivering multiple fidelity levels of design, and ensure the
                  final design is implemented properly on production.
                </li>
                <li>
                  Collaborate with Interaction Designers (Design System team) to
                  ensure the implementation of proper design components and
                  patterns and/or improving existing design libraries.
                </li>
              </ul>
            </div>
            <div className="job-description">
              <h3>Preferred Skills</h3>
              <ul>
                <li>
                  Identify problems based on the product vision / requirements
                  and come up with delightful design solutions & deliverables.
                </li>
                <li>
                  Conduct design process best practices across projects such as
                  gathering insights, validating problems & solutions,
                  delivering multiple fidelity levels of design, and ensure the
                  final design is implemented properly on production.
                </li>
                <li>
                  Collaborate with Interaction Designers (Design System team) to
                  ensure the implementation of proper design components and
                  patterns and/or improving existing design libraries.
                </li>
              </ul>
            </div>
            <div className="job-description">
              <h3>Education</h3>
              <ul>
                <li>
                  Identify problems based on the product vision / requirements
                  and come up with delightful design solutions & deliverables.
                </li>
                <li>
                  Conduct design process best practices across projects such as
                  gathering insights, validating problems & solutions,
                  delivering multiple fidelity levels of design, and ensure the
                  final design is implemented properly on production.
                </li>
                <li>
                  Collaborate with Interaction Designers (Design System team) to
                  ensure the implementation of proper design components and
                  patterns and/or improving existing design libraries.
                </li>
              </ul>
            </div>
            {/* <div className="job-buttons">
              <button id="accept">Accept</button>
              <button id="decline">Decline</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetail;
