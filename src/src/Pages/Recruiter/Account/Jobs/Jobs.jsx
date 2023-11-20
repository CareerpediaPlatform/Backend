import "./Jobs.scss";
import { useContext } from "react";
import { useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

//MUI
import { Tabs, Tab, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import AllJobs from "./AllJobs/AllJobs";
import ActiveJobs from "./ActiveJobs/ActiveJobs";

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
const Jobs = () => {
  const { close } = useContext(SideBarContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="recruiter-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="jobs" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="admin-interviews">
            <ThemeProvider theme={theme}>
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="Active Jobs" className="tab" />
                <Tab label="All Jobs" className="tab" />
              </Tabs>

              <TabPanel value={value} index={0}>
                <ActiveJobs />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AllJobs />
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

export default Jobs;
