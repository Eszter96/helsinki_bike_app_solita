import * as React from "react";
import PropTypes from "prop-types";
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
                    {row.city}
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
                  <Typography variant="body" gutterBottom component="div">
                    Total number of departures:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body" gutterBottom component="div">
                    Total number of departures:
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/* Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
}; */

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [stations, setStations] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getStations() {
    const stations = await StationService.getStationsFromDB();
    setStations(stations);
  }

  useEffect(() => {
    async function fetchData() {
      await getStations();
    }
    if (!stations) {
      fetchData();
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
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ textTransform: "uppercase", textAlign: "center" }}
              >
                Station Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations &&
              stations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((station) => (
                  <Row
                    style={{ width: "100%" }}
                    key={station.stationId}
                    row={station}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
