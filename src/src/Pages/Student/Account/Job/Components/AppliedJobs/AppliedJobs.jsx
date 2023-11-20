import { useState } from "react";

import "./AppliedJobs.scss";

import { useContext } from "react";

// Navbar and Sidebar
import Navbar from "../../../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../../../Context/SidebarContext";

import img1 from "../../Assets/eye.png";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "CompanyName", label: "Company Name", align: "center" },
  { id: "JobRole", label: "Job Role", align: "center" },
  { id: "EmploymentType", label: "Employment Type", align: "center" },
  { id: "AppliedOn", label: "Applied On", align: "center" },
  { id: "Salary", label: "Salary", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

const createData = (
  CompanyName,
  JobRole,
  EmploymentType,
  AppliedOn,
  Salary,
  Status
) => {
  return {
    CompanyName,
    JobRole,
    EmploymentType,
    AppliedOn,
    Salary,
    Status,
  };
};

const rows = [
  createData(
    "Google",
    "UI Designer",
    "Full - Time",
    "2 Weeks ago",
    "$8,000",
    "Selected"
  ),
  createData(
    "Microsoft",
    "React Developer",
    "Part - Time",
    "4 Months ago",
    "$8,000",
    "Rejected"
  ),
  createData(
    "Apple",
    "QA Testing",
    "Full - Time",
    "2 Weeks ago",
    "$8,000",
    "Rejected"
  ),
  createData(
    "Apple",
    "Graphic Design",
    "Part - Time",
    "1 Month ago",
    "$8,000",
    "Selected"
  ),
  createData(
    "Google",
    "UI Testing",
    "FreeLancer",
    "2 Weeks ago",
    "$8,000",
    "Rejected"
  ),
  createData(
    "Microsoft",
    "Backend Developer",
    "Full - Time",
    "1 Week ago",
    "$8,000",
    "Selected"
  ),
  createData("Apple", "Design", "Part Time", "1 Week ago", "$8000", "Rejected"),
  createData(
    "Google",
    "Fronted Developer",
    "FreeLancer",
    "1 Week ago",
    "$8,000",
    "Selected"
  ),
  createData(
    "Google",
    "UI Developer",
    "Internship",
    "2 Weeks ago",
    "$8,000",
    "Rejected"
  ),
  createData(
    "Microsoft",
    "UI Developer",
    "Internship",
    "2 Weeks ago",
    "$8,000",
    "Selected"
  ),
];

const AppliedJobs = () => {
  const { close } = useContext(SideBarContext);
  const [selectedCourse, setSelectedCourse] = useState("All");

  const filteredRows = rows.filter((row) => {
    const isCourseMatch =
      selectedCourse === "All" || selectedCourse === "Total";
    return isCourseMatch;
  });
  return (
    <div className="applied-jobs">
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
                      {value}
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

export default AppliedJobs;
