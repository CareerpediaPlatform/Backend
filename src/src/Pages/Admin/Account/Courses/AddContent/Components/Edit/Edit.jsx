import { useState, useEffect } from "react";

import "./Edit.scss";
import { Link } from "react-router-dom";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

// ----------------------------------------------------------

import BackIcon from "../../Assets/backIcon.png";
import Book from "../../Assets/book.png";
import Note from "../../Assets/note.png";
import Task from "../../Assets/task-square.png";
import EditIcon from "../../Assets/edit.png";
import Arrow from "../../Assets/arrow.png";

const Learns = [
  {
    course: "UI/UX Design",

    modules: [
      {
        name: "Module 1",
        Lessons: [
          {
            lesson: "Lesson name 1",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 2",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 3",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "Exercise name 1",
            points: "5",
            Time: "20",
          },
          {
            exercise: "Exercise name 2",
            points: "7",
            Time: "30",
          },
          {
            exercise: "Exercise name 3",
            points: "5",
            Time: "20",
          },
        ],

        tests: [
          {
            test: "Task name 1",
            points: "5",
            Time: "20",
          },
          {
            test: "Task name 2",
            points: "8",
            Time: "30",
          },
          {
            test: "Task name 3",
            points: "5",
            Time: "20",
          },
        ],
      },
    ],
  },

  {
    course: "Development",

    modules: [
      {
        name: "Module 2",
        Lessons: [
          {
            lesson: "Lesson name 1",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 2",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 3",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "exercise name 1",
            points: "5",
            Time: "20",
          },
          {
            exercise: "exercise name 2",
            points: "7",
            Time: "30",
          },
          {
            exercise: "exercise name 3",
            points: "5",
            Time: "20",
          },
        ],

        tests: [
          {
            test: "test name 1",
            points: "5",
            Time: "20",
          },
          {
            test: "test name 2",
            points: "8",
            Time: "30",
          },
          {
            test: "test name 3",
            points: "5",
            Time: "20",
          },
        ],
      },
    ],
  },

  {
    course: "Testing",
    modules: [
      {
        name: "Module 3 ",
        Lessons: [
          {
            lesson: "Lesson name 1",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 2",
            points: "2",
            Time: "15",
          },
          {
            lesson: "Lesson name 3",
            points: "3",
            Time: "10",
          },
        ],
        exercises: [
          {
            exercise: "exercise name 1",
            points: "5",
            Time: "20",
          },
          {
            exercise: "exercise name 2",
            points: "7",
            Time: "30",
          },
          {
            exercise: "exercise name 3",
            points: "5",
            Time: "20",
          },
        ],

        tests: [
          {
            test: "test name 1",
            points: "5",
            Time: "20",
          },
          {
            test: "test name 2",
            points: "8",
            Time: "30",
          },
          {
            test: "test name 3",
            points: "5",
            Time: "20",
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------

const Edit = ({ handleClick }) => {
  const [data, setData] = useState("");
  const [array, setArray] = useState([]);

  const handleSubmit = () => {
    array.push(data);
    setData({
      course: "",
      lessonName: "",
      points: null,
      duration: "",
    });
  };

  return (
    <div className="edit">
      <div className="new-part">
        <Link to="/admin/preview">
          <img src={BackIcon} alt="arrow" className="arrow" />
        </Link>
        <h3>Design</h3>
      </div>

      {Learns.map((items) => {
        return (
          <Accordion className="Accordion" key={crypto.randomUUID()}>
            {items &&
              items.modules.map((i) => (
                <Accordion key={crypto.randomUUID()} className="xyz">
                  <AccordionSummary
                    expandIcon={<img src={Arrow} alt="Expand" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="Part-names"
                  >
                    <h3>{items.course}</h3>
                    <img
                      src={EditIcon}
                      alt=""
                      onClick={() => handleClick(0)}
                      className="part-img"
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="content-container">
                      {Learns.map((item, index) => (
                        <Accordion
                          key={crypto.randomUUID()}
                          style={{ border: "none" }}
                          className="xyz"
                        >
                          <AccordionDetails>
                            <div className="nested-accordions">
                              {item.modules.map((module, moduleIndex) => (
                                <Accordion
                                  key={crypto.randomUUID()}
                                  className="xyz"
                                >
                                  <AccordionSummary
                                    expandIcon={<img src={Arrow} />}
                                  >
                                    <div className="nested-module">
                                      <h2>{module.name}</h2>

                                      <img
                                        src={EditIcon}
                                        alt=""
                                        onClick={() => handleClick(1)}
                                      />
                                    </div>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div className="double-nested-main">
                                      {/* Rendering videos */}

                                      <div className="nested-icons-text">
                                        <p className="text">
                                          {module.Lessons.length} Lessons
                                        </p>
                                        <div className="lessons-list">
                                          {module.Lessons.map(
                                            (video, videoIndex) => (
                                              <div
                                                className="lists"
                                                key={crypto.randomUUID()}
                                              >
                                                <div className="list">
                                                  <p className="lesson-data">
                                                    {video.lesson}
                                                  </p>
                                                  <img
                                                    src={EditIcon}
                                                    alt=""
                                                    onClick={() =>
                                                      handleClick(3)
                                                    }
                                                  />
                                                </div>

                                                <p className="lesson-data">
                                                  {video.points} Points
                                                </p>
                                                <p className="lesson-data">
                                                  {video.Time} mins
                                                </p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="add-new-part">
                                          <h4 onClick={() => handleClick(3)}>
                                            Add New Lesson +
                                          </h4>
                                        </div>
                                      </div>

                                      {/* Rendering exercises */}
                                      <div className="nested-icons-text">
                                        <p className="text">
                                          {module.exercises.length} Exercises
                                        </p>

                                        <div className="lessons-list">
                                          {module.exercises.map((exercise) => (
                                            <div className="lists">
                                              <div className="list">
                                                <p className="lesson-data">
                                                  {exercise.exercise}
                                                </p>
                                                <img
                                                  src={EditIcon}
                                                  alt=""
                                                  onClick={() => handleClick(4)}
                                                />
                                              </div>
                                              <p className="lesson-data">
                                                {exercise.points} Points
                                              </p>
                                              <p className="lesson-data">
                                                {exercise.Time} mins
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="add-new-part">
                                          <Link to="">
                                            <h4 onClick={() => handleClick(4)}>
                                              Add New Exercise +
                                            </h4>
                                          </Link>
                                        </div>
                                      </div>

                                      {/* Rendering tests */}
                                      <div className="nested-icons-text">
                                        <p className="text">
                                          {module.tests.length} Tasks
                                        </p>

                                        <div className="lessons-list">
                                          {module.tests.map(
                                            (test, testIndex) => (
                                              <div className="lists">
                                                <div className="list">
                                                  <p className="lesson-data">
                                                    {test.test}
                                                  </p>
                                                  <img
                                                    src={EditIcon}
                                                    alt=""
                                                    onClick={() =>
                                                      handleClick(5)
                                                    }
                                                  />
                                                </div>

                                                <p className="lesson-data">
                                                  {test.points} Points
                                                </p>
                                                <p className="lesson-data">
                                                  {test.Time} mins{" "}
                                                </p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="add-new-part">
                                          <Link to="">
                                            <h4 onClick={() => handleClick(5)}>
                                          
                                              Add New Task +
                                            </h4>
                                          </Link>
                                        </div>
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
                    <div className="add-new-part">
                      <h4 onClick={() => handleClick(1)}>Add New Module +</h4>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Accordion>
        );
      })}
      {/* ----------------------------------------------- */}

      <div className="add-new-part">
        <h4 onClick={() => handleClick(0)}>Add New Part +</h4>
      </div>
    </div>
  );
};

export default Edit;
