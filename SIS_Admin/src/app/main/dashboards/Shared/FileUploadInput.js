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
  multiline,
  handleChange,
  variant = "outlined",
  margin = "normal",
  type = "text",
  fullWidth = true,
  id,
  multiple = false,
}) => {
  return (
    <>
      <TextField
        {...data}
        label={label}
        className={`w-full m-0 p-0 ${className || ""}`}
        margin={margin}
        multiline={multiline}
        type="file"
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        minRows={minRows}
        variant={variant}
        error={errorName}
        helperText={errorMessage}
        required={required}
        fullWidth={fullWidth}
        value={data?.value}
        inputProps={{ multiple: true }}
      />
      {/* {files.map((data) => {
        return <div>{data.name}</div>;
      })} */}
    </>
  );
};

export default MainTextField;
