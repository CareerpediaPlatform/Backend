import "./Interviews.scss";
import { useContext } from "react";
import { useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

import AllInterview from "../Interviews/AllInterview/AllInterview";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import TodayInterview from "../Interviews/TodayInterview/TodayInterview";
// import AllInterviews from "./Components/AllInterviews/AllInterviews";

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
const Interviews = () => {
  const { close } = useContext(SideBarContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mentor-interviews">
      <Sidebar />
      <div className="interview-content">
        <Navbar type="interviews" />
        <div
          className="interview-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          {/* <AllInterview /> */}
          <div className="admin-interviews">
            <ThemeProvider theme={theme}>
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="Today's Interviews" className="tab" />
                <Tab label="All Interviews" className="tab" />
              </Tabs>

              <TabPanel value={value} index={0}>
                <TodayInterview />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AllInterview />
              </TabPanel>
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

export default Interviews;
