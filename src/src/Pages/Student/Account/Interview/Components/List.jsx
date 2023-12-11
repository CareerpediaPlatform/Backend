import "./List.scss";

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
  { id: "Level", label: "Level", align: "center" },

  { id: "Date", label: "Date", align: "center" },
  { id: "Time", label: "Time", align: "center" },
  { id: "Interviewer", label: "Interviewer", align: "center" },
  { id: "Status", label: "Status", align: "center" },
];

function createData(Level, Date, Time, Interviewer, Status) {
  return { Level, Date, Time, Interviewer, Status };
}

const rows = [
  createData(5, "20 Aug 2023", "10:00 to 11:00", "John Doe", "Promoted"),
  createData(4, "20 Aug 2023", "10:00 to 11:00", "John", "Demoted"),
  createData(3, "20 Aug 2023", "10:00 to 11:00", "John Doe", "Declined"),
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

function List() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Paper className="studentList">
      <Table className="student-list-table">
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
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <Popup
                    key={column.id}
                    trigger={
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

export default List;
