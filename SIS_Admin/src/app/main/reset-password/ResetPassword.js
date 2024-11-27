import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import history from "@history";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import JwtService from "../../auth/services/jwtService";
import { toaster } from "../dashboards/Shared/utils";
import { selectApplicationSetting } from "../settings/store/applicationSettingSlice";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  password: "",
  passwordConfirm: "",
};

function ResetPassword() {
  const routeParams = useParams();
  const [loading, setLoading] = useState(false);
  const applicationSetting = useSelector(selectApplicationSetting);

  const { control, formState, handleSubmit, setError, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const { token } = routeParams;

  async function onSubmit({ password, passwordConfirm }) {
    try {
      const validToken = JwtService.isAuthTokenValid(token);
      console.log({ validToken });
      if (validToken) {
        setLoading(true);
        const data = await JwtService.resetChangePasswordUser({
          password,
          confirmPassword: passwordConfirm,
          token
        });
        setLoading(false);
        if (data) {
          console.log({ data });
          history.push("/sign-in");
        }

        // .then((user) => {
        //   // No need to do anything, user data will be set at app/auth/AuthContext
        // })
        // .catch((_errors) => {
        // _errors.forEach((error) => {
        //   setError(error.type, {
        //     type: 'manual',
        //     message: error.message,
        //   });
        // });
        //   if (_errors?.code) {
        //     setError(_errors?.code, {
        //       type: "email",
        //       message: _errors?.message,
        //     });
        //   }
        // });
      } else {
        toaster("Error", { data: { message: "Not Valid request or token expired" }});
        setError("password", {
          type: "manual",
          message: "Token Expired",
        });
        history.push("/sign-in");
      }
    } catch (err) {
      setLoading(false);
      setError(err.type, {
        type: "manual",
        message: err.message,
      });
    }
  }

  const logo =
    applicationSetting?.logo?.url || "";
    // assets/images/logo/logo-dark.png

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div
          className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0"
          style={{ margin: "auto" }}
        >
          <img className="w-15 h-15" src={logo} alt="logo" />


          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Reset your password
          </Typography>
          <Typography className="font-medium">
            Create a new password for your account
          </Typography>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
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
              disabled={_.isEmpty(dirtyFields) || !isValid || loading}
              type="submit"
              size="large"
            >
              {loading ? "Loading..." : "Reset your password"}
            </Button>

            <Typography
              className="mt-32 text-md font-medium"
              color="text.secondary"
            >
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                sign in
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to {applicationSetting?.application_name}</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            {ReactHtmlParser(applicationSetting?.reset_page_content || "")}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ResetPassword;
