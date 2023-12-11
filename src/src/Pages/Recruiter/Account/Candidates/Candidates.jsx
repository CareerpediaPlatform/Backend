import "./Candidates.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import AllCandidates from "./AllCandidates/AllCandidates";
import StatusOfCandidates from "./StatusOfCandidates/StatusOfCandidates";

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
const Candidates = () => {
  const { close } = useContext(SideBarContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mentor-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="candidate" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          {/* <AllInterview /> */}
          <div className="admin-interviews">
            <ThemeProvider theme={theme}>
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="All Candidates" className="tab" />
                <Tab label="Status of Candidates" className="tab" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <AllCandidates />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <StatusOfCandidates />
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

export default Candidates;
