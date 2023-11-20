import "./AllInterview.scss";
import img from "../Assets/img.jpg";
import Close from "../Assets/close-circle.png";
import { useState } from "react";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

const columns = [
  { id: "Profile", label: "Profile", align: "center" },
  { id: "Student", label: "Student name", align: "center" },
  { id: "Date", label: "Date", align: "center" },
  { id: "Time", label: "Time", align: "center" },
  { id: "Level", label: "Level", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

function createData(Profile, Student, Date, Time, Level, Status) {
  return { Profile, Student, Date, Time, Level, Status };
}

const rows = [
  createData(img, "John Doe", "01 Oct 2023", "10:00 to 11:00", 5, "Promoted"),
  createData(img, "John Doe", "01 Oct 2023", "10:00 to 11:00", 5, "Promoted"),
  createData(img, "John Doe", "01 Oct 2023", "10:00 to 11:00", 5, "Promoted"),
  createData(img, "John", "25 Sep 2023", "10:00 to 11:00", 2, "Demoted"),
  createData(img, "John", "25 Sep 2023", "10:00 to 11:00", 2, "Demoted"),
  createData(img, "John", "25 Sep 2023", "10:00 to 11:00", 2, "Demoted"),
  createData(img, "John Doe", "01 Jan 2022", "10:00 to 11:00", 3, "Declined"),
  createData(img, "John Doe", "01 Jan 2022", "10:00 to 11:00", 3, "Declined"),
  createData(img, "John Doe", "01 Jan 2022", "10:00 to 11:00", 3, "Declined"),
];

const studentData = [
  {
    id: 1,
    communication: 42,
    studentName: "John Doe",
    work: 82,
    TechnicalSkill: 67,
    level: 5,
    Message: "lorem it good bad and bad is bad good is ",
    status: "Demoted",
  },
];

const getDateRange = (filter) => {
  const endDate = new Date();
  const startDate = new Date();

  if (filter === "Last Week") {
    startDate.setDate(endDate.getDate() - 7);
  } else if (filter === "Last Month") {
    startDate.setMonth(endDate.getMonth() - 1);
  } else if (filter === "Last Year") {
    startDate.setFullYear(endDate.getFullYear() - 1);
  }

  return { startDate, endDate };
};

function AllInterview() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    console.log("Status Filter:", event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    console.log("Date Filter:", event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const statusMatch = statusFilter === "All" || row.Status === statusFilter;

    if (["Last Week", "Last Month", "Last Year"].includes(dateFilter)) {
      const { startDate, endDate } = getDateRange(dateFilter);
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);

      const dateMatch =
        new Date(row.Date) >= startDate && new Date(row.Date) <= endDate;
      console.log("Date Match:", dateMatch);

      return statusMatch && dateMatch;
    } else {
      return statusMatch;
    }
  });

  return (
    <Paper className="mentorList">
      <div className="course-filters">
        <select
          id="dateFilter"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="course-dropdown"
        >
          <option value="All">Time-Line</option>
          <option value="Last Week">This Week</option>
          <option value="Last Month">This Month</option>
          <option value="Last Year">This Year</option>
        </select>

        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="course-dropdown"
        >
          <option value="All">Status</option>
          <option value="Promoted">Promoted</option>
          <option value="Demoted">Demoted</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      <Table className="mentor-list-table">
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
                  <Popup
                    key={column.id}
                    trigger={
                      column.id === "Profile" ? (
                        <TableCell className="table-data-list">
                          <img src={value} alt="Profile" />
                        </TableCell>
                      ) : (
                        <TableCell
                          align={column.align}
                          className="table-body-data"
                        >
                          {column.id === "Status" ? (
                            <button
                              className={`table-body-data ${
                                column.id === "Status"
                                  ? value === "Promoted"
                                    ? "promoted"
                                    : value === "Demoted"
                                    ? "demoted"
                                    : value === "Declined"
                                    ? "declined"
                                    : ""
                                  : ""
                              }`}
                            >
                              {value}
                            </button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    }
                    position="center center"
                    modal
                    closeOnDocumentClick
                    contentStyle={{
                      width: "600px",
                      padding: "20px",
                    }}
                  >
                    {(close) => (
                      <div className="popup-main-Container">
                        <img
                          src={Close}
                          className="close"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                          }}
                        />

                        <h3 className="popup-heading">Remarks</h3>
                        <div className="popup-mains">
                          <div className="popup-details">
                            <h4>Student Name</h4>
                            <h4>Level</h4>
                            <h4>Works</h4>
                            <h4>Communication </h4>
                            <h4>Technical Skill</h4>
                            <h4>Message</h4>
                            <h4>Status</h4>
                          </div>
                          <div className="popup-details">
                            <h4>:</h4>
                            <h4>:</h4>
                            <h4>:</h4>
                            <h4>:</h4>
                            <h4>:</h4>
                            <h4>:</h4>
                            <h4>:</h4>
                          </div>
                          <div className="popup-details">
                            {studentData.map((student) => (
                              <div
                                className={`popup-details ${
                                  column.id === "Status"
                                    ? student.status === "Promoted"
                                      ? "promoted"
                                      : student.status === "Demoted"
                                      ? "demoted"
                                      : student.status === "Declined"
                                      ? "declined"
                                      : ""
                                    : ""
                                }`}
                                key={student.id}
                              >
                                <p className="value">{student.studentName}</p>
                                <p className="value">{student.level}</p>
                                <p className="value">{student.work}</p>
                                <p className="value">{student.communication}</p>
                                <p className="value">
                                  {student.TechnicalSkill}
                                </p>
                                <p className="value">{student.Message}</p>
                                <p
                                  className={`value ${student.status.toLowerCase()}`}
                                >
                                  {student.status}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AllInterview;
