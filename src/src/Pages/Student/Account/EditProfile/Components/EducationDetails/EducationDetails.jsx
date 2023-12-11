import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { educationProgress } from "../../../../../../redux/editProgressBar";
import { Counter } from "../Counter";
import "./EducationDetails.scss";

import deleteIcon from "../../../../Account/Assets/close-circle.png";

const EducationDetails = ({ setAllData, allData }) => {
  const [data, setData] = useState({
    collegeName : "",
    highestEducation: "",
    degree: "",
    degreePercentage: "",
    branch: "",
    startYear: "",
    endYear: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data) {
      let leng = Counter(data);
      dispatch(educationProgress(leng * 16.66666));
      setAllData({ ...allData, ...data });
    }
  }, [data]);

  const handleSaveClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEducationList([...educationList, data]);
      setData({
        collegeName : "",
        highestEducation: "",
        degree: "",
        degreePercentage: "",
        branch: "",
        startYear: "",
        endYear: "",
      });
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setData(educationList[index]);
  };

  const handleSaveEditClick = () => {
    const updatedEducationList = [...educationList];
    updatedEducationList[editIndex] = data;
    setEducationList(updatedEducationList);

    setEditIndex(-1);
    setData({
      collegeName : "",
      highestEducation: "",
      degree: "",
      degreePercentage: "",
      branch: "",
      startYear: "",
      endYear: "",
    });
  };

  const handleDeleteClick = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  return (
    <div className="edit-educationDetails">
      <div className="edit-educationDetails-heading">
        <h2>Education Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>

      <div className="edit-educationDetails-fields">

        <div className="edit-educationDetails-fields-field">
          <label>Highest Education</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your Education"
              name="highestEducation"
              value={data.highestEducation}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your Education"
              name="highestEducation"
              value={data.highestEducation}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>College Name</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your College Name"
              name="collegeName"
              value={data.collegeName}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your College Name"
              name="collegeName"
              value={data.collegeName}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>Bachelor's Degree</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your Degree"
              name="degree"
              value={data.degree}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your Degree"
              name="degree"
              value={data.degree}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>Degree Percentage</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your percentage"
              name="degreePercentage"
              value={data.degreePercentage}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your percentage"
              name="degreePercentage"
              value={data.degreePercentage}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>Department Branch</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your department"
              name="branch"
              value={data.branch}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your department"
              name="branch"
              value={data.branch}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>Start Year</label>
          {editMode ? (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="startYear"
              value={data.startYear}
              onChange={handleChange}
            />
          ) : (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="startYear"
              value={data.startYear}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-educationDetails-fields-field">
          <label>End Year</label>
          {editMode ? (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="endYear"
              value={data.endYear}
              onChange={handleChange}
            />
          ) : (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="endYear"
              value={data.endYear}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      <div className="display-education-buttons">
        <button onClick={handleSaveClick} className="education-button">
          Add Educational Details
        </button>
      </div>

      <div className="display-education-details">
        <div className="education-cards">
          {educationList.map((item, index) => (
            <div key={index} className="education-card">
              <div className="multiple-cards">
                <div className="card-details">
                  <p>Highest Education </p>
                  <p>College Name</p>
                  <p>Bachelor's Degree </p>
                  <p>Degree Percentage </p>
                  <p>Department Branch </p>
                  <p>Start Year </p>
                  <p>End Year </p>
                </div>
                <div className="card-details">
                  <p>:</p>
                  <p>:</p>
                  <p> : </p>
                  <p> : </p>
                  <p>: </p>
                  <p> : </p>
                  <p> : </p>
                </div>
                <div className="card-details">
                  <p>{item.highestEducation}</p>
                  <p>{item.collegeName}</p>
                  <p>{item.degree}</p>
                  <p>{item.degreePercentage}</p>
                  <p>{item.branch}</p>
                  <p>{item.startYear}</p>
                  <p> {item.endYear}</p>
                </div>
                <div className="card-details">
                <img
                  src={deleteIcon}
                  alt=""
                  onClick={() => handleDeleteClick(index)}
                />
                </div>
               
              </div>
              <div className="all-buttons">
                {editIndex === index ? (
                  <>
                    <button
                      onClick={handleSaveEditClick}
                      className="education-button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="education-button"
                  >
                    Edit
                  </button>
                )}

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
