import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const roles = [
    {
      id: "student",
      title: "Student",
    },
    {
      id: "admin",
      title: "Admin",
    },
  ];

  return (
    <div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.email}
            required
            helperText={errors?.email?.message}
            label="Email"
            // autoFocus
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.firstName}
            required
            helperText={errors?.firstName?.message}
            label="First Name"
            id="firstName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lastName}
            required
            helperText={errors?.lastName?.message}
            label="Last Name"
            id="lastName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        // defaultValue={}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple={false}
            options={roles}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select User Type"
                label="User Type"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
