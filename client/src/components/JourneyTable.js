import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "depdate", label: "Departure Date", minWidth: 170, align: "right" },
  { id: "depstat", label: "Departure Station", minWidth: 100 },
  { id: "retdate", label: "Return Date", minWidth: 170, align: "right" },
  { id: "retstat", label: "Return Station", minWidth: 100 },
  { id: "duration", label: "Duration time (s)", minWidth: 100 },
  { id: "distance", label: "Distance (m)", minWidth: 100 },
];

function createData(depdate, depstat, retdate, retstat, duration, distance) {
  return { depdate, depstat, retdate, retstat, duration, distance };
}

const rows = [
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2043,
    500
  ),
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2839,
    676
  ),
  createData(
    "2021-05-31T23:57:25",
    "Näkinsilta",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2345,
    654
  ),
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    1356,
    435
  ),
  createData(
    "2021-05-31T23:57:25",
    "Koskelan varikko",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2432,
    643
  ),
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2043,
    500
  ),
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2839,
    676
  ),
  createData(
    "2021-05-31T23:57:25",
    "Näkinsilta",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2345,
    654
  ),
  createData(
    "2021-05-31T23:57:25",
    "Laajalahden aukio",
    "2021-06-01T00:05:46",
    "Teljäntie",
    1356,
    435
  ),
  createData(
    "2021-05-31T23:57:25",
    "Koskelan varikko",
    "2021-06-01T00:05:46",
    "Teljäntie",
    2432,
    643
  ),
];

export default function JourneyTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "80%", maxWidth: 1000 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
