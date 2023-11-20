import "./AllThreads.scss";
import { useState } from "react";

import studentImg from "../../Assets/people.png";
import SingleThread from "../SingleThread/SingleThread";

const list = [
  {
    userName: "john",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "HTML Tags",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    userName: "rock",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "Colors",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    userName: "rock",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "DOM Manipulation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    userName: "rock",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "React Hooks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const AllThreads = () => {
  const [activeThreadIndex, setActiveThreadIndex] = useState(null);

  const handleThreadClick = (index) => {
    setActiveThreadIndex(index === activeThreadIndex ? null : index);
  };
  return (
    <div className="allThreads-cards">
      {list &&
        list.map((thread, index) => {
          return (
            <div className="thread-card" key={index}>
              <div className="card-heading">
                <div className="left">
                  <div className="circle" />
                  <h2>Thread # {thread.threadId}</h2>
                </div>
                <div className="right-time">Posted at {thread.postedDate}</div>
              </div>

              <div className="card-middle">
                <h3>
                  {" "}
                  Topic: <span>{thread.question}</span>{" "}
                </h3>
                <p>{thread.description}</p>
              </div>

              <div className="card-bottom">
                <div className="bottom-left">
                  <img src={studentImg} alt="people" />
                  <h3>{thread.userName}</h3>
                </div>
                <button
                  className="bottom-right"
                  onClick={() => handleThreadClick(index)}
                >
                  {activeThreadIndex === index
                    ? "Close Response"
                    : "View Response"}
                </button>
              </div>

              {activeThreadIndex === index && (
                <div className="video-list">
                  <SingleThread />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default AllThreads;
