import { useState, useRef} from "react";
import "./AddLesson.scss";

import CloudImage from "../../Assets/cloud.png";
import { Link } from "react-router-dom";


const AddLesson = () => {


  const fileInputRefs = useRef({});
  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });

  const [inputData, setInputData] = useState({

    lessonName: "",
    lessonPoints: "",
   
  });

  const handleInputChange = (field, value) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [field]: value,
    }));
  };

  const handleUpload = () => {
    console.log(inputData)
    setInputData("")
  };


  const handleFileChange = (fileKey, event) => {
    const file = event.target.files[0];
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fileKey]: file,
    }));
  };

  const handleButtonClick = (fileKey) => {
    if (fileInputRefs.current[fileKey]) {
      fileInputRefs.current[fileKey].click();
    }
  };
  return (
    <div className="add-lesson-module">
   
        <div className="add-lesson">
          <div className="lesson-name-points">
            <div className="lesson-name">
              <h4>Lesson Name</h4>
              <input
                type="text"
                id="place-holder"
                placeholder="e.g UI Design"
                value={inputData.lessonName || ""}
                onChange={(e) =>
                  handleInputChange("lessonName", e.target.value)
                }
              />
            </div>
            <div className="points">
              <h4>Points</h4>
              <input
                type="number"
                id="place-holder"
                value={inputData.lessonPoints || ""}
                onChange={(e) =>
                  handleInputChange("lessonPoints", e.target.value)
                }
              />
            </div>
          </div>
          <div className="upload-file">
            <h4>Upload File</h4>
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
                <p>Selected File 1: {selectedFiles.file1.name}</p>
                <p>File Type: {selectedFiles.file1.type}</p>
              </div>
            )}
          </div>

          <div className="drag-and-drop">
            <h4>Thumbnail</h4>

            <div className="upload" onClick={() => handleButtonClick("file2")}>
              <div className="file-size">
                <img src={CloudImage} alt="image" />
              </div>
              <div className="file-size-note">
                <p>Select a file or drag and drop here</p>
                <p>JPG, XLSX or PDF file size no more than 10MB</p>
              </div>
              <div className="file-size">
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png, .xlsx"
                  style={{ display: "none" }}
                  ref={(input) => (fileInputRefs.current["file2"] = input)}
                  onChange={(event) => handleFileChange("file2", event)}
                />
                <button onClick={() => handleButtonClick("file2")}>
                  Select File
                </button>
              </div>
            </div>

            {selectedFiles.file2 && (
              <div className="output">
                <p>Selected File 2: {selectedFiles.file2.name}</p>
                <p>File Type: {selectedFiles.file2.type}</p>
              </div>
            )}
          </div>

          <div className="drag-and-drop">
            <h4>Attachments</h4>

            <div className="upload" onClick={() => handleButtonClick("file3")}>
              <div className="file-size">
                <img src={CloudImage} alt="image" />
              </div>
              <div className="file-size-note">
                <p>Select a file or drag and drop here</p>
                <p>JPG, XLSX or PDF file size no more than 10MB</p>
              </div>
              <div className="file-size">
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png, .xlsx"
                  style={{ display: "none" }}
                  ref={(input) => (fileInputRefs.current["file3"] = input)}
                  onChange={(event) => handleFileChange("file3", event)}
                />
                <button>Select File</button>
              </div>
            </div>

            {selectedFiles.file3 && (
              <div className="output">
                <p>Selected File 3: {selectedFiles.file3.name}</p>
                <p>File Type: {selectedFiles.file3.type}</p>
              </div>
            )}
          </div>

          <div className="upload-button">
           <Link to="/admin/preview"> <button onClick={handleUpload}>Upload</button></Link>
          </div>
        </div>
 
    </div>
  );
};

export default AddLesson;
