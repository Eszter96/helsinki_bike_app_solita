import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import JourneyService from "../services/JourneyService";
import { useState, useEffect } from "react";
import { Link } from "@mui/material";
import "../styles.css";
const columns = [
  { id: "depDate", label: "Departure Date", minWidth: 100, align: "right" },
  { id: "depStationName", label: "Departure Station", minWidth: 240 },
  { id: "retDate", label: "Return Date", minWidth: 100, align: "right" },
  { id: "retStationName", label: "Return Station", minWidth: 240 },
  { id: "duration", label: "Duration time (m)", minWidth: 130 },
  { id: "distance", label: "Distance (km)", minWidth: 100 },
];

export default function JourneyTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [journeys, setJourneys] = useState();

  async function getJourneys() {
    const j = await JourneyService.getJourneysFromDB(props.dateOf, props.date);
    if (j) {
      setJourneys(j);
    } else {
      setJourneys(undefined);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      await getJourneys();
    }
    fetchData();
  }, [props.date, props.dateOf]);

  useEffect(() => {
    setJourneys(undefined);
    async function fetchData() {
      await getJourneys();
    }
    if (!journeys) {
      fetchData();
    }
  }, [props]);
  return (
    <Paper
      style={{ marginLeft: "auto", marginRight: "auto" }}
      sx={{
        width: "90%",
        maxWidth: 1300,
      }}
    >
      {journeys && journeys.length > 0 ? (
        <>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    DEPARTURES
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    RETURNS
                  </TableCell>
                  <TableCell align="center" colSpan={2}></TableCell>
                </TableRow>
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
                {journeys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={String(row.depDate) + String(row.retDate)}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id.includes("Date") ? (
                                String(value).replace("T", " ")
                              ) : column.id === "duration" ? (
                                (Number(value) / 60).toFixed(3)
                              ) : column.id === "distance" ? (
                                Number(value) / 1000
                              ) : (
                                <Link>{value}</Link>
                              )}
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
            count={journeys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <div
          style={{
            minHeight: "300px",
            textAlign: "center",
            display: "flex",
            justifyItems: "center",
          }}
        >
          {journeys !== undefined ? (
            <p
              style={{
                width: "100%",
                paddingTop: "10%",
                textAlign: "center",
              }}
            >
              No data can be found responding to filter settings.
            </p>
          ) : (
            <p
              style={{
                width: "100%",
                paddingTop: "10%",
                textAlign: "center",
              }}
              className="pulsate"
            >
              Data is loading...
            </p>
          )}
        </div>
      )}
    </Paper>
  );
}
