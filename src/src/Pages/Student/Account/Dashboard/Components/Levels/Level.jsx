import {useState} from "react";
import "./Level.scss";




// Images 
import LevelImage1 from "./Assets/completedShield.png";
import LevelImage2 from "./Assets/inCompleteShield.png";
import PassportImage from "./Assets/passport1.png";
import PuzzleImage from "./Assets/puzzle2.png";
import PhysicsImage from "./Assets/physics3.png";
import BookImage from "./Assets/book4.png";

const Level = ({setData}) => {
  const imageSources = [
    LevelImage2, 
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
    LevelImage2,
  ];


  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);


  const [selectedLevel, setSelectedLevel] = useState(null);


  const handleImageClick = (index) => {
    setSelectedLevel(numbers[index]);
    setData(numbers[index]);
 
  };
  return (
    <>

    <div className="level-right-side">
      <div className="level-right">
        <h3>Zero to Hero</h3>
        <div className="grid-level-container">
          {imageSources.map((src, index) => (
            <div key={index} className="level-to-level" onClick={() => handleImageClick(index)}>
              <img src={selectedLevel==index+1?LevelImage1:src} alt={`Image ${index + 1}`}/>
              <h4>{numbers[index]}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="level-right">
        <div className="single-level">
          <h3>Level- {selectedLevel}</h3>
          <img src={LevelImage1} alt="" />
          <h4>{selectedLevel}</h4>
          <h3>Primary Level</h3>
        </div>
        <div className="primary-level">
            <div className="primary">
              <img src={PassportImage} alt=""/>
              <h4>150</h4>
            </div>
            <div className="primary">
              <img src={PuzzleImage} alt=""/>
              <h4>250</h4>
            </div>
            <div className="primary">
              <img src={PhysicsImage} alt=""/>
              <h4>300</h4>
            </div>
            <div className="primary">
              <img src={BookImage} alt=""/>
              <h4>300</h4>
            </div>
        </div>

      </div>
      </div>
      
    </>
  );
};

export default Level;
