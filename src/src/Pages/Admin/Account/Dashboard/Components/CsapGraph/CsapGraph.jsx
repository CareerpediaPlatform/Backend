import { useState } from "react";
import "./CsapGraph.scss";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Monthly = [
  {
    name: "Jan",
    gre: 0,
    tofel: 10,
  },

  {
    name: "Feb",
    gre: 40,
    tofel: 60,
  },

  {
    name: "Mar",
    gre: 30,
    tofel: 10,
  },

  {
    name: "Apr",
    gre: 50,
    tofel: 40,
  },

  {
    name: "May",
    gre: 80,
    tofel: 60,
  },

  {
    name: "Jun",
    gre: 30,
    tofel: 70,
  },

  {
    name: "Jul",
    gre: 10,
    tofel: 100,
  },

  {
    name: "Aug",
    gre: 30,
    tofel: 50,
  },

  {
    name: "Sep",
    gre: 40,
    tofel: 40,
  },
  {
    name: "Oct",
    gre: 50,
    tofel: 90,
  },
  {
    name: "Nov",
    gre: 80,
    tofel: 50,
  },
  {
    name: "Dec",
    gre: 70,
    tofel: 35,
  },
];

const Weekly = [
  {
    name: "Mon",
    gre: 0,
    tofel: 10,
  },

  {
    name: "Tue",
    gre: 40,
    tofel: 60,
  },

  {
    name: "Wed",
    gre: 30,
    tofel: 10,
  },

  {
    name: "Thur",
    gre: 50,
    tofel: 40,
  },

  {
    name: "Fri",
    gre: 80,
    tofel: 60,
  },

  {
    name: "Sat",
    gre: 30,
    tofel: 70,
  },

  {
    name: "Sun",
    gre: 10,
    tofel: 100,
  },
];

const CsapGraph = () => {
  const [data, SetData] = useState(Monthly);

  const handleWeeklyClick = () => {
    SetData(Weekly);
  };
  const handleMonthlyClick = () => {
    SetData(Monthly);
  };
  return (
    <div className="csap-graph">
      <div className="top">
        <div className="headings">
          <h3>CSAP</h3>
          <div className="months">
            <span className="months-button" onClick={handleMonthlyClick}>
              Monthly
            </span>
            <span className="months-button" onClick={handleWeeklyClick}>
              Weekly
            </span>
          </div>
        </div>
        <div className="colors">
          <div className="color">
            <p className="green"></p>
            <span>GRE</span>
          </div>
          <div className="color">
            <p className="blue"></p>
            <span>TOFEL</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer aspect={3}>
        <LineChart
          data={data}
          aspect={3}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          className="graph"
        >
          <XAxis dataKey="name" color="#64748B" />
          <YAxis color="#64748B" />
          <Tooltip />

          <CartesianGrid strokeDasharray="1 1" />

          <Line
            type="basis"
            dataKey="gre"
            stroke="#0557A2"
            activeDot={{ r: 0 }}
            dot={{ r: 0 }}
          />

          <Line
            type="basis"
            dataKey="tofel"
            stroke="#34B53A"
            activeDot={{ r: 0 }}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CsapGraph;
