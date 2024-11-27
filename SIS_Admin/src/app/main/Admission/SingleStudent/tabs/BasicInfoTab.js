import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MainPhoneInput from "src/app/main/dashboards/Shared/PhoneInput";
import { useSelector, useDispatch } from "react-redux";
import RadioButton from "src/app/main/dashboards/Shared/Radio";
import MainDate from "src/app/main/dashboards/Shared/Date";
import MainSelect from "src/app/main/dashboards/Shared/Select";
import { getUsers, selectUsers } from "src/app/main/settings/store/usersSlice";
import MainTextField from "src/app/main/dashboards/Shared/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllCountry } from "src/app/main/dashboards/Shared/utils";
import { getProgram, selectProgram } from "app/store/studentSlice";
import { getSemester, selectSemester } from "app/store/semesterSlice";
import {
  getStudent,
  selectStudent,
  updateStudent,
} from "../../store/studentSlice";

const radioList = [
  {
    id: 1,
    value: "male",
    label: "Male",
  },
  {
    id: 2,
    value: "female",
    label: "Female",
  },
];

function BasicInfoTab({ navigate }) {
  const user = useSelector(selectStudent);
  const routeParams = useParams();
  const [noProduct, setNoProduct] = useState(false);
  const [country, setCountry] = useState();
  const users = useSelector(selectUsers);
  const programs = useSelector(selectProgram);
  const semesters = useSelector(selectSemester);
  const studentId = routeParams?.studentId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgram());
    dispatch(getSemester());
  }, []);

  const defaultValues = {
    firstName: user?.userInformationId?.first_name || "",
    middleName: user?.userInformationId?.middle_name || "",
    lastName: user?.userInformationId?.last_name || "",
    emailAddress: user?.email || "",
    phoneNumber: user?.userInformationId?.phone_number || "",
    phoneNumber_country:
      user?.userInformationId?.phone_number_country_code || "+234",
    gender: user?.userInformationId?.gender || "",
    countryOfResidence: user?.userInformationId?.country || "",
    cityOfResidence: user?.userInformationId?.city || "",
    nationality: user?.userInformationId?.nationality || "",
    dateOfBirth: user?.userInformationId?.date_of_birth || "",
    user: user?.id || "",
    program: user?.applicationId?.programId || null,
    semester: user?.applicationId?.semesterId || null,
  };
  /**
   * Form Validation Schema
   */
  const schema = yup.object().shape({
    user: yup.string().required("You must enter user"),
    firstName: yup.string().required("You must enter a first name "),
    middleName: yup.string().optional(),
    lastName: yup.string().required("You must enter a last name"),
    emailAddress: yup
      .string()
      .email()
      .typeError("Enter valid email")
      .required("You must enter a email"),
    phoneNumber: yup
      .string()
      .test(
        "test-number",
        "Phone number is invalid",
        (value, testContext, values) => {
          const InputValue = value.replace(
            `+${
              testContext.parent?.phoneNumber_country?.replace("+", "") || "234"
            }`,
            ""
          );
          if (InputValue?.length >= 8 && InputValue?.length <= 10) {
            return true;
          }
          return false;
        }
      )
      .required("You must enter a phone number"),
    gender: yup.string().required("You must select a gender"),
    countryOfResidence: yup
      .string()
      .required("You must enter a country of residence"),
    cityOfResidence: yup
      .string()
      .required("You must enter a city of residence"),
    nationality: yup.string().required("You must enter a nationality"),
    dateOfBirth: yup
      .date()
      .typeError("The value must be a date (DD-MM-YYYY)")
      .required("You must enter a date of birth"),
    program: yup
      .number()
      .optional()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    semester: yup
      .number()
      .optional()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
  });

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const form = watch();
  const values = getValues();

  useDeepCompareEffect(() => {
    function updateProductState() {
      dispatch(getUsers({ role: "student" }));
      if (studentId === "add") {
        /**
         * Create New Product data
         */
        dispatch(getStudent()).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      } else {
        /**
         * Get Product data
         */
        dispatch(getStudent(studentId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  function getData() {
    setCountry(getAllCountry());
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!user) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      // ...user,
      ...defaultValues,
    });
  }, [user, reset]);

  // useEffect(() => {
  //   return () => {
  //     /**
  //      * Reset Product on component unload
  //      */
  //     dispatch(resetUser());
  //     setNoProduct(false);
  //   };
  // }, [dispatch]);

  if (
    user &&
    +routeParams?.studentId !== user?.id &&
    routeParams?.studentId !== "add"
  ) {
    return <FuseLoading />;
  }
  const { errors } = formState;
  function handleSaveProduct({
    user: userId,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    phoneNumber_country: phoneNumberCountry,
    emailAddress: email,
    gender,
    countryOfResidence: productCountry,
    cityOfResidence: city,
    nationality,
    dateOfBirth,
    program,
    semester,
  }) {
    dispatch(
      updateStudent({
        id: studentId !== "add" ? studentId : null,
        user: userId,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        phoneNumber_country: phoneNumberCountry,
        email,
        gender,
        country: productCountry,
        city,
        nationality,
        dateOfBirth,
        program,
        semester,
      })
    ).then((action) => {
      /**
       * If the requested product is not exist show message
       */

      if (action.payload?.data?.id) {
        // dispatch(getStudent(studentId));
        navigate("/admission/student");
      }
    });
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full md:flex">
      <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
        <Card
          component={motion.div}
          variants={item}
          className="w-full p-24 mb-32"
        >
          <div className="px-32 pb-24">
            <Typography className="text-2xl font-semibold leading-tight">
              Student
            </Typography>
          </div>

          <form onSubmit={handleSubmit(handleSaveProduct)}>
            <div className="flex flex-col gap-20">
              <Controller
                control={control}
                name="user"
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    label="User"
                    placeholder="User"
                    options={users?.map((us) => ({
                      label: us?.userInformationId?.displayName,
                      value: us?.id,
                    }))}
                    id="user"
                    errorMessage={errors?.user?.message}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="First Name"
                    placeholder="First Name"
                    id="firstName"
                    errorName={!!errors.firstName}
                    errorMessage={errors?.firstName?.message}
                  />
                )}
              />
              <Controller
                name="middleName"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Middle Name"
                    placeholder="Middle Name"
                    id="middleName"
                    errorName={!!errors.middleName}
                    errorMessage={errors?.middleName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Last Name"
                    placeholder="Last Name"
                    id="lastName"
                    errorName={!!errors.lastName}
                    errorMessage={errors?.lastName?.message}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <MainPhoneInput
                    data={field}
                    placeholder="Phone number"
                    errorName={!!errors.phoneNumber}
                    errorMessage={errors?.phoneNumber?.message}
                    required
                    setValue={setValue}
                  />
                )}
              />

              <Controller
                name="emailAddress"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Email"
                    placeholder="Email"
                    id="lastName"
                    type="email"
                    errorName={!!errors.emailAddress}
                    errorMessage={errors?.emailAddress?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioButton
                    data={field}
                    radioGroupName="Gender"
                    radioList={radioList}
                    errorMessage={errors?.gender?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="countryOfResidence"
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    label="Country"
                    placeholder="Country"
                    options={country}
                    errorMessage={errors?.countryOfResidence?.message}
                  />
                )}
              />

              <Controller
                name="cityOfResidence"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="City"
                    placeholder="City"
                    id="cityOfResidence"
                    errorName={!!errors.cityOfResidence}
                    errorMessage={errors?.cityOfResidence?.message}
                  />
                )}
              />

              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Nationality"
                    placeholder="Nationality"
                    id="nationality"
                    errorName={!!errors.nationality}
                    errorMessage={errors?.nationality?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <MainDate
                    data={field}
                    label="Date of birth"
                    maxDate={new Date()}
                    errorName={!!errors.dateOfBirth}
                    errorMessage={errors?.dateOfBirth?.message}
                  />
                )}
              />
              {studentId !== "add" && (
                <>
                  {values?.program && (
                    <Controller
                      control={control}
                      name="program"
                      render={({ field }) => (
                        <MainSelect
                          data={field}
                          label="Program"
                          placeholder="Program"
                          options={programs?.map((program) => ({
                            id: program?.id,
                            value: program?.id,
                            label: program?.name,
                            semester: program?.semester,
                          }))}
                          errorMessage={errors?.program?.message}
                        />
                      )}
                    />
                  )}
                  {values?.semester && (
                    <Controller
                      control={control}
                      name="semester"
                      render={({ field }) => (
                        <MainSelect
                          data={field}
                          label="Semester"
                          placeholder="Semester"
                          options={semesters?.map((semester) => ({
                            id: semester?.id,
                            value: semester?.id,
                            label: semester?.name,
                          }))}
                          errorMessage={errors?.semester?.message}
                        />
                      )}
                    />
                  )}
                </>
              )}
              {/* <Controller
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
            /> */}

              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                type="submit"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
        {/* <Card
          component={motion.div}
          variants={item}
          className="w-full p-24 mb-32"
        >
          <div className="px-32 pb-24">
            <Typography className="text-2xl font-semibold leading-tight">
              Generate Bill
            </Typography>
          </div>
        </Card>

        <Card
          component={motion.div}
          variants={item}
          className="w-full p-24 mb-32"
        >
          <div className="px-32 pb-24">
            <Typography className="text-2xl font-semibold leading-tight">
              Pay Bill
            </Typography>
          </div>
        </Card> */}
      </div>
    </div>
  );
}

export default BasicInfoTab;
