import "./Job.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Components
import AllJobs from "./Components/AllJobs/AllJobs";
import AppliedJobs from "./Components/AppliedJobs/AppliedJobs";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Job = () => {
  const { close } = useContext(SideBarContext);

  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="student-job">
      <Sidebar />
      <div className="job-content">
        <Navbar type="jobs" />
        <div
          className="job-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <ThemeProvider theme={theme}>
            <Tabs value={value} onChange={handleTabs} className="mui-tabs">
              <Tab label="All Jobs" className="tab" />
              <Tab label="Applied Jobs" className="tab" />
            </Tabs>

            <Box sx={{ width: "100%" }}>
              <TabPanel value={value} index={0}>
                <AllJobs />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AppliedJobs />
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

export default Job;
