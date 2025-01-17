import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, openDialog } from "app/store/fuse/dialogSlice";
import ReactHtmlParser from "react-html-parser";

import { setUser } from "app/store/userSlice";
import { useState } from "react";
import jwtService from "../../auth/services/jwtService";
import { selectApplicationSetting } from "../settings/store/applicationSettingSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const applicationSetting = useSelector(selectApplicationSetting);
  console.log({ applicationSetting });
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const openDialogBox = (user) => {
    dispatch(
      openDialog({
        fullWidth: true,
        maxWidth: "xl",
        sx: { height: "100%" },
        children: (
          <>
            <DialogTitle id="alert-dialog-title">
              President Welcome message
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Dear {user?.data?.displayName || "User"}, <br />
                <br />
                {ReactHtmlParser(user?.presidentMessage || "")}
                {/* Lorem ipsum dolor sit amet. Et optio neque ea eligendi nobis ab iure ratione. Sit
                amet architecto in veniam asperiores aut quia alias ut magni placeat. Sit nobis
                maiores aut mollitia galisum est excepturi ratione sit sunt eligendi in soluta
                consequatur ad consequatur exercitationem sit libero saepe. <br /> <br />
                Ut autem delectus ab architecto amet est labore deserunt qui fugiat labore. Sed
                consequatur esse qui illum quos sed corrupti ipsam ad aliquam ducimus non voluptatem
                minima.
                <br />
                <br />
                Eos nulla cumque eum molestiae officia sit impedit veritatis et consectetur repellat
                est maiores cupiditate et accusantium veniam. Ut corrupti optio ad incidunt nisi qui
                dignissimos asperiores et eius voluptas sed quaerat minima aut commodi sunt! <br />
                <br />
                Thanks <br />
                Dr. Johnny Paul <br />
                President */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => dispatch(closeDialog())}
                color="primary"
                autoFocus
              >
                ok
              </Button>
            </DialogActions>
          </>
        ),
      })
    );
  };

  async function onSubmit({ email, password }) {
    try {
      setLoading(true);
      const data = await jwtService.signInWithEmailAndPassword(email, password);
      if (data) {
        const userData = await jwtService.signInWithToken();
        if (userData) {
          dispatch(setUser(userData));
          setLoading(false);
        }
        if (userData?.role?.includes("student") && data?.presidentMessage) {
          openDialogBox(data);
        }
      } else {
        setLoading(false);
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
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      setError(err?.type, {
        type: "manual",
        message: err.message,
      });
    }
  }
  const logo = applicationSetting?.logo?.url || "";
  // assets/images/logo/logo-dark.png

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div
          className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0"
          style={{ margin: "auto" }}
        >
          <img className="w-45 h-45" src={logo} alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/sign-up">
              Sign up
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

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

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              type="submit"
              size="large"
              disabled={loading}
            >
              Sign in
            </Button>

            {/* <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div> */}
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
            {ReactHtmlParser(applicationSetting?.login_page_content || "")}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
