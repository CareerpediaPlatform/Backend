import { useState} from "react";

import "./AddTest.scss";


const AddTest = () => {
  
  const [inputData, setInputData] = useState({
    description: "",
    testPoints: null,
    testMarks: null,
    testType: "",
  });

  const handleInputChange = (field, value) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [field]: value,
    }));
  };

  const handleUpload = () => {
    console.log(inputData);
    setInputData("")
  };
  return (
    <div className="add-test-module">
      <div className="add-test">
        <div className="test-name">
          <h3>Add Task</h3>
        </div>

        <div className="lesson-name-points">
          <div className="lesson-name">
            <h4>Task Type</h4>
            <input
              type="text"
              id="place-holder"
              value={inputData.testType || ""}
              onChange={(e) => handleInputChange("testType", e.target.value)}
            />
          </div>
          <div className="lesson-name">
            <h4>Marks</h4>
            <input
              type="number"
              id="place-holder"
              value={inputData.testMarks || ""}
              onChange={(e) => handleInputChange("testMarks", e.target.value)}
            />
          </div>
          <div className="lesson-name">
            <h4>Points</h4>
            <input
              type="number"
              id="place-holder"
              value={inputData.testPoints || ""}
              onChange={(e) => handleInputChange("testPoints", e.target.value)}
            />
          </div>
        </div>

        <div className="description">
          <h4>Task Description</h4>
          <textarea
            type="text"
            id="place-holder"
            placeholder="Enter the Description"
            className="course-description-field"
            value={inputData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="upload-button">
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
