import { useState, useRef } from "react";
import "./AddModule.scss";

import { Link } from "react-router-dom";

import BookmarkIcon from "../../../../Assets/Bookmark.png";
import DollarCoin from "../../../../Assets/DollarCoin.png";
import BookImage from "../../../../Assets/book.png";
import FrameImage from "../../../../Assets/frame.png";
import NoteImage from "../../../../Assets/note.png";
import taskSquare from "../../../../Assets/task-square.png";
import CloudImage from "../../../../Assets/cloud.png";

const EditForm = () => {
  const [data, setData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [array, setArray] = useState([]);

  const handleSubmit = () => {
    array.push(data);
    console.log(data);
    console.log(array);
    setData({
      title: "",
      course: "",
      price: "",
      discount: "",
      description: "",
      mentors: "",
      lessons: "",
      exercises: "",
      tests: "",
    });
  };

  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
  });

  const fileInputRefs = useRef({});

  const handleButtonClick = (fileKey) => {
    if (fileInputRefs.current[fileKey]) {
      fileInputRefs.current[fileKey].click();
    }
  };

  const handleFileChange = (fileKey, event) => {
    const file = event.target.files[0];
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fileKey]: file,
    }));
  };
  return (
    <div className="form">
      <div className="title-inputs">
        <div className="title-heading">
          <h4>Module Name</h4>
          <input
            type="text"
            placeholder="your title goes here..."
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>

        <div className="input-description">
          <h4>Description</h4>
          <textarea
            name="description"
            placeholder="lorem Ipsum"
            value={data.description}
            onChange={handleChange}
          />
        </div>

        <div className="four-inputs">
          <div className="two-inputs">
            <div className="input-field">
              <h4>Mentors</h4>
              <div className="icons">
                <img src={FrameImage} alt="" />
                <input
                  type="text"
                  name="mentors"
                  value={data.mentors}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <h4>Lessons</h4>
              <div className="icons">
                <img src={BookImage} alt="" />
                <input
                  type="number"
                  name="lessons"
                  value={data.lessons}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="two-inputs">
            <div className="input-field">
              <h4>Exercises</h4>
              <div className="icons">
                <img src={NoteImage} alt="" />
                <input
                  type="number"
                  name="exercises"
                  value={data.exercises}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <h4>Tests</h4>
              <div className="icons">
                <img src={taskSquare} alt="" />
                <input
                  type="number"
                  name="tests"
                  value={data.tests}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="update-buttons">
          <button onClick={handleSubmit}>Update</button>
          <button id="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
