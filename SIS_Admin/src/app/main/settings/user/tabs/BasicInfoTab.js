import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import MainPhoneInput from "src/app/main/dashboards/Shared/PhoneInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import MainSelect from "src/app/main/dashboards/Shared/Select";
import withRouter from "@fuse/core/withRouter";
import { useEffect } from "react";
import { saveUser, selectUser } from "../../store/userSlice";

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
  userType: yup.string().required("You must enter user role"),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  phoneNumber_country:"",
  email: "",
  password: "",
  userType: "",
};

function BasicInfoTab(props) {
  const {
    control,
    formState,
    handleSubmit,
    setError,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const { isValid, dirtyFields } = formState;
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  console.log({ dirtyFields, isValid, errors });
  const { agencyName, agencyId, ...values } = getValues();
  console.log("values", values);
  function handleSaveProduct(data) {
    dispatch(saveUser(data)).then((action) => {
      if (action.payload?.id) {
        props.navigate("/settings/users");
      }
    });
  }

  const roles = [
    {
      id: "student",
      type: "student",
      title: "Student Role",
    },
    {
      id: "academics",
      type: "academics",
      title: "Academics Role",
    },
    {
      id: "admission",
      type: "admission",
      title: "Admission Role",
    },
    {
      id: "finance",
      type: "finance",
      title: "Finance Role",
    },
    {
      id: "instructors",
      type: "instructors",
      title: "Instructors Role",
    },
    {
      id: "admin",
      type: "admin",
      title: "Admin",
    },
  ];
  useEffect(() => {
    if (user) {
      reset({
        id: user?.id,
        email: user?.email,
        firstName: user?.userInformationId?.first_name,
        lastName: user?.userInformationId?.last_name,
        userType: user?.role?.[0],
        phoneNumber_country: user?.userInformationId?.phone_number_country_code,
        phoneNumber: user?.userInformationId?.phone_number,
      });
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(handleSaveProduct)}>
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
        control={control}
        name="userType"
        render={({ field }) => (
          <MainSelect
            className="mb-24"
            data={field}
            id="userType"
            label="User Role"
            options={roles?.map((role) => ({
              id: role?.id,
              value: role?.type,
              label: role?.title,
            }))}
            // options={programOptions}
            errorName={!!errors.userType}
            errorMessage={errors?.userType?.message}
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

      <Button
        variant="contained"
        color="secondary"
        className="w-full mt-24"
        aria-label="Register"
        // disabled={_.isEmpty(dirtyFields) || !isValid}
        type="submit"
        size="large"
      >
        Save
      </Button>
    </form>
  );
}

export default withRouter(BasicInfoTab);
