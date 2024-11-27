import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./styles.css"; // Import the CSS file

export default function MainTextArea({
  data,
  required,
  fullWidth,
  errorName,
  errorMessage,
  id,
  minRow,
  name,
  placeholder = "Goal statement",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
    }
  };
  return (
    <TextareaAutosize
      {...data}
      id={id}
      aria-label="minimum height"
      className="textarea-border"
      minRows={minRow}
      placeholder={placeholder}
      error={errorName}
      name={name}
      helperText={errorMessage}
      required={required}
      fullWidth={fullWidth}
      onKeyDown={handleKeyDown}
    />
  );
}
