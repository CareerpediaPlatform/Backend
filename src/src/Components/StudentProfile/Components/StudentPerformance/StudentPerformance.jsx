import React, { useState } from "react";
import { Box } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";

import "./StudentPerformance.scss";
import BarChartGraph from "./BarChart/BarChartGraph";
import StackBarChat from "./StackBarChart/StackBarChart";
// import Frame from "../../Assets/Frame.png";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#84B3FB", // Change the color here
  },
  "&.MuiLinearProgress-root": {
    backgroundColor: "#f8f8f8", // Set the background color to #f8f8f8
  },
}));

const StudentPerformance = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const getGradientBackground = () => {
    const percentage = (sliderValue - 0) / (100 - 0); // Convert slider value to percentage
    const colorStops = `linear-gradient(90deg, #467FFF 0%, #F39438 ${
      percentage * 100
    }%, #F0A761 ${percentage * 100}%, #FFDAB7 100%)`;
    return colorStops;
  };
  return (
    <div className="single-student-performance">
      <div className="performance-details-heading">
        <h1>Student Performance</h1>
      </div>
      <div className="student-progress-part1">
        <div className="border-linear-progress-div">
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={65}
              className="border-linear-progress"
            />
            <span className="progress-percent65">65%</span>
            <span>English</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={50}
              className="border-linear-progress"
            />
            <span className="progress-percent50">50%</span>
            <span>Logical Reasoning</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={78}
              className="border-linear-progress"
            />
            <span className="progress-percent78">78%</span>
            <span>CSEP</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={0}
              className="border-linear-progress"
            />
            <span>Portfolio</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={0}
              className="border-linear-progress"
            />
            <span>Resume</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={0}
              className="border-linear-progress"
            />
            <span>Interviews</span>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={0}
              className="border-linear-progress"
            />
            <span>Linked In Profile</span>
          </Box>
        </div>

        <div className="linear-progress-div">
          <span>Unemployable</span>
          {/* <img src={Frame} alt="" className="progress-frame" /> */}
          <Box
            sx={{
              width: "100%",
              background: getGradientBackground(),
              position: "relative",
              borderRadius: "5px",
              height: "5px",
              // overflow: "hidden", // Hide the overflowing slider button
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-5px", // Adjust the position of the slider button
                left: `${sliderValue}%`, // Position the slider button according to the slider value
                width: "15px",
                height: "15px",

                borderRadius: "5px",
                backgroundColor: "#000",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                // zIndex: 999,
              }}
            />
            <Slider
              value={sliderValue}
              // onChange={handleChange}
              className="linear-progress"
              sx={{
                opacity: 0, // Hide the default slider track
                "& .MuiSlider-thumb": {
                  visibility: "hidden", // Hide the default slider thumb
                },
              }}
            />
          </Box>
          <span>Employable</span>
        </div>
      </div>

      <div className="student-progress-part2">
        <div className="student-progress-part2">
          <div className="student-englishLogical">
            <BarChartGraph />
          </div>
          <div className="student-UI-UX">
            <div className="student-progress-heading">
              <StackBarChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
