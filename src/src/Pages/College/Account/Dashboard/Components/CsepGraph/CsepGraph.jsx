import { useState } from "react";
import "./CsepGraph.scss";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const monthly = [
  {
    name: "Jan",
    gre: 0,
    tofel: 10,
    design: 40,
  },

  {
    name: "Feb",
    gre: 40,
    tofel: 60,
    design: 50,
  },

  {
    name: "Mar",
    gre: 30,
    tofel: 10,
    design: 90,
  },

  {
    name: "Apr",
    gre: 50,
    tofel: 40,
    design: 10,
  },

  {
    name: "May",
    gre: 80,
    tofel: 60,
    design: 40,
  },

  {
    name: "Jun",
    gre: 30,
    tofel: 70,
    design: 80,
  },

  {
    name: "Jul",
    gre: 10,
    tofel: 100,
    design: 60,
  },

  {
    name: "Aug",
    gre: 30,
    tofel: 50,
    design: 10,
  },

  {
    name: "Sep",
    gre: 40,
    tofel: 40,
    design: 80,
  },
  {
    name: "Oct",
    gre: 50,
    tofel: 90,
    design: 30,
  },
  {
    name: "Nov",
    gre: 80,
    tofel: 50,
    design: 70,
  },
  {
    name: "Dec",
    gre: 70,
    tofel: 35,
    design: 10,
  },
];

const weekly = [
  {
    name: "Mon",
    gre: 0,
    tofel: 10,
    design: 40,
  },

  {
    name: "Tue",
    gre: 40,
    tofel: 60,
    design: 50,
  },

  {
    name: "Wed",
    gre: 30,
    tofel: 10,
    design: 90,
  },

  {
    name: "Thur",
    gre: 50,
    tofel: 40,
    design: 10,
  },

  {
    name: "Fri",
    gre: 80,
    tofel: 60,
    design: 40,
  },

  {
    name: "Sat",
    gre: 30,
    tofel: 70,
    design: 80,
  },

  {
    name: "Sun",
    gre: 10,
    tofel: 100,
    design: 60,
  },
];

const CsepGraph = () => {
  const [data, SetData] = useState(monthly);

  const handleWeeklyClick = () => {
    SetData(weekly);
  };
  const handleMonthlyClick = () => {
    SetData(monthly);
  };

  return (
    <div className="csep-graph">
      <div className="top">
        <div className="headings">
          <h3>CSEP</h3>
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
            <p className="orange"></p>
            <span>Design</span>
          </div>
          <div className="color">
            <p className="blue"></p>
            <span>Development</span>
          </div>
          <div className="color">
            <p className="green"></p>
            <span>Testing</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer aspect={3} className="graph">
        <LineChart data={data}>
          <XAxis dataKey="name" color="#64748B" />
          <YAxis color="#64748B" />
          <Tooltip />

          <CartesianGrid strokeDasharray="1 1" />

          {/* <Line type="basis" dataKey="uv" stroke='red' activeDot={{ r:0}} dot={{r:0}}  /> */}

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
          <Line
            type="basis"
            dataKey="design"
            stroke="#FFBD35"
            activeDot={{ r: 0 }}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CsepGraph;
