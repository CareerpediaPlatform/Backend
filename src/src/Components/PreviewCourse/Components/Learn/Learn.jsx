import "./Learn.scss";

const Learns = [
  { text: "Popular English speaking and listening" },
  { text: "Popular English speaking and listening" },
  { text: "Popular English speaking and listening" },
  { text: "Popular English speaking and listening" },
  { text: "Popular English speaking and listening" },
];

const Learn = () => {
  return (
    <div className="Learn-main">
      {Learns.map((item) => (
        <p className="li" key={crypto.randomUUID()}>{item.text}</p>
      ))}
    </div>
  );
};

export default Learn;
