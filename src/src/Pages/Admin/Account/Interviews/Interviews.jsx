import "./Interviews.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

//MUI
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import TodayInterviews from "./Components/TodayInterviews/TodayInterviews";
import AllInterviews from "./Components/AllInterviews/AllInterviews";

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
    <div className="admin-interviews">
      <Sidebar />
      <div className="admin-interview-content">
        <Navbar type="interview" />
        <div
          className="interview-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="interview-tabs">
            <ThemeProvider theme={theme}>
              <Tabs value={value} onChange={handleTabs} className="mui-tabs">
                <Tab label="Today's Interviews" className="tab" />
                <Tab label="All Interviews" className="tab" />
              </Tabs>
             
              <TabPanel value={value} index={0}>
                <TodayInterviews />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AllInterviews />
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
