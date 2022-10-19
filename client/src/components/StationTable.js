import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import StationService from "../services/StationService";
import "../styles.css";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        style={{ display: "flex", width: "100%" }}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{ width: "100%", marginLeft: "-60px" }}
          component="th"
          scope="row"
        >
          <Typography
            fontWeight="bold"
            variant="body"
            gutterBottom
            component="div"
            textTransform={"uppercase"}
            textAlign="center"
          >
            {row.stationNameSuomi}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontWeight="bold"
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    City:
                  </Typography>
                  <Typography
                    style={{ marginLeft: "10px" }}
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    {row.city.length > 1 ? row.city : "-"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontWeight="bold"
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    Address:
                  </Typography>
                  <Typography
                    style={{ marginLeft: "10px" }}
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    {row.address}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontWeight="bold"
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    Total number of departures:
                  </Typography>{" "}
                  {props.depStat != "-" ? (
                    <Typography
                      style={{ marginLeft: "10px" }}
                      variant="body"
                      gutterBottom
                      component="div"
                    >
                      {props.depStat}
                    </Typography>
                  ) : (
                    <Typography
                      style={{ marginLeft: "10px" }}
                      variant="body"
                      gutterBottom
                      component="div"
                      className="pulsate"
                    >
                      calculating...
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontWeight="bold"
                    variant="body"
                    gutterBottom
                    component="div"
                  >
                    Total number of returns:
                  </Typography>{" "}
                  {props.retStat != "-" ? (
                    <Typography
                      style={{ marginLeft: "10px" }}
                      variant="body"
                      gutterBottom
                      component="div"
                    >
                      {props.retStat}
                    </Typography>
                  ) : (
                    <p style={{ marginLeft: "10px" }} className="pulsate">
                      calculating...
                    </p>
                  )}
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [stations, setStations] = useState();
  const [depStats, setDepStats] = useState();
  const [retStats, setRetStats] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getStations() {
    const stations = await StationService.getStationsFromDB();
    console.log(stations.length);
    setStations(stations);
  }

  async function getStationStats() {
    await StationService.getStatsForDeps().then((res) => {
      setDepStats(res);
    });
    await StationService.getStatsForRets().then((res) => {
      setRetStats(res);
    });
  }

  useEffect(() => {
    async function fetchStationsData() {
      await getStations();
    }
    async function fetchStationsStatsData() {
      await getStationStats();
    }
    if (!stations) {
      fetchStationsData();
    } else {
      fetchStationsStatsData();
    }
  });

  return (
    <Paper
      style={{ marginLeft: "auto", marginRight: "auto" }}
      sx={{
        width: "50%",
        maxWidth: 400,
      }}
    >
      {stations ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table aria-label="collapsible table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ textTransform: "uppercase", textAlign: "center" }}
                  >
                    Stations
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stations &&
                  stations
                    .sort((a, b) =>
                      a.stationNameSuomi > b.stationNameSuomi ? 1 : -1
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((station) => (
                      <Row
                        style={{ width: "100%" }}
                        key={station.stationId}
                        row={station}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        depStat={
                          depStats
                            ? depStats
                                .filter((stat) =>
                                  stat[0]
                                    .replace('"', "")
                                    .includes(station.stationNameSuomi)
                                )
                                .map((result) => result[1])
                            : "-"
                        }
                        retStat={
                          retStats
                            ? retStats
                                .filter((stat) =>
                                  stat[0]
                                    .replace('"', "")
                                    .includes(station.stationNameSuomi)
                                )
                                .map((result) => result[1])
                            : "-"
                        }
                      />
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={stations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <div
          style={{
            minHeight: "500px",
            textAlign: "center",
            display: "flex",
            justifyItems: "center",
          }}
        >
          <p
            style={{
              width: "100%",
              paddingTop: "30%",
              textAlign: "center",
            }}
            className="pulsate"
          >
            Data is loading...
          </p>
        </div>
      )}
    </Paper>
  );
}
