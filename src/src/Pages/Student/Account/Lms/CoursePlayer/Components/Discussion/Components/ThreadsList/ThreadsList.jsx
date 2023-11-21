import { useEffect, useState } from "react";
import "./ThreadsList.scss";
import axios from "axios";
import peopleIcon from "../../../../../../Assets/people.png";
import { getDiscussion } from "../../../../../../../../../Api/Discussion";
import { useSelector, useDispatch } from "react-redux";
import { disscussion } from "../../../../../../../../../redux/lmsSlice";

const list = [
  {
    userName: "john",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    userName: "rock",
    number: "2023-CS123",
    postedAt: "12:45 AM",
    question: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const ThreadsList = ({ setChange }) => {
  const [value, setValue] = useState("latest");
  
  const [activeThreadIndex, setActiveThreadIndex] = useState(null);

  const handleThreadClick = (index) => {
    setActiveThreadIndex(index === activeThreadIndex ? null : index);
  };
  const [threads, setThreads] = useState(null);

  // const getdata=async()=>{
  //   let data=await getDiscussion("uiux1111")
  //         setThreads(data.data)
  // }
  //       useEffect(()=>{
  //         getdata()
  //       },[])
  return (
    <div className="Discussion-threads">
      <div className="discussion-top-bar">
        <div className="discussion-top-bar-left">
          <h2>Sort By</h2>
          <div className="discussion-switch">
            <button
              style={{ background: value === "latest" ? "#FF9F43" : "#f1ebeb" }}
              onClick={() => setValue("latest")}
            >
              Latest
            </button>
            <button
              style={{ background: value === "old" ? "#FF9F43" : "#f1ebeb" }}
              onClick={() => setValue("old")}
            >
              Old
            </button>
          </div>
        </div>
        <button
          className="discussion-top-bar-right"
          onClick={() => setChange(1)}
        >
          + NEW THREAD
        </button>
      </div>

      <div className="thread-cards">
        {list &&
          list.map((thread, index) => {
            return (
              <div className="threads-cards-card" key={index}>
                <div className="threads-cards-card-heading">
                  <div className="left">
                    <div className="circle" />
                    <h2>Thread # {thread.threadId}</h2>
                  </div>
                  <div className="right-time">
                    Posted at {thread.postedDate}
                  </div>
                </div>

                <div className="threads-cards-card-middle">
                  <h3>{thread.question}</h3>
                  <p>{thread.description}</p>
                </div>

                <div className="threads-cards-card-bottom">
                  <div className="bottom-left">
                    <img src={peopleIcon} alt="people" />
                    <h3>{thread.userName}</h3>
                  </div>
                  <button className="bottom-right">Open Thread</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ThreadsList;
