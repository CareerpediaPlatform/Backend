import "./CoursePlayer.scss";
import Navbar from "../../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../../Components/Student/Sidebar/Sidebar";
import { SideBarContext } from "../../../../../Context/SidebarContext";
import Player from "./Components/Player/Player";
import { useContext, useState } from "react";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseContent from "./Components/CourseContent/CourseContent";
import Discussion from "./Components/Discussion/Discussion";
import Attachments from "./Components/Attachments/Attachments";
import UploadFiles from "./Components/UploadFiles/UploadFiles";
import Notes from "./Components/Notes/Notes";
import { useParams } from "react-router-dom";

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
const CoursePlayer = () => {
  const { course } = useParams();
  const { close } = useContext(SideBarContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="student-coursePlayer">
      <Sidebar />
      <div className="coursePlayer-content">
        <Navbar type={course} />
        <div
          className="coursePlayer-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="coursePlayer-container">
            <Player />

            {/*  */}
            <ThemeProvider theme={theme}>
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="Course Content" className="tab" />
                <Tab label="Attachments" className="tab" />
                <Tab label="Discussion" className="tab" />
                <Tab label="Upload Files" className="tab" />
                <Tab label="Notes" className="tab" />
              </Tabs>

              <Box sx={{ width: "100%" }}>
                <TabPanel value={value} index={0}>
                  <CourseContent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Attachments />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Discussion />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <UploadFiles />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Notes />
                </TabPanel>
              </Box>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Typography component={'div'}>{children}</Typography>}</div>;
}
export default CoursePlayer;
