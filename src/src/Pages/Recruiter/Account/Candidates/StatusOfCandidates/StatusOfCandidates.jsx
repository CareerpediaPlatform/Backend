import "./StatusOfCandidates.scss";
import React, { useState } from "react";
import img from "../Assets/img.jpg";
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
  { id: "Candidate_Name", label: "Candidate Name", align: "center" },
  { id: "Job", label: "Job Role", align: "center" },
  { id: "Experience", label: "Experience", align: "center" },
  { id: "Salary", label: "Salary", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

const createData = (
  Profile,
  Candidate_Name,
  Job,
  Experience,
  Salary,
  Status
) => {
  return {
    Profile,
    Candidate_Name,
    Job,
    Experience,
    Salary,
    Status,
  };
};

const rows = [
  createData(img, "Henry", "Design", "3 Years", "$3000", "Selected"),
  createData(img, "Henry", "Development", "2 Years", "$3000", "Rejected"),
  createData(img, "Henry", "Testing", "4 Years", "$3000", "Selected"),
  createData(img, "Henry", "Design", "5 Years", "$3000", "Rejected"),
  createData(img, "Henry", "Design", "8 Years", "$3000", "Selected"),
  createData(img, "Henry", "Development", "9 Years", "$3000", "Rejected"),
  createData(img, "Henry", "Testing", "1 Years", "$3000", "Selected"),
  createData(img, "jackson", "Development", "2 Years", "$3000", "Rejected"),
];

const jobRoles = ["Design", "Development", "Testing"];

const StatusOfCandidates = () => {
  const [selectedJobRole, setSelectedJobRole] = useState("All");

  const handleJobRoleChange = (event) => {
    setSelectedJobRole(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return selectedJobRole === "All" || row.Job === selectedJobRole;
  });

  return (
    <div className="StatusOfCandidates">
      <div className="job-role-filters">
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

export default StatusOfCandidates;
