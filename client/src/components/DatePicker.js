import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function DatePicker({ setDate, ...props }) {
  const [value, setValue] = React.useState(new Date("2021-05-18"));

  const handleChange = (newValue) => {
    setValue(newValue);
    setDate(newValue);
  };

  const color = "#26c6da";

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={props.option}
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            sx={{
              svg: { color },
              input: { color },
              label: { color },
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
