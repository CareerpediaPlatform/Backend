import "./TodayInterview.scss";
import img from "../Assets/img.jpg";
import Close from "../Assets/close-circle.png";

import { useState } from "react";

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
  createData(img, "John Doe", "20 Aug 2023", "10:00 to 11:00", 5),
  createData(img, "John", "20 Aug 2023", "10:00 to 11:00", 2),
  createData(img, "John Doe", "20 Aug 2023", "10:00 to 11:00", 5),
];

function AllInterview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Paper className="mentorList">
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
        <TableBody className="table-body-mentor">
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="table-body-data"
                  >
                    {column.id === "Profile" ? (
                      <img
                        src={value}
                        alt="Profile"
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : column.id === "Status" ? (
                      <Popup
                        trigger={<button className="Remarks">Remarks</button>}
                        position="center center"
                        modal
                        closeOnDocumentClick
                        contentStyle={{
                          width: "600px",
                          padding: "20px",
                        }}
                      >
                        {(close) => (
                          <div className="popup-main-Containers">
                            <img
                              src={Close}
                              className="close"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            />
                            <h3 className="popup-heading">Remarks</h3>

                            <div className="popup-main">
                              <div className="popup-detail">
                                <p>Student Name</p>
                                <p>Level</p>
                                <p>Works</p>
                                <p>Communication </p>
                                <p>Technical Skill</p>
                                <p>Message</p>
                              </div>
                              <div className="popup-dots">
                                <p className="dot">:</p>
                                <p className="dot">:</p>
                                <p className="dot"></p>
                                <p className="dot"></p>
                                <p className="dot"></p>
                                <p className="dot"></p>
                                <p className="dot"></p>
                              </div>
                              <div className="label">
                                <p className="number">{row.Student}</p>
                                <p className="number">{row.Level}</p>
                                <div className="inputs">
                                  <input
                                    placeholder="Enter here"
                                    className="input"
                                  />
                                  <input
                                    placeholder="Enter here"
                                    className="input"
                                  />
                                  <input
                                    placeholder="Enter here"
                                    className="input"
                                  />
                                  <textarea
                                    placeholder="Enter here"
                                    className="input"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="buttons">
                              <button
                                onClick={() => {
                                  console.log("modal closed ");
                                  close();
                                }}
                                className="button-promoted"
                              >
                                Promoted
                              </button>
                              <button
                                onClick={() => {
                                  console.log("modal closed ");
                                  close();
                                }}
                                className="button-Demoted"
                              >
                                Demoted
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
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
  );
}

export default AllInterview;
