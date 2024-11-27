import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getAllCountry } from "src/app/main/dashboards/Shared/utils";
import { updateStudent } from "../../store/studentSlice";

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

const programList = [
  {
    id: 1,
    value: "program1",
    label: "Program 1",
  },
  {
    id: 2,
    value: "program2",
    label: "Program 2",
  },
  {
    id: 3,
    value: "program3",
    label: "Program 3",
  },
];

const semesterList = [
  {
    id: 1,
    value: "semester1",
    label: "Semester 1",
  },
  {
    id: 2,
    value: "semester2",
    label: "Semester 2",
  },
  {
    id: 3,
    value: "semester3",
    label: "Semester 3",
  },
];
function BasicInfoTab({ studentId, navigate }) {
  const methods = useFormContext();
  const { control, formState, setValue, handleSubmit } = methods;
  const { errors } = formState;
  const [country, setCountry] = useState();

  const dispatch = useDispatch();
  function getData() {
    setCountry(getAllCountry());
  }
  useEffect(() => {
    getData();
  }, []);
  function handleSaveProduct({
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
    dataOfBirth,
    program,
    semester,
  }) {
    dispatch(
      updateStudent({
        id: studentId,
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
        dataOfBirth,
        program,
        semester,
      })
    ).then((action) => {
      /**
       * If the requested product is not exist show message
       */
      if (action.payload) {
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
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
        {/* <Card
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
              name="middleName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.middleName}
                  required
                  helperText={errors?.middleName?.message}
                  label="Middle Name"
                  id="middleName"
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
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <MainPhoneInput
                  data={field}
                  marginBottom={"2.2rem"}
                  placeholder={"Phone number"}
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

            <div>
              <Controller
                control={control}
                name={"gender"}
                render={({ field }) => (
                  <RadioButton
                    data={field}
                    radioGroupName="Gender"
                    radioList={radioList}
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </div>

            <div className="mt-8 mb-16">
              <Controller
                control={control}
                name={"country"}
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    label="Country"
                    placeholder="Country"
                    options={country}
                    errorMessage={errors?.country?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                  label="City"
                  // autoFocus
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.nationality}
                  helperText={errors?.nationality?.message}
                  label="Nationality"
                  // autoFocus
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <div className="mt-8 mb-16">
              <Controller
                control={control}
                name={"program"}
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    label="Program"
                    placeholder="Program"
                    options={programList}
                    errorMessage={errors?.program?.message}
                  />
                )}
              />
            </div>

            <div className="mt-8 mb-16">
              <Controller
                control={control}
                name={"dateOfBirth"}
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
            </div>

            <div className="mt-8 mb-16">
              <Controller
                control={control}
                name={"semester"}
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    label="Semester"
                    placeholder="Semester"
                    options={semesterList}
                    errorMessage={errors?.semester?.message}
                  />
                )}
              />
            </div>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              type="submit"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Save
            </Button>
          </form>
        </Card> */}
        <Card
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
        </Card>
      </div>
    </div>
  );
}

export default BasicInfoTab;
