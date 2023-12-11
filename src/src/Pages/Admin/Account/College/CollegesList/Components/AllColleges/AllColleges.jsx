import "./AllColleges.scss";
import { useNavigate } from "react-router-dom";

//MUI
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

// Logo
import logo from "../Assets/logo.png";

const columns = [
  {
    id: "Logo",
    label: "College Logo",
    align: "center",
  },
  {
    id: "College_ID",
    label: "College ID",
    align: "center",
  },
  { id: "College_Name", label: "College Name", align: "center" },

  {
    id: "Founder_Name",
    label: "Founder Name",
    align: "center",
  },
  {
    id: "Email_ID",
    label: "Email ID",
    align: "center",
  },

  {
    id: "City",
    label: "City",
    align: "center",
  },
  {
    id: "Contact_Number",
    label: "Contact Number",
    align: "center",
  },
];

function createData(
  Logo,
  College_ID,
  College_Name,
  Founder_Name,
  Email_ID,
  City,
  Contact_Number
) {
  return {
    Logo,
    College_ID,
    College_Name,
    Founder_Name,
    Email_ID,
    City,
    Contact_Number,
  };
}

const rows = [
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    "9876543210"
  ),
  createData(
    logo,
    "0123",
    "Careerpedia",
    "Rahul Reddy",
    "rahul@gmail.com",
    "Hyderabad",
    9876543210
  ),
];

function AllColleges() {
  const navigate = useNavigate();

  const handleNavigate = (College_ID) => {
    navigate("/admin/college/${College_ID}");
  };

  return (
    <Paper className="all-colleges">
      <Table className="college-list-table">
        <TableHead className="table-head">
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={crypto.randomUUID()}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                className="table-head-data"
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {rows.map((row) => (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={crypto.randomUUID()}
              onClick={handleNavigate}
            >
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="table-body-data"
                  >
                    {column.id === "Logo" ? (
                      <img src={row.Logo} alt="College Logo" />
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
    </Paper>
  );
}

export default AllColleges;
