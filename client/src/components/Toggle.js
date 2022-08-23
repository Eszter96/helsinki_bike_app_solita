import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Toggle({ setSubPage }) {
  const [subPage, setAlignment] = React.useState("journeys");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setSubPage(newAlignment);
    }
  };

  const theme = createTheme({
    palette: {
      root: {
        main: "#26c6da",
        light: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        color="root"
        value={subPage}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{ padding: "30px" }}
      >
        <ToggleButton value="journeys">Journeys</ToggleButton>
        <ToggleButton value="stations">Stations</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
