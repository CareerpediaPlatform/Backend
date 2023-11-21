import { useState } from "react";
import "./PerformanceGraph.scss";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Monthly = [
  {
    name: "Jan",
    level: 2,
  },
  {
    name: "Feb",
    level: 5,
  },
  {
    name: "Mar",
    level: 8,
  },
  {
    name: "Apr",
    level: 1,
  },
  {
    name: "May",
    level: 3,
  },
  {
    name: "Jun",
    level: 9,
  },
  {
    name: "Jul",
    level: 4,
  },
  {
    name: "Aug",
    level: 6,
  },
  {
    name: "Sep",
    level: 12,
  },
  {
    name: "Oct",
    level: 10,
  },
  {
    name: "Nov",
    level: 11,
  },
  {
    name: "Dec",
    level: 7,
  },
];

const Weekly = [
  {
    name: "Mon",
    level: 2,
  },
  {
    name: "Tue",
    level: 5,
  },
  {
    name: "Wed",
    level: 8,
  },
  {
    name: "Thur",
    level: 1,
  },
  {
    name: "Fri",
    level: 3,
  },
  {
    name: "Sat",
    level: 9,
  },
  {
    name: "Sun",
    level: 4,
  },
];

const PerformanceGraph = () => {
  const [data, SetData] = useState(Monthly);
  const handleMonthlyClick = () => {
    SetData(Monthly);
  };

  const handleWeeklyClick = () => {
    SetData(Weekly);
  };

  return (
    <div className="performance-graph">
      <div className="headings">
        <h3>Academic Performance</h3>
        <div className="months">
          <span className="months-button" onClick={handleMonthlyClick}>
            Monthly
          </span>
          <span className="months-button" onClick={handleWeeklyClick}>
            Weekly
          </span>
        </div>
      </div>
      <BarChart width={730} height={300} data={data} className="bar-graph">
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="level" fill="#0557A2" barSize={18} />
      </BarChart>
    </div>
  );
};

export default PerformanceGraph;
