import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../Assets/customer.png";
import "./Enrolled.scss";
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
  { id: "Student_Id", label: "Student Id", align: "center" },
  { id: "Student_Name", label: "Student Name", align: "center" },
  { id: "Course", label: "Course", align: "center" },
  { id: "Phone_Number", label: "Phone Number", align: "center" },
  { id: "Email_ID", label: "Email ID", align: "center" },
  { id: "Progress", label: "Progress", align: "center" },
];

const createData = (
  Profile,
  Student_Id,
  Student_Name,
  Course,
  Phone_Number,
  Email_ID,
  Progress
) => {
  return {
    Profile,
    Student_Id,
    Student_Name,
    Course,
    Phone_Number,
    Email_ID,
    Progress,
  };
};

const rows = [
  createData(
    img,
    "01",
    "Henry",
    "Design",
    9876541230,
    "Henry@gmail.com",
    "90%"
  ),
  createData(
    img,
    "02",
    "Henry",
    "Development",
    9876541230,
    "Henry@gmail.com",
    "80%"
  ),
  createData(
    img,
    "04",
    "Henry",
    "Testing",
    9876541230,
    "Henry@gmail.com",
    "30%"
  ),
  createData(
    img,
    "05",
    "Henry",
    "Design",
    9876541230,
    "Henry@gmail.com",
    "40%"
  ),
  createData(img, "06", "Henry", "TOFEL", 9876541230, "Henry@gmail.com", "50%"),
  createData(img, "07", "Henry", "GRE", 9876541230, "Henry@gmail.com", "80%"),
  createData(
    img,
    "08",
    "Henry",
    "Design",
    9876541230,
    "Henry@gmail.com",
    "10%"
  ),
  createData(
    img,
    "09",
    "Henry",
    "Development",
    9876541230,
    "Henry@gmail.com",
    "100%"
  ),
  createData(
    img,
    "10",
    "Henry",
    "Testing",
    9876541230,
    "Henry@gmail.com",
    "90%"
  ),
  createData(img, "11", "Henry", "GRE", 9876541230, "Henry@gmail.com", "90%"),
  createData(
    img,
    "12",
    "Henry",
    "Development",
    9876541230,
    "Henry@gmail.com",
    "chennai",
    "90%"
  ),
];
const Courses = ["Design", "Development", "Testing"];
const SpecialCourses = ["GRE", "TOFEL"];

const Enrolled = () => {
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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/student/:id");
  };

  return (
    <div className="enrolled-students">
      <div className="course-filters">
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
      <Paper className="mentorList">
        <Table className="mentor-list-table">
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
                              value={parseInt(row.Progress)}
                              variant="determinate"
                              sx={{
                                color:
                                  parseInt(row.Progress) >= 50
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

export default Enrolled;
