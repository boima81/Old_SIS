import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function RadioButton({
  data,
  radioGroupName,
  errorMessage,
  radioList,
  id,
}) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        {radioGroupName}
      </FormLabel>
      <RadioGroup
        {...data}
        id={id}
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="radio-buttons-group"
      >
        <div className="flex gap-14">
          {radioList.map((radioData) => {
            return (
              <FormControlLabel
                value={radioData.value}
                control={<Radio />}
                label={radioData.label}
              />
            );
          })}
        </div>
        {errorMessage ? (
          <p
            style={{ fontSize: "1.2rem", color: "#f44336", marginLeft: "14px" }}
          >
            {errorMessage}
          </p>
        ) : (
          ""
        )}
      </RadioGroup>
    </FormControl>
  );
}
