import React, { useState } from "react";
import "./Selected.scss";

const SelectedButtons = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectedClick = () => {
    setSelectedOption("Selected");

    console.log("Selected");
  };

  const handleRejectedClick = () => {
    setSelectedOption("Rejected");

    console.log("Rejected");
  };

  return (
    <div className="SelectedButtons">
      <button className="Selected" onClick={handleSelectedClick}>
        Selected
      </button>
      <button className="Rejected" onClick={handleRejectedClick}>
        Rejected
      </button>
    </div>
  );
};

export default SelectedButtons;
