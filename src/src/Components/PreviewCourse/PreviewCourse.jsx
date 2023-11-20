import "./PreviewCourse.scss";
import Learn from "./Components/Learn/Learn";
import Content from "./Components/Content/Content";

import { useState } from "react";
//mui
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//react player
import ReactPlayer from "react-player";

//icons
import Edit from "./Assets/edit.png";
import Book from "./Assets/book.png";
import User from "./Assets/user.png";
import Control from "./Assets/control.png";
import Write from "./Assets/write.png";
import { Link, useParams } from "react-router-dom";

const videoData = [
  {
    url: "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=1s",
    heading: "Zero to hero UI /UX Design with careerpedia",
    text: "Popular English speaking and listening course to communicate with English-speakers on the job, students, customers, etc.",
    user: "John Doe",
    exercises: "27",
    lessons: "20",
    tests: "8",
    price: "Rs 18,999/-",
    discountPrice: "Rs 25,999/-",
  },
];

// MUI Restyling
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9F43",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Montserrat",
        },
      },
    },
  },
});

const PreviewCourse = ({ active, paths, admin }) => {
  const { course } = useParams();
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="main-preview">
      <div className="preview-main">
        <div>Preview</div>
        {admin && (
          <Link className="add-content" to={"../course-details"}>
            Edit <img src={Edit} />
          </Link>
        )}
      </div>

      {videoData.map((video, index) => (
        <div key={index} className="video-main">
          <ReactPlayer url={video.url} className="video" controls={true} />
          <div className="video-content">
            <div className="video-content2">
              <h2 className="video-heading">{video.heading}</h2>
              <p className="video-text">{video.text}</p>
              <div className="main-icons">
                <div className="icons-main">
                  <span className="icons-text">
                    <img src={User} alt="" />
                    <span>{video.user} </span>
                  </span>
                  <span className="icons-text">
                    <img src={Control} alt="" />
                    <span>{video.exercises} exercises</span>
                  </span>
                </div>
                <div className="icons-main">
                  <span className="icons-text">
                    <img src={Book} alt="" />
                    <span>{video.lessons} lessons</span>
                  </span>
                  <span className="icons-text">
                    <img src={Write} alt="" />
                    <span>{video.tests} tests</span>
                  </span>
                </div>
              </div>
              {active == 0 ? (
                ""
              ) : (
                <div className="price">
                  <span className="price1">{video.price}</span>
                  <del className="price2">{video.discountPrice}</del>
                </div>
              )}
              {active == 0 || admin? (
                <Link
                  to={
                    course
                      ? `../${course}/course-content/${paths}`
                      : `course-content/${paths}`
                  }
                >
                  <button className="button">Play Now</button>
                </Link>
              ) : (
                <Link>
                  <button className="button">Enroll Now</button>
                </Link>
              ) }
            </div>
          </div>
        </div>
      ))}

      <div>
        <div className="Tabs-main">
          <ThemeProvider theme={theme}>
            <div className="tabs">
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="What you’ll Learn " className="tab" />
                <Tab label="Course Content" className="tab" />
              </Tabs>

              {admin && (
                <Link
                  to={"../add-content"}
                >
                  Add Content
                </Link>
              )}
            </div>
            <Box sx={{ width: "100%" }}>
              <TabPanel value={value} index={0}>
                <Learn />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Content />
              </TabPanel>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Typography component={'div'}>{children}</Typography>}</div>;
}

export default PreviewCourse;
