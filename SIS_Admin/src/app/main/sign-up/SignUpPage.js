/* eslint-disable eqeqeq */
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
import _ from "@lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import history from "@history";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector, useDispatch } from "react-redux";

import jwtService from "../../auth/services/jwtService";
import MainPhoneInput from "../dashboards/Shared/PhoneInput";

import { selectApplicationSetting } from "../settings/store/applicationSettingSlice";
import RadioButton from "../dashboards/Shared/Radio";
import { radioAgency } from "../dashboards/Shared/utils";
import MainSelect from "../dashboards/Shared/Select";
import MainTextField from "../dashboards/Shared/TextField";
import { getAgencys, selectAgencies } from "../Agency/store/agencysSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required("You must enter first name"),
  lastName: yup.string().required("You must enter last name"),
  phoneNumber: yup
    .string()
    .test(
      "test-number",
      "Phone number is invalid",
      (value, testContext, values) => {
        const InputValue = value.replace(
          `+${testContext.parent?.phoneNumber_country || "234"}`,
          ""
        );
        if (InputValue?.length >= 8 && InputValue?.length <= 10) {
          return true;
        }
        return false;
      }
    )

    .required("You must enter a phone number"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
  agencyId: yup.mixed(),
  otherAgency: yup.string().when("agencyId", {
    is: "other",
    then: yup.string().required("License number is required"),
  }),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
  isAgency: false,
  agencyId: null,
  agency: null,
  otherAgency: "",
};

function SignUpPage() {
  const applicationSetting = useSelector(selectApplicationSetting);
  const agencys = useSelector(selectAgencies);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [agencyList, setAllAgencies] = useState([]);
  const {
    control,
    formState,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const needWatch = watch();

  const values = getValues();

  const { isValid, dirtyFields, errors } = formState;
  console.log("errors", errors);
  function onSubmit({
    firstName,
    lastName,
    phoneNumber,
    phoneNumber_country: phoneNumberCountry,
    password,
    email,
    isAgency,
    agency,
    otherAgency,
  }) {
    setLoading(true);
    jwtService
      .createUser({
        firstName,
        lastName,
        phoneNumber,
        phoneNumber_country: phoneNumberCountry,
        password,
        email,
        isAgency,
        agencyId: agency == "other" ? null : agency,
        agencyName: otherAgency,
      })
      .then((user) => {
        setLoading(false);

        history.push("/sign-in");
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((err) => {
        setLoading(false);

        setError(err?.type, {
          type: "manual",
          message: err.message,
        });
      });
  }
  async function setAgency() {
    const agencyData = await agencys?.map?.((data) => {
      if (data.isActive) {
        return { value: data.id, label: data.name };
      }
      return {};
    }) || []
    console.log("agencyData", agencyData);
    setAllAgencies([...agencyData, { value: "other", label: "Others" }]);
  }
  useEffect(() => {
    setAgency();
  }, [agencys]);
  useEffect(() => {
    dispatch(getAgencys({}));
  }, []);
  console.log("agencys", agencys);
  const logo = applicationSetting?.logo?.url || "";
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div
          className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0"
          style={{ margin: "auto" }}
        >
          <img className="w-15 h-15" src={logo} alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="First name"
                  autoFocus
                  type="name"
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  variant="outlined"
                  required
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
                  className="mb-24"
                  label="Last name"
                  type="name"
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <MainPhoneInput
                  data={field}
                  marginBottom="2.2rem"
                  placeholder="Phone number"
                  errorName={!!errors.phoneNumber}
                  errorMessage={errors?.phoneNumber?.message}
                  required
                  setValue={setValue}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
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

            <div className="mt-10">
              <Controller
                control={control}
                name="isAgency"
                render={({ field }) => (
                  <RadioButton
                    className="md:w-1/2"
                    data={field}
                    radioGroupName="Were you referred by a recruitment referral?"
                    radioList={radioAgency}
                    errorMessage={errors?.isAgency?.message}
                  />
                )}
              />
            </div>

            {values.isAgency == "true" && (
              <div className="mb-20">
                <Controller
                  control={control}
                  name="agency"
                  render={({ field }) => (
                    <MainSelect
                      data={field}
                      label="Select Referral"
                      options={agencyList}
                      errorMessage={errors.agency?.message}
                    />
                  )}
                />
              </div>
            )}
            {console.log("values", values)}
            {values.agency == "other" && values.isAgency == "true" && (
              <div className="mt-5">
                <Controller
                  name="otherAgency"
                  control={control}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Referral name"
                      placeholder="Referral name"
                      errorName={!!errors?.otherAgency}
                      errorMessage={errors?.otherAgency?.message}
                    />
                  )}
                />
              </div>
            )}

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center mt-20"
                  error={!!errors.acceptTermsConditions}
                >
                  <div className="flex gap-10">
                    <FormControlLabel
                      control={<Checkbox size="small" {...field} />}
                    />
                    <div>
                      I agree to the{" "}
                      <Link to="/terms-services">Terms of Service </Link>
                      and
                      <Link to="/privacy-policy"> Privacy Policy</Link>
                    </div>
                  </div>
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid || loading}
              type="submit"
              size="large"
            >
              {loading ? "Loading" : "Create your free account"}
            </Button>
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
            {ReactHtmlParser(
              applicationSetting?.registration_page_content || ""
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignUpPage;
