import "./AddPart.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AddPart = () => {
  const [part, setPart] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart({ ...part, [name]: value });
    console.log(part);
  };
  return (
    <div className="part-details">
      <div className="part">
        <h3>Part</h3>
        <input
          type="text"
          placeholder="Enter Part name"
          value={part.title}
          onChange={handleChange}
          name="title"
        />
      </div>
      <div className="part">
        <h3>Description</h3>
        <textarea
          placeholder="Enter description"
          value={part.description}
          onChange={handleChange}
          name="description"
        />
      </div>
      <div className="buttons">
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AddPart;
