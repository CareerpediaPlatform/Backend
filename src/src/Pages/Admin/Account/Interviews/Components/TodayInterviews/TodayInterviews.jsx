import "./TodayInterviews.scss";

// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const columns = [
  { id: "Level", label: "Level", align: "center" },
  { id: "Course", label: "Course", align: "center" },
  { id: "Student", label: "Student name", align: "center" },
  { id: "Interviewer", label: "Interviewer", align: "center" },
  { id: "Time", label: "Time", align: "center" },
  { id: "Date", label: "Date", align: "center" },
];

function createData(Level, Course, Student, Interviewer, Time, Date) {
  return { Level, Course, Student, Interviewer, Time, Date };
}

const rows = [
  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),

  createData(
    5,
    "Design",
    "Serena Woodsen",
    "John Doe",
    "10:00 to 11:00",
    "20 Aug 2023"
  ),
];

const TodayInterviews = () => {
  return (
    <Paper className="mentorList" component={"div"}>
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
          {rows.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={crypto.randomUUID()}
                    align={column.align}
                    className="table-body-data"
                  >
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TodayInterviews;
