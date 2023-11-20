import "./AllMentors.scss";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// Img
import Img from "../Assets/userProfile.png";

const columns = [
  { id: "Profile", label: "Profile", align: "center" },
  { id: "Mentor_Id", label: "Mentor Id", align: "center" },
  {
    id: "Name",
    label: "Name",
    align: "center",
  },
  {
    id: "Course",
    label: "Course",
    align: "center",
  },

  {
    id: "Phone_Number",
    label: "Phone Number",
    align: "center",
  },
  {
    id: "Email",
    label: "Email ID",
    align: "center",
  },
];

function createData(Profile, Mentor_Id, Name, Course, Phone_Number, Email) {
  return { Profile, Mentor_Id, Name, Course, Phone_Number, Email };
}

const rows = [
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
  createData(Img, 101, "Jack", "Front-end", 9874563210, "Henry@gmail.com"),
];

function AllMentors() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/mentor/:id");
  };

  return (
    <div className="mentor-list">
      <Table className="mentor-list-table">
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
                  key={crypto.randomUUID()}
                    align={column.align}
                    className="table-body-data"
                  >
                    {column.id == "Profile" ? <img src={Img} alt="" /> : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllMentors;
