import { Box, Checkbox, FormControlLabel } from "@mui/material";

export default function MainCheckBox({
  data,
  label,
  errorMessage,
  defaultChecked,
  id,
  handleChange,
  value,
  checked,
}) {
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            {...data}
            checked={checked}
            onChange={(e) => handleChange(e)}
            id={id}
          />
        }
        label={label}
      />
      {errorMessage ? (
        <p style={{ fontSize: "1.2rem", color: "#f44336", marginLeft: "14px" }}>
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </Box>
  );
}
