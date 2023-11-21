import "./JobsList.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

// Components
import AllJobs from "./Components/AllJobs/AllJobs";
import PendingJobs from "./Components/PendingJobs/PendingJobs";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Context
import { SideBarContext } from "../../../../../Context/SidebarContext";

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

const JobsList = () => {
  const { close } = useContext(SideBarContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="admin-jobs">
      <Sidebar />
      <div className="admin-job">
        <Navbar type="job" />
        <div
          className="job-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <ThemeProvider theme={theme}>
            <Tabs value={value} onChange={handleTabs} className="mui-tabs">
              <Tab label="All Jobs" className="tab" />
              <Tab label="Pending Jobs" className="tab" />
            </Tabs>

            <Box sx={{ width: "100%" }}>
              <TabPanel value={value} index={0}>
                <AllJobs />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PendingJobs />
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

export default JobsList;
