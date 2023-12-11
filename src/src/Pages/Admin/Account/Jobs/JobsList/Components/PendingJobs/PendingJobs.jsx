import { useState } from "react";
import "./PendingJobs.scss";

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
  { id: "Status", label: "Status", align: "center" },
];

const createData = (Logo, CompanyName, JobRole, Salary, PostedOn, Status) => {
  return {
    Logo,
    CompanyName,
    JobRole,
    Salary,
    PostedOn,
    Status,
  };
};

const rows = [
  createData(
    img,
    "Google",
    "Design",
    "$8000",
    "Monday, 4 Jan 2023",
    "Selected"
  ),
  createData(
    img,
    "Microsoft",
    "Development",
    "$8000",
    "Tuesday, 5 Jan 2023",
    "Rejected"
  ),
  createData(
    img,
    "Apple",
    "Testing",
    "$8000",
    "Wednesday, 6 Jan 2023",
    "Rejected"
  ),
  createData(
    img,
    "Apple",
    "Design",
    "$8000",
    "Thursday, 7 Jan 2023",
    "Selected"
  ),
  createData(
    img,
    "Google",
    "Testing",
    "$8000",
    "Friday, 8 Jan 2023",
    "Rejected"
  ),
  createData(
    img,
    "Microsoft",
    "Development",
    "$8000",
    "1 Week ago",
    "Selected"
  ),
  createData(img, "Apple", "Design", "$8000", "1 Week ago", "Selected"),
  createData(img, "Google", "Development", "$8000", "1 Week ago", "Selected"),
  createData(img, "Google", "Testing", "$8000", "2 Weeks ago", "Rejected"),
  createData(img, "Microsoft", "Design", "$8000", "2 Weeks ago", "Rejected"),
];
const Courses = ["Design", "Development", "Testing"];

const PendingJobs = () => {
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
  return (
    <div className="pending-jobs">
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
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={crypto.randomUUID()}
                      align={column.align}
                      className={`table-body-data ${
                        column.id === "Status" && value === "Selected"
                          ? "selected-status"
                          : column.id === "Status" && value === "Rejected"
                          ? "rejected-status"
                          : ""
                      }`}
                    >
                      {column.id === "Logo" ? (
                        <img src={row.Logo} alt={value} />
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

export default PendingJobs;
