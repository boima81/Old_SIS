import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 16;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MainSelect({
  id,
  errorMessage,
  options,
  data,
  label,
  disabled = false,
  multiple = false,
  className = "",
}) {
  return (
    <Box>
      <FormControl sx={{ width: "100%" }} error={errorMessage && true}>
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          className={className}
          MenuProps={MenuProps}
          labelId="demo-simple-select-error-label"
          label={label}
          id={id}
          disabled={disabled}
          {...data}
          multiple={multiple}
          options={options}
          // renderInput={(params) => <MenuItem value={params.value} {...params}>
          //   {params.label}
          // </MenuItem>}

        >
          {options &&
            options.map((optionData) => {
              return (
                <MenuItem value={optionData.value} {...optionData}>
                  {optionData.label}
                </MenuItem>
              );
            })}
        </Select>
        {/* <Autocomplete
          className={className}
          MenuProps={MenuProps}
          // labelId="demo-simple-select-error-label"
          // label={label}
          id={id}
          disabled={disabled}
          {...data}
          multiple={multiple}
          options={options && options?.length > 0 ? options : []}
          // renderInput={(params) => <MenuItem value={params.value} {...params}>
          //   {params.label}
          // </MenuItem>}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        /> */}
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}
