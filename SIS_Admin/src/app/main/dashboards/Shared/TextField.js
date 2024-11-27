import { TextField } from "@mui/material";

const MainTextField = ({
  data,
  errorName,
  errorMessage,
  fullData,
  className,
  label,
  minRows,
  required,
  placeholder,
  haneleChange,
  multiline,
  variant = "outlined",
  margin = "normal",
  type = "text",
  fullWidth = true,
  id,
  multiple = false,
  inputProps = {},
  disabled = false,
}) => {
  return (
    <TextField
      {...data}
      label={label}
      className={`w-full m-0 p-0 ${className || ""}`}
      margin={margin}
      multiline={multiline}
      type={type}
      id={id}
      placeholder={placeholder}
      minRows={minRows}
      variant={variant}
      error={errorName}
      // onChange={haneleChange}
      helperText={errorMessage}
      required={required}
      fullWidth={fullWidth}
      inputProps={inputProps}
      disabled={disabled}
    />
  );
};

export default MainTextField;
