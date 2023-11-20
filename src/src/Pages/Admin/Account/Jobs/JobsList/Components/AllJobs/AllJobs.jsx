import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AllJobs.scss";

import img from "../../Assets/Rectangle.png";

import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "Logo", label: "Logo", align: "center" },
  { id: "CompanyName", label: "Company Name", align: "center" },
  { id: "JobRole", label: "Job Role", align: "center" },
  { id: "Salary", label: "Salary", align: "center" },
  { id: "PostedOn", label: "Posted On", align: "center" },
  { id: "PhoneNumber", label: "Phone Number", align: "center" },
  { id: "Email", label: "Email", align: "center" },
];

const createData = (
  Logo,
  CompanyName,
  JobRole,
  Salary,
  PostedOn,
  PhoneNumber,
  Email
) => {
  return {
    Logo,
    CompanyName,
    JobRole,
    Salary,
    PostedOn,
    PhoneNumber,
    Email,
  };
};

const rows = [
  createData(
    img,
    "Google",
    "Design",
    "$8000",
    "Monday, 4 Jan 2023",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Microsoft",
    "Development",
    "$8000",
    "Tuesday, 5 Jan 2023",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Apple",
    "Testing",
    "$8000",
    "Wednesday, 6 Jan 2023",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Apple",
    "Design",
    "$8000",
    "Thursday, 7 Jan 2023",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Google",
    "Testing",
    "$8000",
    "Friday, 8 Jan 2023",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Microsoft",
    "Development",
    "$8000",
    "1 Week ago",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Apple",
    "Design",
    "$8000",
    "1 Week ago",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Google",
    "Development",
    "$8000",
    "1 Week ago",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Google",
    "Testing",
    "$8000",
    "2 Weeks ago",
    9875632140,
    "lucky@gmail.com"
  ),
  createData(
    img,
    "Microsoft",
    "Design",
    "$8000",
    "2 Weeks ago",
    9875632140,
    "lucky@gmail.com"
  ),
];
const Courses = ["Design", "Development", "Testing"];

const AllJobs = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const isCourseMatch =
      selectedCourse === "All" ||
      (selectedCourse === "Total" && Courses.includes(row.JobRole)) ||
      (selectedCourse !== "All" && row.JobRole === selectedCourse);

    return isCourseMatch;
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/job/:id");
  };

  return (
    <div className="all-jobs">
      <div className="course-filters">
        <select
          id="course-select"
          value={selectedCourse}
          onChange={handleCourseChange}
          className="course-dropdown"
        >
          <option value="Total">All</option>
          {Courses.map((role) => (
            <option key={crypto.randomUUID()} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <Paper className="jobList">
        <Table className="job-list-table">
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
            {filteredRows.map((row) => (
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
                      {column.id === "Logo" ? (
                        <>
                          <img src={row.Logo} alt={value} />
                        </>
                      ) : column.id === "Controls" ? (
                        <>
                          <img
                            src={row.Controls}
                            alt={value}
                            id="controlImage"
                          />
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
      </Paper>
    </div>
  );
};

export default AllJobs;
