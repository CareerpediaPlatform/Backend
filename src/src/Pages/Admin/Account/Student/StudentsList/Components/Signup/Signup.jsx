import "./Signup.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "S_No", label: "S.No", align: "center" },
  {
    id: "Name",
    label: "Name",
    align: "center",
  },
  {
    id: "Email",
    label: "Email ID",
    align: "center",
  },

  {
    id: "Phone_Number",
    label: "Phone Number",
    align: "center",
  },
];

function createData(Name, Email, Phone_Number) {
  return { Name, Email, Phone_Number };
}

const rows = [
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
  createData("Jaskson", "Henry@gmail.com", 9876543210),
];

function Signup() {
  return (
    <div className="signup-list">
      <Table className="signup-list-table">
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
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={crypto.randomUUID()}
                    align={column.align}
                    className="table-body-data"
                  >
                    {column.id === "S_No" ? index + 1 : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Signup;
