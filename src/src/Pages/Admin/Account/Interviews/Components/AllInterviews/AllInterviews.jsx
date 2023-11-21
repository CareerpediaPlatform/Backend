import "./AllInterviews.scss";
import { useState } from "react";

// Images
import img from "../Assets/img.jpg";
import Close from "../Assets/close-circle.png";



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
  { id: "Course", label: "Course", align: "center" },
  { id: "Student", label: "Student name", align: "center" },
  { id: "Interviewer", label: "Interviewer", align: "center" },
  { id: "Time", label: "Time", align: "center" },
  { id: "Date", label: "Date", align: "center" },
  { id: "Recording", label: "Recordings", align: "center" },
];

function createData(
  Level,
  Course,
  Student,
  Interviewer,
  Time,
  Date,
  Recording
) {
  return { Level, Course, Student, Interviewer, Time, Date, Recording };
}

const rows = [
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Apr 2023",
    "https://meet.google.com/rcd-sini-tyj"
  ),
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Apr 2023",
    "https://meet.google.com/rcd-sini-tyj"
  ),
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Apr 2023",
    "https://meet.google.com/rcd-sini-tyj"
  ),
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Apr 2023",
    "https://meet.google.com/rcd-sini-tyj"
  ),
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Apr 2023",
    "https://meet.google.com/rcd-sini-tyj"
  ),
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

function AllInterview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-allInterviews">
      <Table className="allInterviews-table">
        <TableHead className="table-head">
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
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
                        {value}
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
                            <p className="dot">:</p>
                            <p className="dot">:</p>
                            <p className="dot">:</p>
                            <p className="dot">:</p>
                            <p className="dot">:</p>
                            <p className="dot">:</p>
                            <p className="dot">:</p>
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
    </div>
  );
}

export default AllInterview;
