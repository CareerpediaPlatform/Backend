import { useState } from "react";
import "./AddExercise.scss";

const AddExercise = () => {
  const [inputData, setInputData] = useState({
    exercisePoints: null,
    type: "",
    exerciseMarks: null,
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: "",
  });

  const handleInputChange = (field, value) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [field]: value,
    }));
  };

  const handleUpload = () => {
    console.log(inputData);
    setInputData("");
  };
  return (
    <div className="add-exercise-module">
      <div className="add-exercise">
        <div className="exercise-name">
          <h3>Add Exercise</h3>
        </div>

        <div className="lesson-name-points">
          <div className="lesson-name">
            <h4>Question Type</h4>
            <input
              type="text"
              id="place-holder"
              value={inputData.type || ""}
              onChange={(e) => handleInputChange("type", e.target.value)}
            />
          </div>
          <div className="lesson-name">
            <h4>Marks</h4>
            <input
              type="number"
              id="place-holder"
              value={inputData.exerciseMarks || ""}
              onChange={(e) =>
                handleInputChange("exerciseMarks", e.target.value)
              }
            />
          </div>
          <div className="lesson-name">
            <h4>Points</h4>
            <input
              type="number"
              id="place-holder"
              value={inputData.exercisePoints || ""}
              onChange={(e) =>
                handleInputChange("exercisePoints", e.target.value)
              }
            />
          </div>
        </div>

        <div className="question">
          <h4>Question</h4>
          <input
            type="text"
            id="place-holder"
            placeholder="Enter the Question"
            className="course-description-field"
            value={inputData.question || ""}
            onChange={(e) => handleInputChange("question", e.target.value)}
          />
        </div>

        <div className="options">
          <h4>Options</h4>
          <div className="option-fields">
            <input
              type="text"
              value={inputData.option1 || ""}
              onChange={(e) => handleInputChange("option1", e.target.value)}
            />
            <input
              type="text"
              value={inputData.option2 || ""}
              onChange={(e) => handleInputChange("option2", e.target.value)}
            />
            <input
              type="text"
              value={inputData.option3 || ""}
              onChange={(e) => handleInputChange("option3", e.target.value)}
            />
            <input
              type="text"
              value={inputData.option4 || ""}
              onChange={(e) => handleInputChange("option4", e.target.value)}
            />
          </div>
        </div>

        <div className="ans">
          <h4>Correct Answer</h4>
          <input
            type="text"
            value={inputData.ans || ""}
            onChange={(e) => handleInputChange("ans", e.target.value)}
          />
        </div>

        <div className="upload-button">
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
