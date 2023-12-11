import "./RevenueGraph.scss";
import {useState} from "react"


import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Monthly = [
  {
    name: "Jan",
    revenue: 40000,
  },
  {
    name: "Feb",
    revenue: 35000,
  },
  {
    name: "Mar",
    revenue: 80000,
  },
  {
    name: "Apr",
    revenue: 27080,
  },
  {
    name: "May",
    revenue: 81890,
  },
  {
    name: "Jun",
    revenue: 62390,
  },
  {
    name: "Jul",
    revenue: 83490,
  },
  {
    name: "Aug",
    revenue: 27080,
  },
  {
    name: "Sep",
    revenue: 81890,
  },
  {
    name: "Oct",
    revenue: 62390,
  },
  {
    name: "Nov",
    revenue: 83490,
  },
  {
    name: "Dec",
    revenue: 53490,
  },
];

const Weekly = [
  {
    name: "Mon",
    revenue: 40,
  },
  {
    name: "Tue",
    revenue: 150,
  },
  {
    name: "Wed",
    revenue: 80,
  },
  {
    name: "Thur",
    revenue: 270,
  },
  {
    name: "Fri",
    revenue: 270,
  },

  {
    name: "Sat",
    revenue: 81,
  },
  {
    name: "Sun",
    revenue: 62,
  },
];

const RevenueGraph = () => {
  const [data, setData] = useState(Monthly);

  const handleMonthlyClick = () => {
    setData(Monthly);
  };

  const handleWeeklyClick = () => {
    setData(Weekly);
  };

  return (
    <div className="revenue-graph">
      <div className="headings">
        <h3>Earning Revenue</h3>
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
        <Bar dataKey="revenue" fill="#ADC0F8" barSize={18} />
      </BarChart>
    </div>
  );
};

export default RevenueGraph;
