import React from "react";
import "./Content.scss";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import Bookblack from "../../Assets/bookblack.png";
import Clock from "../../Assets/clock.png";
import Note from "../../Assets/note.png";
import Task from "../../Assets/task-square.png";
import play from "../../Assets/Vector.png";
import Arrow from "../../Assets/arrow.png";
import { makeStyles } from "@mui/styles";
const Learns = [
  {
    part: "HTML",
    information: "Speak English with more confidence and",

    modules: [
      {
        name: "Html tags",
        details: "Speak English with more confidence and",
        videos: [
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "text",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
          {
            exercise: "color",
            points: "20",
            Time: "30",
          },
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
        ],
        tests: [
          {
            test: "test one",
            points: "5",
            Time: "20",
          },
          {
            test: "test two",
            points: "20",
            Time: "30",
          },
          {
            test: "test three",
            points: "5",
            Time: "20",
          },
        ],
      },
      {
        name: "Module2",
        details: "Speak English with more confidence and",
        videos: [
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "text",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
          {
            exercise: "color",
            points: "20",
            Time: "30",
          },
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
        ],
        tests: [
          {
            test: "test one",
            points: "5",
            Time: "20",
          },
          {
            test: "test two",
            points: "20",
            Time: "30",
          },
          {
            test: "test three",
            points: "5",
            Time: "20",
          },
        ],
      },
    ],
  },
  {
    part: "CSS",
    information: "Speak English with more confidence and",

    modules: [
      {
        name: "Module1",
        videos: [
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "text",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
          {
            exercise: "color",
            points: "20",
            Time: "30",
          },
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
        ],
        tests: [
          {
            test: "test one",
            points: "5",
            Time: "20",
          },
          {
            test: "test two",
            points: "20",
            Time: "30",
          },
          {
            test: "test three",
            points: "5",
            Time: "20",
          },
        ],
      },
      {
        name: "Module2",
        videos: [
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "color",
            points: "2",
            Time: "15",
          },
          {
            lesson: "text",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
          {
            exercise: "color",
            points: "20",
            Time: "30",
          },
          {
            exercise: "index html",
            points: "5",
            Time: "20",
          },
        ],
        tests: [
          {
            test: "test one",
            points: "5",
            Time: "20",
          },
          {
            test: "test two",
            points: "20",
            Time: "30",
          },
          {
            test: "test three",
            points: "5",
            Time: "20",
          },
        ],
      },
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: "none",
  },
}));
const Content = () => {
  const noBorderStyle = {
    border: "none",
  };
  return (
    <div className="content-container">
      {Learns.map((item, index) => (
        <Accordion key={index} className="accordion" style={noBorderStyle}>
          <AccordionSummary expandIcon={<img src={Arrow} />}>
            <div className="module-container">
              <h2 className="module-heading">{item.part}</h2>
              <p className="module-text">{item.information}</p>
              <div className="main-icons-text">
                <span className="icons-text">
                  <img src={Bookblack} alt="" />
                  <span className="text-main">
                    {item.modules[0].videos.length} Lessons
                  </span>
                </span>
                <span className="icons-text">
                  <img src={Clock} alt="" />
                  <span className="text-main">
                    {(() => {
                      const totalMinutes = item.modules.reduce(
                        (totalTime, module) =>
                          totalTime +
                          module.videos
                            .concat(module.exercises, module.tests)
                            .reduce(
                              (moduleTime, item) =>
                                moduleTime + parseInt(item.Time),
                              0
                            ),
                        0
                      );
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;
                      return minutes >= 30 ? `${hours}.5` : `${hours}`;
                    })()}
                    {""} hrs
                  </span>
                </span>
                <span className="icons-text">
                  <img src={Note} alt="" />
                  <span className="text-main">
                    {item.modules[0].exercises.length} exercises
                  </span>
                </span>
                <span className="icons-text">
                  <img src={Task} alt="" />
                  <span className="text-main">
                    {item.modules[0].exercises.length} tests
                  </span>
                </span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="nested-accordions">
              {item.modules.map((module, moduleIndex) => (
                <Accordion key={moduleIndex} className="accordion">
                  <AccordionSummary expandIcon={<img src={Arrow} />}>
                    <div className="nested-module">
                      <h2 className="nested-heading">{module.name}</h2>
                      <span className="nested-text">{module.details}</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="double-nested-main">
                      {/* Rendering videos */}
                      <div className="nested-icons-text">
                        <span className="icons-text">
                          <img src={Bookblack} alt="" />
                          <span className="text">
                            {module.videos.length} lessons
                          </span>
                        </span>

                        <ol type="1" className="lessons-list">
                          {module.videos.map((video, videoIndex) => (
                            <li key={videoIndex}>
                              <div className="lists">
                                <div className="list"> {video.lesson}</div>
                                <div className="points-time">
                                  <span className="points">
                                    Points: {video.points}
                                  </span>
                                  <span className="time">
                                    <img src={play} />
                                    {""} Time: {video.Time} mins
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Rendering exercises */}
                      <div className="nested-icons-text">
                        <span className="icons-text">
                          <img src={Note} alt="" />
                          <span className="text">
                            {module.exercises.length} exercises
                          </span>
                        </span>
                        <ol type="1" className="lessons-list">
                          {module.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex}>
                              <div className="lists">
                                <div className="list"> {exercise.exercise}</div>
                                <div className="points-time">
                                  <span className="points">
                                    Points: {exercise.points}
                                  </span>
                                  <span className="time">
                                    Time: {exercise.Time} mins
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Rendering tests */}
                      <div className="nested-icons-text">
                        <span className="icons-text">
                          <img src={Task} alt="" />
                          <span className="text">
                            {module.tests.length} tests{" "}
                          </span>
                        </span>
                        <ol type="1" className="lessons-list">
                          {module.tests.map((test, testIndex) => (
                            <li key={testIndex}>
                              <div className="lists">
                                <div className="list"> {test.test}</div>
                                <div className="points-time">
                                  <span className="points">
                                    {" "}
                                    Points: {test.points}
                                  </span>
                                  <span className="time">
                                    Time: {test.Time} mins{" "}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Content;
