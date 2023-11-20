import "./PaymentsList.scss";
import { useState } from "react";

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
  { id: "PaymentId", label: " Payment Id", align: "center" },
  { id: "StudentName", label: "Student Name", align: "center" },
  { id: "PaymentType", label: "Payment Type", align: "center" },
  { id: "PaymentFor", label: "Payment For", align: "center" },
  { id: "Amount", label: "Amount", align: "center" },
  { id: "DateTime", label: "Date & Time", align: "center" },
];

function createData(
  PaymentId,
  StudentName,
  PaymentType,
  PaymentFor,
  Amount,
  DateTime
) {
  return { PaymentId, StudentName, PaymentType, PaymentFor, Amount, DateTime };
}

const rows = [
  createData(
    "1234569874",
    "John Williams",
    "UPI",
    "Course",
    "20,000",
    "12-08-2023 05:10PM"
  ),
  createData(
    "1234569874",
    "John Williams",
    "UPI",
    "Interview",
    "20,000",
    "12-08-2023 05:10PM"
  ),
  createData(
    "1234569874",
    "John Williams",
    "UPI",
    "Course",
    "20,000",
    "12-08-2023 05:10PM"
  ),
  createData(
    "1234569874",
    "John Williams",
    "NetBanking",
    "Course",
    "20,000",
    "12-08-2023 05:10PM"
  ),
  createData(
    "1234569874",
    "John Williams",
    "Cash",
    "Interview",
    "20,000",
    "12-08-2023 05:10PM"
  ),
];

const studentData = [
  {
    id: 1,
    level: 5,
    studentName: "John Doe",
    studentId: 12345,
    Course: "Front End Development",
    PaymentId: 98745632210,
    status: "Success",
  },
];

const paymentFor = ["Course", "Interview"];

function PaymentsList() {
  const [isOpen, setIsOpen] = useState(false);

  // Filter
  const [payment, setPayment] = useState("All");

  const handleCourseChange = (event) => {
    setPayment(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const isPaymentMatch =
      payment === "All" ||
      (payment === "Total" && paymentFor.includes(row.PaymentFor)) ||
      (payment !== "All" && row.PaymentFor === payment);

    return isPaymentMatch;
  });

  return (
    <div className="payments">
      <div className="headings">
        <h3>All Payments</h3>
        <select
          id="course-select"
          value={payment}
          onChange={handleCourseChange}
          className="course-dropdown"
        >
          <option value="Total" >
           Select Type
          </option>

          {paymentFor.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>
      </div>
      <div className="payment-table">
        <Table>
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
            {filteredRows.map((row, index) => (
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
                              <h4>Level</h4>
                              <h4>Student Name</h4>
                              <h4>Student Id</h4>
                              <h4>Course </h4>
                              <h4>Payment Id</h4>
                              <h4>Status</h4>
                            </div>
                            <div className="popup-details">
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
                                      ? student.status === "Success"
                                        ? "success"
                                        : student.status === "Fail"
                                        ? "fail"
                                        : ""
                                      : ""
                                  }`}
                                  key={student.id}
                                >
                                  <p className="value">{student.level}</p>
                                  <p className="value">{student.studentName}</p>
                                  <p className="value">{student.studentId}</p>
                                  <p className="value">{student.Course}</p>
                                  <p className="value">{student.PaymentId}</p>
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
    </div>
  );
}

export default PaymentsList;
