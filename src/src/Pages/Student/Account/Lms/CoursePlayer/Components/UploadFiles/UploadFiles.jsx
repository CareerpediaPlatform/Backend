import { useState } from "react";

import "./UploadFiles.scss";
import arrowIcon from "../../../../Assets/arrow.png";
import downIcon from "../../../../Assets/downUp.png";

const UploadFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleFileUpload = (event) => {
    const files = event.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div className="upload-files">
      <div className="upload-files-con">
        {/* <div className="upload-files-con-left-circle">
          <img src={downIcon} alt="" />
        </div> */}

        <div className="upload-files-con-right">
          <div className="upload-files-con-right-top">
            <h3>Upload Photo</h3>
            <img src={arrowIcon} alt="" />
            <input
              type="file"
              className="upload-field"
              onChange={handleFileUpload}
            />
          </div>
          <p>upload photo type jpg/png/svg/pdf</p>
        </div>
      </div>

      <div className="uploaded-files">
        <h3>Uploaded Files :</h3>
      
          {uploadedFiles.map((file, index) => (
            <p key={index}>
              {file.name}
              <a href={URL.createObjectURL(file)} download={file.name}>
              <img src={downIcon} alt="" />
              </a>
            </p>
          ))}
   
      </div>
    </div>
  );
};

export default UploadFiles;
