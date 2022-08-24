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

const columns = [
  { id: "depDate", label: "Departure Date", minWidth: 170, align: "right" },
  { id: "depStationName", label: "Departure Station", minWidth: 100 },
  { id: "retDate", label: "Return Date", minWidth: 170, align: "right" },
  { id: "retStationName", label: "Return Station", minWidth: 100 },
  { id: "duration", label: "Duration time (m)", minWidth: 130 },
  { id: "distance", label: "Distance (km)", minWidth: 100 },
];

function createData(depdate, depstat, retdate, retstat, duration, distance) {
  return { depdate, depstat, retdate, retstat, duration, distance };
}

export default function JourneyTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState();
  const [journeys, setJourneys] = useState();

  async function getJourneys() {
    const journeys = await JourneyService.getJourneysFromDB(
      props.dateOf,
      props.date
    );
    setJourneys(journeys);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* const getRows = async () => {
    if (!journeys) {
      await getJourneys();
    } else {
      const r = [
        await journeys.map((journey) =>
          createData(
            journey.depDate,
            journey.depStationName,
            journey.retDate,
            journey.retStationName,
            Number(journey.duration) / 60,
            Number(journey.distance) / 1000
          )
        ),
      ];
      console.log(r.length);
      setRows(r);
    }
  }; */

  useEffect(() => {
    setJourneys(null);
    async function fetchData() {
      await getJourneys();
    }
    fetchData();
  }, [props.date, props.dateOf]);

  useEffect(() => {
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
        width: "80%",
        maxWidth: 1000,
      }}
    >
      {journeys ? (
        <>
          <TableContainer sx={{ maxHeight: 550 }}>
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
          <p
            style={{
              width: "100%",
              paddingTop: "15%",
              textAlign: "center",
            }}
          >
            Data is loading...
          </p>
        </div>
      )}
    </Paper>
  );
}
