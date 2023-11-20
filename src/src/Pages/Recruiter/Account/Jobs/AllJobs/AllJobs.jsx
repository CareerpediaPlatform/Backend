import "./AllJobs.scss";
import React, { useState } from "react";
// import img from "../Assets/img.jpg";

import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "Job", label: "Job Role", align: "center" },
  { id: "Employment", label: "Employment Type", align: "center" },

  { id: "Experience", label: "Experience", align: "center" },
  { id: "Salary", label: "Salary", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

const createData = (Job, Employment, Experience, Salary, Status) => {
  return {
    Job,
    Employment,
    Experience,
    Salary,
    Status,
  };
};

const rows = [
  createData("Design", "Full - Time", "3 Years", "$8,000", "Selected"),
  createData("Development", "Part - Time", "3 Years", "$8,000", "Rejected"),
  createData("Testing", "Full - Time", "3 Years", "$8,000", "Selected"),
  createData("Design", "Full - Time", "0 Years", "$8,000", "Rejected"),
  createData("Design", "Part - Time", "3 Years", "$8,000", "Selected"),
  createData("Development", "Full - Time", "2 Years", "$8,000", "Rejected"),
  createData("Testing", "Part - Time", "3 Years", "$8,000", "Selected"),
  createData("Development", "Full - Time", "1 Years", "$8,000", "Rejected"),
];

const jobRoles = ["Design", "Development", "Testing"];

const AllJobs = () => {
  const [selectedJobRole, setSelectedJobRole] = useState("All");

  const handleJobRoleChange = (event) => {
    setSelectedJobRole(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return selectedJobRole === "All" || row.Job === selectedJobRole;
  });

  return (
    <div className="all-jobs">
      <div className="all-job-role-filters">
        <select
          value={selectedJobRole}
          onChange={handleJobRoleChange}
          className="course-dropdown"
        >
          <option value="All">All</option>
          {jobRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <Paper className="recruiterList">
        <Table className="recruiter-list-table">
          <TableHead className="table-head">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
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
            {filteredRows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
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

export default AllJobs;
