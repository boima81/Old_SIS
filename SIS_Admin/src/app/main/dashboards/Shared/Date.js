import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { cardDateInputFormate, dateInputFormate } from "./utils";

export default function MainDate({
  id,
  errorMessage,
  errorName,
  data,
  label,
  minDate,
  maxDate,
  card = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...data}
        label={label}
        views={card ? ["year", "month"] : ["year", "month", "day"]}
        inputFormat={card ? cardDateInputFormate : dateInputFormate}
        hintText="Select Date"
        minDate={minDate}
        maxDate={maxDate}
        mask={card ? "__/____" : "__/__/____"}
        value={data.value ? data.value : ""}
        renderInput={(params) => (
          <TextField
            {...params}
            id={id}
            helperText={errorMessage}
            error={errorName}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
}
