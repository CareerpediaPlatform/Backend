import "./StudentList.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import img from "../Assets/customer.png";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "Profile", label: "Profile", align: "center" },
  { id: "Student_Name", label: "Student Name", align: "center" },
  { id: "Course", label: "Course", align: "center" },
  { id: "Email_ID", label: "Email ID", align: "center" },
  { id: "Level", label: "Level", align: "center" },
  { id: "Progress", label: "Progress", align: "center" },
];

const createData = (
  Profile,
  Student_Name,
  Course,
  Email_ID,
  Level,
  Percentage,
  Progress
) => {
  return {
    Profile,
    Student_Name,
    Course,
    Email_ID,
    Level,
    Percentage,
    Progress,
  };
};

const rows = [
  createData(img, "Henry", "Design", "Henry@gmail.com", "01", "90%"),
  createData(img, "Henry", "Development", "Henry@gmail.com", "01", "80%"),
  createData(img, "Henry", "Testing", "Henry@gmail.com", "01", "30%"),
  createData(img, "Henry", "Design", "Henry@gmail.com", "01", "40%"),
  createData(img, "Henry", "TOFEL", "Henry@gmail.com", "01", "50%"),
  createData(img, "Henry", "GRE", "Henry@gmail.com", "01", "80%"),
  createData(img, "Henry", "Design", "Henry@gmail.com", "01", "10%"),
  createData(img, "Henry", "Development", "Henry@gmail.com", "01", "100%"),
  createData(img, "Henry", "Testing", "Henry@gmail.com", "01", "90%"),
  createData(img, "Henry", "GRE", "Henry@gmail.com", "01", "90%"),
];
const Courses = ["Design", "Development", "Testing"];
const SpecialCourses = ["GRE", "TOFEL"];

const StudentList = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedSpecialCourse, setSelectedSpecialCourse] = useState("All");

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedSpecialCourse("All"); // Reset special course selection
  };

  const handleSpecialCourseChange = (event) => {
    setSelectedSpecialCourse(event.target.value);
    setSelectedCourse("All"); // Reset course selection
  };

  const filteredRows = rows.filter((row) => {
    const isCourseMatch =
      selectedCourse === "All" ||
      (selectedCourse === "Total" && Courses.includes(row.Course)) ||
      (selectedCourse !== "All" && row.Course === selectedCourse);

    const isSpecialCourseMatch =
      selectedSpecialCourse === "All" ||
      (selectedSpecialCourse === "Total" &&
        SpecialCourses.includes(row.Course)) ||
      (selectedSpecialCourse !== "All" && row.Course === selectedSpecialCourse);

    return isCourseMatch && isSpecialCourseMatch;
  });
  // Navigation

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/college/student/:id");
  };

  return (
    <div className="college-students">
      <div className="course-filters">
        <div>
          <h3>All Students</h3>
        </div>
        <div className="select-courses">
          <select
            id="course-select"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="course-dropdown"
          >
            <option value="All" disabled>
              CSEP
            </option>
            <option value="Total">All</option>
            {Courses.map((course) => (
              <option key={crypto.randomUUID()} value={course}>
                {course}
              </option>
            ))}
          </select>
          <select
            id="special-course-select"
            value={selectedSpecialCourse}
            onChange={handleSpecialCourseChange}
            className="course-dropdown"
          >
            <option value="All" disabled>
              CSAP
            </option>
            <option value="Total">All</option>
            {SpecialCourses.map((course) => (
              <option key={crypto.randomUUID()} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Paper className="collegeList">
        <Table className="college-list-table">
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
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={crypto.randomUUID()}
                onClick={handleNavigate}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={crypto.randomUUID()}
                      align={column.align}
                      className="table-body-data"
                    >
                      {column.id === "Profile" ? (
                        <>
                          <img src={row.Profile} alt={value} />
                        </>
                      ) : column.id === "Progress" ? (
                        <>
                          <Box sx={{ position: "relative" }}>
                            <CircularProgress
                              variant="determinate"
                              sx={{
                                color: "#E9ECEF",
                                position: "absolute",
                              }}
                              size={40}
                              thickness={4}
                              value={100}
                            />
                            <CircularProgress
                              value={parseInt(row.Percentage)}
                              variant="determinate"
                              sx={{
                                color:
                                  parseInt(row.Percentage) >= 50
                                    ? "#0557A2"
                                    : "#ff9f43",
                              }}
                            />
                          </Box>
                        </>
                      ) : column.format && typeof value === "number" ? (
                        column.format(value)
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

export default StudentList;
