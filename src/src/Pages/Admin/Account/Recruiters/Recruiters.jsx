import "./Recruiters.scss";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Sidebar and Navbar
import Navbar from "../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

//MUI
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

// Popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Logo image
import logo from "./Assets/companyLogo.png";

const columns = [
  { id: "logo", label: "Logo" },
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "recruiterName",
    label: "Recruiter Name",
  },

  {
    id: "sector",
    label: "Sector",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email ID",
  },
];

function createData(
  logo,
  companyName,
  recruiterName,
  sector,
  city,
  phoneNumber,
  email
) {
  return {  logo,
  companyName,
  recruiterName,
  sector,
  city,
  phoneNumber,
  email};
}

const rows = [
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30", 9874563215,"Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30", 9874563215,"Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30", 9874563215,"Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30",9874563215, "Rahul@gmail.com"),
  createData(logo, "Inkprog", "Rahul", "IT", "30", 9874563215,"Rahul@gmail.com"),
];

const Recruiters = () => {
  const { close } = useContext(SideBarContext);
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/recruiter/:id");
  };

  // Popup
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  // Creating New Recruiter
  let mailFormat =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const [recruiter, setRecruiter] = useState({
    email: "",
    password: "",
  });

  const { email, password } = recruiter;

  const generatePassword = (e) => {
    e.preventDefault();
    if (email == "") {
      return toast.error("please enter email first !");
    }
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }

    const length = 4;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const passwordArray = new Uint32Array(length);
    window.crypto.getRandomValues(passwordArray);

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(passwordArray[i] % charset.length);
    }

    setRecruiter({ ...recruiter, password: "careerpedia" + generatedPassword });
  };

  const handleEmailChange = (e) => {
    setRecruiter({ ...recruiter, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (email === "" && password === "") {
    //   return toast.error("email and password required!");
    // }
    // if (password === "") {
    //   return toast.error("please generate password first !");
    // }
    if (email === "") {
      return toast.error("email required!");
    }
    if (!email.match(mailFormat)) {
      return toast.error("Invalid email !");
    }
    toast.success("New Recruiter Created !");
    console.log(college);
  };

  return (
    <div className="admin-recruiters">
      <Sidebar />
      <div className="admin-recruiter-content">
        <Navbar type="dashboard" />
        <div
          className="recruiter-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="recruiter-headings">
            <h3>All Recruiters</h3>
            <Popup
              trigger={<button>Create New Recruiter</button>}
              modal
              onClose={closePopup} // Close the popup when clicked outside
            >
              {(close) => (
                <div className="recruiter-popup">
                  <button className="close-button" onClick={close}>
                    X
                  </button>
                  <form className="create-form">
                    <h3>Create Login</h3>

                    <div className="input-data">
                      <input
                        type="email"
                        placeholder="Email Id"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <button onClick={handleSubmit} className="submit-btn">
                      Submit
              </button> 
                  </form>
                </div>
              )}
            </Popup>
          </div>
          <div className="recruiterList">
            <Table className="recruiter-list-table">
              <TableHead className="table-head">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                    key={crypto.randomUUID()}            
                      className="table-head-data"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {rows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()} onClick={handleNavigate}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                        key={crypto.randomUUID()}
                          align={column.align}
                          className="table-body-data"
                        >
                          {column.id === "logo" ? (
                            <>
                              <img src={row.logo} alt={value} />
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
