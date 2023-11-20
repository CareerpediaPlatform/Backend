import "./WorkExperience.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import { experienceProgress } from "../../../../../../redux/editProgressBar";
import { Counter } from "../Counter";
import { useEffect, useState } from "react";


import deleteIcon from "../../../../Account/Assets/close-circle.png";

const WorkExperience = ({ setAllData, allData }) => {
  const [data, setData] = useState({
    PreviousCompanyName: "",
    Occupation: "",
    JobRole: "",
    Skills : "",
    startDate: "",
    endDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data) {
      let leng = Counter(data);
      dispatch(experienceProgress(leng * 25));
      setAllData({ ...allData, ...data });
    }
  }, [data]);

  const handleSaveClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setExperienceList([...experienceList, data]);
      setData({
        PreviousCompanyName: "",
        Occupation: "",
        JobRole: "",
        Skills : "",
        startDate: "",
        endDate: "",
      });
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setData(experienceList[index]);
  };

  const handleSaveEditClick = () => {
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[editIndex] = data;
    setExperienceList(updatedExperienceList);

    setEditIndex(-1);
    setData({
      PreviousCompanyName: "",
      Occupation: "",
      JobRole: "",
      Skills : "",
      startDate: "",
      endDate: "",
    });
  };

  const handleDeleteClick = (index) => {
    const updatedExperienceList = [...experienceList];
    updatedExperienceList.splice(index, 1);
    setExperienceList(updatedExperienceList);
  };

  return (
    <div className="edit-workExperience">
      <div className="edit-workExperience-heading">
        <h2>Work Experience</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="edit-workExperience-fields">

      <div className="edit-workExperience-fields-field">
          <label>Previous Company Name</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your Previous Company Name"
              name="PreviousCompanyName"
              value={data.PreviousCompanyName}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your Previous Company Name"
              name="PreviousCompanyName"
              value={data.PreviousCompanyName}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="edit-workExperience-fields-field">
          <label>Occupation</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your occupation"
              name="Occupation"
              value={data.Occupation}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your occupation"
              name="Occupation"
              value={data.Occupation}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-workExperience-fields-field">
          <label>Job Role</label>

          {editMode ? (
            <input
              type="text"
              placeholder="Enter your Job Role"
              name="JobRole"
              value={data.JobRole}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your Job Role"
              name="JobRole"
              value={data.JobRole}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-workExperience-fields-field">
          <label>Skills</label>
          {editMode ? (
            <input
              type="text"
              placeholder="Enter your Skills"
              name="Skills"
              value={data.Skills}
              onChange={handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your Skills"
              name="Skills"
              value={data.Skills}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-workExperience-fields-field">
          <label>Start Date</label>
          {editMode ? (
            <input
              type="date"
              placeholder="Enter your start date"
              aria-describedby="date-design-prepend"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
          ) : (
            <input
              type="date"
              placeholder="Enter your start date"
              aria-describedby="date-design-prepend"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="edit-workExperience-fields-field">
          <label>End Date</label>
          {editMode ? (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
          ) : (
            <input
              type="date"
              id="pure-date"
              aria-describedby="date-design-prepend"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
          )}
        </div>
      </div>

      <div className="display-experience-buttons">
        <button onClick={handleSaveClick} className="experience-button">
          Add Experience Details
        </button>
      </div>

      <div className="display-experience-details">
        <div className="experience-cards">
          {experienceList.map((item, index) => (
            <div key={index} className="experience-card">
              <div className="multiple-cards">
                <div className="card-details">
                <p>Previous Company Name</p>
                  <p>Occupation </p>
                  <p>JobRole </p>
                  <p>Skills</p>
                  <p>Start Date </p>
                  <p>End Date </p>
                </div>
                <div className="card-details">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p> : </p>
                  <p> : </p>
                  <p>: </p>
                </div>
                <div className="card-details">
                <p>{item.PreviousCompanyName}</p>
                  <p>{item.Occupation}</p>
                  <p>{item.JobRole}</p>
                  <p>{item.Skills}</p>
                  <p>{item.startDate}</p>
                  <p>{item.endDate}</p>
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
                      className="experience-button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="experience-button"
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

export default WorkExperience;
