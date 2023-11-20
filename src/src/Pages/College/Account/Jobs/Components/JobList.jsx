import { useState } from "react";
import "./JobList.scss";

import img from "../Assets/customer.png";

import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "Profile", label: "Profile", align: "center" },
  { id: "CandidateName", label: "Candidate Name", align: "center" },
  { id: "CompanyName", label: "Company Name", align: "center" },
  { id: "JobRole", label: "Job Role", align: "center" },
  { id: "Salary", label: "Salary", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

const createData = (
  Profile,
  CandidateName,
  CompanyName,
  JobRole,
  Salary,
  Status
) => {
  return {
    Profile,
    CandidateName,
    CompanyName,
    JobRole,
    Salary,
    Status,
  };
};

const rows = [
  createData(img, "Jenny", "Google", "Design", "$8000", "Selected"),
  createData(img, "Jenny", "Microsoft", "Development", "$8000", "Rejected"),
  createData(img, "Jenny", "Apple", "Testing", "$8000", "Rejected"),
  createData(img, "Jenny", "Apple", "Design", "$8000", "Selected"),
  createData(img, "Jenny", "Google", "Testing", "$8000", "Rejected"),
  createData(img, "Jenny", "Microsoft", "Development", "$8000", "Selected"),
  createData(img, "Jenny", "Apple", "Design", "$8000", "Selected"),
  createData(img, "Jenny", "Google", "Development", "$8000", "Selected"),
  createData(img, "Jenny", "Google", "Testing", "$8000", "Rejected"),
  createData(img, "Jenny", "Microsoft", "Design", "$8000", "Rejected"),
];
const Courses = ["Design", "Development", "Testing"];

const JobList = () => {
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
    <div className="college-jobs">
      <div className="course-filters">
        <div>
          <h3>All Candidates</h3>
        </div>
        <div>
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
              <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
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
                      {column.id === "Profile" ? (
                        <img src={row.Profile} alt={value} />
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

export default JobList;
