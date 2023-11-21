import "./Form.scss";
import { useState, useRef } from "react";

import { Link } from "react-router-dom";

// images
import CloudImage from "../../Assets/cloud.png";
import BookImage from "../../Assets/book.png";
import FrameImage from "../../Assets/frame.png";
import NoteImage from "../../Assets/note.png";
import taskSquare from "../../Assets/task-square.png";
import DeleteIcon from "../../Assets/delete.png";
import DollarCoin from "../../Assets/DollarCoin.png";
import PlusIcon from "../../Assets/plus-icon.png";

const Form = () => {
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
      price: null,
      discount: null,
      description: "",
      goldenRatio: "",
    });
  };

  const [add, setAdd] = useState([]);
  const handleAdd = () => {
    add.push(data.goldenRatio);
    setAdd([...add]);
    setData({ goldenRatio: "" });
  };

  const handleDelete = (index) => {
    const del = [...add];
    del.splice(index, 1);
    setAdd(del);
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
    <div className="course-form">
      <div className="title-heading">
        <input
          type="text"
          placeholder="Your course title goes here..."
          name="title"
          value={data.title}
          onChange={handleChange}
        />
      </div>
      <div className="input-description">
        <h4>Description</h4>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        />
      </div>
      <div className="two-inputs">
        <div className="input-field">
          <h4>Price</h4>
          <div className="icons">
            <img src={DollarCoin} alt="" />
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="800"
            />
          </div>
        </div>
        <div className="input-field">
          <h4>Discount</h4>
          <div className="icons">
            <img src={DollarCoin} alt="" />
            <input
              type="number"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              placeholder="100"
            />
          </div>
        </div>
      </div>
      <div className="golden-ratio">
        <h4>WHAT STUDENTS WILL LEARN</h4>

        <div className="golden-input">
          <input
            type="text"
            placeholder="Golden ratio"
            name="goldenRatio"
            value={data.goldenRatio}
            onChange={handleChange}
          />
          <img src={PlusIcon} alt="" onClick={handleAdd} />
        </div>

        <div className="golden-buttons">
          {add &&
            add.map((item, index) => {
              return (
                <div className="suggestion" key={index}>
                  <button>{item}</button>
                  <img
                    src={DeleteIcon}
                    alt="delete"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div className="upload-file">
        <h4>UPLOAD DEMO VIDEO</h4>

        <div
          className="upload-file-size"
          onClick={() => handleButtonClick("file1")}
        >
          <input
            type="file"
            accept="video*/"
            style={{ display: "none" }}
            ref={(input) => (fileInputRefs.current["file1"] = input)}
            onChange={(event) => handleFileChange("file1", event)}
          />
          <img src={CloudImage} alt="image" />
          <p>Select a file or drag and drop here</p>
          <p>Mp4 file size no more than 10MB</p>

          <button>Select File</button>
        </div>

        {selectedFiles.file1 && (
          <div className="output">
            <p>Selected File : {selectedFiles.file1.name}</p>
           {/* <p>File Type: {selectedFiles.file1.type}</p> */}
          </div>
        )}
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

      <div className="save-continue-buttons">
        <Link to="/admin/preview ">
          <button onClick={handleSubmit}>Save & Continue</button>
        </Link>
        <button id="cancel">Cancel</button>
      </div>
    </div>
  );
};

export default Form;
