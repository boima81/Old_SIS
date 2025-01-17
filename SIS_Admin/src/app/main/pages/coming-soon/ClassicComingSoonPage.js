import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import FuseCountdown from "@fuse/core/FuseCountdown";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

function ClassicComingSoonPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Almost there!
          </Typography>
          <Typography className="mt-2">
            Do you want to be notified when we are ready? Register below so we
            can notify you about the launch!
          </Typography>

          <div className="flex flex-col items-center py-48">
            <FuseCountdown endDate="2023-07-28" />
          </div>

          <form
            name="comingSoonForm"
            noValidate
            className="flex flex-col justify-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Notify me when you launch
            </Button>

            <Typography
              className="mt-32 text-md font-medium"
              color="text.secondary"
            >
              This isn't a newsletter subscription. We will send one email to
              you when we launch and then you will be removed from the list.
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicComingSoonPage;
