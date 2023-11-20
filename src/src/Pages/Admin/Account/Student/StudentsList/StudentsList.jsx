import "./StudentsList.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Sidebar from "../../../../../Components/Admin/Sidebar/Sidebar";
import Navbar from "../../../../../Components/Admin/Navbar/Navbar";

//Components
import Enrolled from "./Components/Enrolled/Enrolled";
import Signup from "./Components/Signup/Signup";

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

const studentList = () => {
  const { close } = useContext(SideBarContext);

  const [value, setValue] = useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="admin-students">
      <Sidebar />
      <div className="admin-student-content">
        <Navbar type="student" />
        <div
          className="student-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <ThemeProvider theme={theme}>
            <Tabs value={value} onChange={handleTabs} className="mui-tabs">
              <Tab label="Enrolled" className="tab" />
              <Tab label="Sign Up" className="tab" />
            </Tabs>

            <Box sx={{ width: "100%" }}>
              <TabPanel value={value} index={0}>
                <Enrolled />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Signup />
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

export default studentList;
