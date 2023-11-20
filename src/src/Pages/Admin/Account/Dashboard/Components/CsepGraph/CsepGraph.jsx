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
} from "recharts";

const Monthly = [
  {
    name: "Jan",
    Development: 0,
    Testing: 10,
    design: 40,
  },

  {
    name: "Feb",
    Development: 40,
    Testing: 60,
    design: 50,
  },

  {
    name: "Mar",
    Development: 30,
    Testing: 10,
    design: 90,
  },

  {
    name: "Apr",
    Development: 50,
    Testing: 40,
    design: 10,
  },

  {
    name: "May",
    Development: 80,
    Testing: 60,
    design: 40,
  },

  {
    name: "Jun",
    Development: 30,
    Testing: 70,
    design: 80,
  },

  {
    name: "Jul",
    Development: 10,
    Testing: 100,
    design: 60,
  },

  {
    name: "Aug",
    Development: 30,
    Testing: 50,
    design: 10,
  },

  {
    name: "Sep",
    Development: 40,
    Testing: 40,
    design: 80,
  },
  {
    name: "Oct",
    Development: 50,
    Testing: 90,
    design: 30,
  },
  {
    name: "Nov",
    Development: 80,
    Testing: 50,
    design: 70,
  },
  {
    name: "Dec",
    Development: 70,
    Testing: 35,
    design: 10,
  },
];
const Weekly = [
  {
    name: "Mon",
    Development: 0,
    Testing: 10,
    design: 40,
  },

  {
    name: "Tue",
    Development: 40,
    Testing: 60,
    design: 50,
  },

  {
    name: "Web",
    Development: 30,
    Testing: 10,
    design: 90,
  },

  {
    name: "Thur",
    Development: 50,
    Testing: 40,
    design: 10,
  },

  {
    name: "Fri",
    Development: 80,
    Testing: 60,
    design: 40,
  },

  {
    name: "Sat",
    Development: 30,
    Testing: 70,
    design: 80,
  },

  {
    name: "Sun",
    Development: 10,
    Testing: 100,
    design: 60,
  },
];
const CsepGraph = () => {
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
            dataKey="Development"
            stroke="#0557A2"
            activeDot={{ r: 0 }}
            dot={{ r: 0 }}
          />

          <Line
            type="basis"
            dataKey="Testing"
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
