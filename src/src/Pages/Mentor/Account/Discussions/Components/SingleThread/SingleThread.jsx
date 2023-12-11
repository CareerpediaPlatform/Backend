import "./SingleThread.scss";

const Response = [
  {
    name: "Vicky",
    postedAt: " 10/10/2023 02:30 PM",
    replyMsg:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Vicky",
    postedAt: " 10/10/2023 02:30 PM",
    replyMsg:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Vicky",
    postedAt: " 10/10/2023 02:30 PM",
    replyMsg:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Vicky",
    postedAt: " 10/10/2023 02:30 PM",
    replyMsg:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const SingleThread = () => {
  return (
    <div className="responses">
      {Response.map((response, index) => {
        return (
          <div className="student-response">
            <div className="details">
              <h3>{response.name}</h3>
              <p>{response.postedAt}</p>
            </div>
            <p className="response">{response.replyMsg}</p>
          </div>
        );
      })}
      <div className="mentor-response">
        <textarea placeholder="Post your response...." ></textarea>
      </div>
    </div>
  );
};

export default SingleThread;
