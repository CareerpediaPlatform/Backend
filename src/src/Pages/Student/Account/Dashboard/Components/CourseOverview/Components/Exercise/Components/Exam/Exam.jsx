import { useState, useContext } from "react";
import "./Exam.scss";

// Navbar and Sidebar
import Navbar from "../../../../../../../../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../../../../../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../../../../../../../../Context/SidebarContext";

// Icons
import RightIcon from "../Assets/right.png";
import WrongIcon from "../Assets/wrong.png";

const mcqData = [
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A & B", "none"],
    correctAnswer: 2,
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["const", "var", "let", "none"],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A & B", "none"],
    correctAnswer: 2,
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["const", "var", "let", "none"],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A & B", "none"],
    correctAnswer: 2,
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["const", "var", "let", "none"],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A & B", "none"],
    correctAnswer: 2,
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["const", "var", "let", "none"],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A & B", "none"],
    correctAnswer: 2,
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["const", "var", "let", "none"],
    correctAnswer: 0,
  },
];

const Exam = () => {
  const { close } = useContext(SideBarContext);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(mcqData.length).fill(null)
  );
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChoiceSelect = (questionIndex, choiceIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = choiceIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const calculateMarks = () => {
    let marks = 0;
    for (let i = 0; i < mcqData.length; i++) {
      if (selectedAnswers[i] === mcqData[i].correctAnswer) {
        marks++;
      }
    }
    return marks;
  };

  const countAnsweredQuestions = () => {
    return selectedAnswers.filter((answer) => answer !== null).length;
  };
  const handleSubmit = () => {
    setShowAnswers(true);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="exams" />
        <div
          className="dashboard-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="Exam-questions">
            {showAnswers ? (
              <div className="answers-container">
                <div className="marks-section">
                  <h3>
                    Marks : {showAnswers ? calculateMarks() : 0} /{" "}
                    {mcqData.length}
                  </h3>
                  <h3>Total number of questions : {mcqData.length}</h3>
                  <h3>
                    Number of answered questions : {countAnsweredQuestions()}
                  </h3>
                  <h3>
                    Number of unanswered questions :{" "}
                    {mcqData.length - countAnsweredQuestions()}
                  </h3>
                </div>
                {mcqData.map((questionData, questionIndex) => (
                  <div key={questionIndex} className="answer-section">
                    <p className="question">
                      {questionIndex + 1}. {questionData.question}
                    </p>
                    <div className="answers">
                      {questionData.choices.map((choice, choiceIndex) => (
                        <p
                          key={choiceIndex}
                          className={`
        ${selectedAnswers[questionIndex] === choiceIndex ? "selected" : ""}
        ${choiceIndex === questionData.correctAnswer ? "correct" : ""}
      `}
                        >
                          ({String.fromCharCode(65 + choiceIndex)}) {choice}
                          {choiceIndex === questionData.correctAnswer ? (
                            <img src={RightIcon} alt="" className="ans-icon" />
                          ) : null}
                          {selectedAnswers[questionIndex] === choiceIndex &&
                          selectedAnswers[questionIndex] !==
                            questionData.correctAnswer ? (
                            <img src={WrongIcon} alt="" className="ans-icon" />
                          ) : null}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="answers-container">
                <div className="details">
                  <h2>Java Script Exam</h2>
                  <h3>Time duration: 20 min</h3>
                </div>
                {mcqData.map((questionData, questionIndex) => (
                  <div key={questionIndex} className="answer-section">
                    <div className="points">
                      <p className="question">
                        {questionIndex + 1}. {questionData.question}
                      </p>
                      <p className="point"> 1 Point</p>
                    </div>
                    <ul className="answers">
                      {questionData.choices.map((choice, choiceIndex) => (
                        <label>
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={choiceIndex}
                            checked={
                              selectedAnswers[questionIndex] === choiceIndex
                            }
                            onChange={() =>
                              handleChoiceSelect(questionIndex, choiceIndex)
                            }
                          />
                          {choice}
                        </label>
                      ))}
                    </ul>
                  </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
