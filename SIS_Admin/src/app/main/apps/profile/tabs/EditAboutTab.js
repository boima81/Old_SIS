import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import history from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { lighten } from "@mui/material/styles";
import { selectUser, setUser } from "app/store/userSlice";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JwtService from "src/app/auth/services/jwtService";
import MainDate from "src/app/main/dashboards/Shared/Date";
import MainPhoneInput from "src/app/main/dashboards/Shared/PhoneInput";
import RadioButton from "src/app/main/dashboards/Shared/Radio";
import MainSelect from "src/app/main/dashboards/Shared/Select";
import MainTextField from "src/app/main/dashboards/Shared/TextField";
import { getAllCountry } from "src/app/main/dashboards/Shared/utils";
import * as yup from "yup";

function EditAboutTab() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [country, setCountry] = useState();

  const test = (x) => x + 1;
  const user = useSelector(selectUser);
  const userInformationId = user?.userInformationId;
  // useEffect(() => {
  //   axios.get("/api/profile/about").then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  // if (!data) {
  //   return null;
  // }

  // const { general, work, contact, groups, friends } = data;
  function getData() {
    setCountry(getAllCountry());
  }
  useEffect(() => {
    getData();
  }, []);
  const defaultValues = {
    firstName: user?.userInformationId?.first_name,
    middleName: user?.userInformationId?.middle_name,
    lastName: user?.userInformationId?.last_name,
    emailAddress: user?.email,
    phoneNumber: user?.userInformationId?.phone_number,
    phoneNumber_country:
      user?.userInformationId?.phone_number_country_code || "+234",
    gender: user?.userInformationId?.gender,
    countryOfResidence: user?.userInformationId?.country,
    cityOfResidence: user?.userInformationId?.city,
    nationality: user?.userInformationId?.nationality,
    dateOfBirth: user?.userInformationId?.date_of_birth,
  };

  const schema = yup.object({
    firstName: yup.string().required("You must enter a first name "),
    middleName: yup.string().required("You must enter a middle name"),
    lastName: yup.string().required("You must enter a last name"),
    // emailAddress: yup
    //   .string()
    //   .email()
    //   .typeError("Enter valid email")
    //   .required("You must enter a email"),
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
      if (InputValue?.length >=8 && InputValue?.length<=10) {
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
      .typeError("The value must be a date (MM-DD-YYYY)")
      .required("You must enter a date of birth"),
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
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const values = getValues();
  const form = watch();
  const fieldData = {
    radioList: [
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
    ],
    fieldName: {
      firstName: "firstName",
      middleName: "middleName",
      lastName: "lastName",
      // emailAddress: "emailAddress",
      phoneNumber: "phoneNumber",
      gender: "gender",
      countryOfResidence: "countryOfResidence",
      cityOfResidence: "cityOfResidence",
      nationality: "nationality",
      dateOfBirth: "dateOfBirth",
    },
    errorNames: {
      firstName: !!errors?.firstName,
      middleName: !!errors?.middleName,
      lastName: !!errors?.lastName,
      // emailAddress: !!errors?.emailAddress,
      phoneNumber: !!errors?.phoneNumber,
      gender: !!errors?.gender,
      countryOfResidence: !!errors?.countryOfResidence,
      cityOfResidence: !!errors?.cityOfResidence,
      nationality: !!errors?.nationality,
      dateOfBirth: !!errors?.dateOfBirth,
    },
    errorMessage: {
      firstName: errors?.firstName?.message || "",
      middleName: errors?.middleName?.message || "",
      lastName: errors?.lastName?.message || "",
      // emailAddress: errors?.emailAddress?.message || "",
      phoneNumber: errors?.phoneNumber?.message || "",
      gender: errors?.gender?.message || "",
      countryOfResidence: errors?.countryOfResidence?.message || "",
      cityOfResidence: errors?.cityOfResidence?.message || "",
      nationality: errors?.nationality?.message || "",
      dateOfBirth: errors?.dateOfBirth?.message || "",
    },
  };

  async function onSubmit({
    firstName,
    middleName,
    lastName,
    phoneNumber,
    phoneNumber_country: phoneNumberCountry,
    countryOfResidence,
    cityOfResidence,
    nationality,
    gender,
    dateOfBirth,
  }) {
    let avatarFile = null;
    if (images) {
      avatarFile = await JwtService.uploadUserAvatar(images);
      // .then((res) => {
      //   if (res?.id) {
      //     return res?.id;
      //   }
      //   return null;
      // })
      // .catch((err) => {
      //   return null;
      // });
    }
    JwtService.updateUser({
      firstName,
      middleName,
      lastName,
      phoneNumber,
      phoneNumber_country: phoneNumberCountry,
      country: countryOfResidence,
      city: cityOfResidence,
      nationality,
      gender,
      date_of_birth: dateOfBirth,
      avatarFile,
    })
      .then(async (userUpdate) => {
        history.push("/apps/profile");
        const userData = await JwtService.signInWithToken();
        if (userData) {
          dispatch(setUser(userData));
        }
      })
      .catch((err) => {
        console.log({ err });
        setError(err?.type, {
          type: "manual",
          message: err.message,
        });
      });
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const images = watch("images");
  const url = images ? URL.createObjectURL(images) : user?.avatarFile?.url;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <Paper className="p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        <div className="flex justify-center mb-32">
          <h1>Update Profile</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-32">
            <div className="flex gap-32">
              <div className="flex flex-col flex-1 gap-32">
                {/* <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                  {url && (
                    <>
                      <Controller
                        name="featuredImageId"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <>
                            <div
                              // onClick={() => onChange(media.id)}
                              // onKeyDown={() => onChange(media.id)}
                              role="button"
                              className={clsx(
                                "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg"
                              )}
                            >
                              <img
                                className="max-w-none w-auto h-full"
                                src={url}
                                alt="product"
                              />
                            </div>
                          </>
                        )}
                      />
                    </>
                  )}
                  <Controller
                    name="images"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? lighten(theme.palette.background.default, 0.4)
                              : lighten(theme.palette.background.default, 0.02),
                        }}
                        component="label"
                        htmlFor="button-file"
                        className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                      >
                        <input
                          accept="image/*"
                          className="hidden"
                          id="button-file"
                          type="file"
                          onChange={async (e) => {
                            // function readFileAsync() {
                            //   return new Promise((resolve, reject) => {
                            //     const file = e.target.files[0];
                            //     if (!file) {
                            //       return;
                            //     }
                            //     const reader = new FileReader();

                            //     reader.onload = () => {
                            //       resolve({
                            //         id: FuseUtils.generateGUID(),
                            //         url: `data:${file.type};base64,${btoa(
                            //           reader.result
                            //         )}`,
                            //         type: "image",
                            //       });
                            //     };

                            //     reader.onerror = reject;

                            //     reader.readAsBinaryString(file);
                            //   });
                            // }

                            // const newImage = await readFileAsync();

                            onChange(e.target.files[0]);
                          }}
                        />
                        <FuseSvgIcon size={32} color="action">
                          heroicons-outline:upload
                        </FuseSvgIcon>
                      </Box>
                    )}
                  />
                </div> */}
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.firstName}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="First Name"
                      placeholder="First Name"
                      id={fieldData?.fieldName?.firstName}
                      errorName={!!fieldData.errorNames.firstName}
                      errorMessage={fieldData?.errorMessage?.firstName}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.middleName}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Middle Name"
                      placeholder="Middle Name"
                      id={fieldData?.fieldName?.middleName}
                      errorName={!!fieldData.errorNames.middleName}
                      errorMessage={fieldData?.errorMessage?.middleName}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.lastName}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Last Name"
                      placeholder="Last Name"
                      id={fieldData?.fieldName?.lastName}
                      errorName={!!fieldData.errorNames.lastName}
                      errorMessage={fieldData?.errorMessage?.lastName}
                    />
                  )}
                />
                {/* <Controller
                  control={control}
                  name={fieldData?.fieldName?.emailAddress}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Email"
                      placeholder="Email"
                      type="email"
                      id={fieldData?.fieldName?.emailAddress}
                      errorName={!!fieldData.errorNames.emailAddress}
                      errorMessage={fieldData?.errorMessage?.emailAddress}
                    />
                  )}
                /> */}

                <Controller
                  control={control}
                  name={fieldData?.fieldName?.gender}
                  render={({ field }) => (
                    <RadioButton
                      data={field}
                      radioGroupName="Gender"
                      radioList={fieldData?.radioList}
                      errorMessage={fieldData?.errorMessage?.gender}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col flex-1 gap-32">
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.phoneNumber}
                  render={({ field }) => (
                    <MainPhoneInput
                      data={field}
                      placeholder="Phone number"
                      errorName={!!fieldData.errorNames.phoneNumber}
                      errorMessage={fieldData?.errorMessage?.phoneNumber}
                      required
                      setValue={setValue}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.countryOfResidence}
                  render={({ field }) => (
                    <MainSelect
                      data={field}
                      label="Country of residence"
                      placeholder="Country of residence"
                      options={country}
                      id={fieldData?.fieldName?.countryOfResidence}
                      errorMessage={fieldData?.errorMessage?.countryOfResidence}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.cityOfResidence}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="City of residence"
                      placeholder="City of residence"
                      id={fieldData?.fieldName?.cityOfResidence}
                      errorName={!!fieldData.errorNames.cityOfResidence}
                      errorMessage={fieldData?.errorMessage?.cityOfResidence}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.nationality}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Nationality"
                      placeholder="Nationality"
                      id={fieldData?.fieldName?.nationality}
                      errorName={!!fieldData.errorNames.nationality}
                      errorMessage={fieldData?.errorMessage?.nationality}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={fieldData?.fieldName?.dateOfBirth}
                  render={({ field }) => (
                    <MainDate
                      data={field}
                      label="Date of birth"
                      maxDate={new Date()}
                      id={fieldData?.fieldName?.dateOfBirth}
                      errorName={!!fieldData.errorNames.dateOfBirth}
                      errorMessage={fieldData?.errorMessage?.dateOfBirth}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/apps/profile");
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </motion.div>
  );
}

export default EditAboutTab;
