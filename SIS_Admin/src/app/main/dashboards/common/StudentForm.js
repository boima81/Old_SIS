/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import _ from "@lodash";
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import valid from "card-validator";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import FuseLoading from "@fuse/core/FuseLoading";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { getCourse } from "app/store/courseSlice";
import { getSemester } from "app/store/semesterSlice";
import {
  getApplication,
  selectApplication,
} from "app/store/singleApplicationSlice";
import {
  addRegistration,
  getRegistration,
  selectRegistration,
  uploadFileRegister,
} from "app/store/singleRegistrationSlice";
import { getProgram } from "app/store/studentSlice";
import { selectUser } from "app/store/userSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import withRouter from "@fuse/core/withRouter";
import Step0 from "./StudentStepper/Step0";
import Step1 from "./StudentStepper/Step1";
import Step2 from "./StudentStepper/Step2";
import Step3 from "./StudentStepper/Step3";
// import Step7 from "./StudentStepper/Step7";
// import {
//   addRegistration,
//   getRegistration,
//   selectRegistration,
// } from "app/store/registrationSlice";
import { getUsers, selectUsers } from "../../settings/store/usersSlice";
import { addDollar, toasterSuccess } from "../Shared/utils";
import PaymentPending from "./Stepper/PaymentPending";
import Success from "./StudentStepper/Success";
import { selectApplicationSetting } from "../../settings/store/applicationSettingSlice";
// import { getApplication, selectApplication } from "../../analytics/store/applicationSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textCenter: {
    color: "red",
    textAlign: "center",
    fontWeight: "bolder",
  },
}));

function getSteps() {
  return ["Admission", "Billing", "Payment", "Registration Complete"];
}

function StudentStepperForm({
  userType,
  addApplication,
  uploadFileApplication,
  adminRegistrationId,
  navigate,
}) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const applications = useSelector(selectApplication);
  const users = useSelector(selectUsers);
  const [loading, setLoading] = useState(false);
  const applicationData = applications;
  const applicationId = user?.applicationId?.id;
  const applicationSetting = useSelector(selectApplicationSetting);
  console.log({ applicationSetting });
  useEffect(() => {
    dispatch(getApplication(applicationId));
  }, [applicationId]);

  const registrations = useSelector(selectRegistration);
  const registrationData =
    Object.values(registrations?.entities || {})?.[0] || registrations;
  const registrationId =
    adminRegistrationId ||
    registrations?.id ||
    (userType !== "admin" ? user?.registration?.id : null);
  console.log({ registrationId, adminRegistrationId, user, registrations });
  useEffect(() => {
    dispatch(getRegistration(registrationId));
  }, [registrationId]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(
    userType === "admin" ? 0 : user?.registration?.last_step_completed || 0
  );

  const defaultValues = {
    //= ==========step0===========
    0: {
      selectStudent: null,
      programs: "",
      semester: "",
      cyberSecurityAnalyst: {
        id: 1,
        status: true,
        name: "Cybersecurity Analyst",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
      cyberSecurityAuditor: {
        id: 2,
        status: false,
        name: "Cybersecurity Auditor",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
      cyberSecurityEngineer: {
        id: 3,
        status: true,
        name: "Cybersecurity Engineer",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
      computerForensicsInvestigator: {
        id: 4,
        status: false,
        name: "Computer Forensics Investigator",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
      computerForensicsTechnician: {
        id: 5,
        status: false,
        name: "Computer Forensics Technician",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
      informationSecurityAnalyst: {
        id: 6,
        status: true,
        name: "Information Security Analyst",
        credit: "5",
        creditFees: addDollar(5),
        total: addDollar(35),
      },
    },

    1: {},
    //= ==========step2===========
    2: {
      name: "",
      email: "",
      subject: "",
      message: "",
      fullName: "",
      cardNumber: "",
      expireDate: "",
      cvv: "",
    },
    //= ==========step3===========
    3: {},
  };
  let schema = {
    //= ==========step0===========
    0: {
      validate: yup.object().shape({
        selectStudent:
          userType === "admin"
            ? yup.string().required("You must select one student")
            : "",
        cyberSecurityAnalyst: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
        cyberSecurityAuditor: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
        cyberSecurityEngineer: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
        computerForensicsInvestigator: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
        computerForensicsTechnician: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
        informationSecurityAnalyst: yup.object({
          id: yup.number(),
          status: yup.boolean(),
          name: yup.string(),
          credit: yup.number(),
          creditFees: yup.string(),
        }),
      }),
    },
    //= ==========step1===========
    1: {
      validate: yup.object().shape({}),
    },
    //= ==========step2===========
    2: {
      validate: yup.object().shape({
        fullName: yup.string().required("You must enter a full name"),
        cardNumber: yup
          .string()
          .test(
            "test-number",
            "Card Number is invalid",
            (value) => valid.number(value).isValid
          )
          .required("You must enter a card number"),
        expireDate: yup
          .date()
          .typeError("The value must be a date (MM/YYYY)")
          .required("You must enter a expire date"),
        cvv: yup
          .string()
          .max(3, "Enter valid cvv")
          .required("You must enter a cvv"),
      }),
    },
    //= ==========step3===========
    3: {
      validate: yup.object().shape({}),
    },
    //= ==========step3===========
    4: {
      validate: yup.object().shape({}),
    },
  };
  const defaultValue =
    registrationData?.offline_payment && activeStep === 2
      ? defaultValues[3]
      : defaultValues[activeStep];

  schema =
    registrationData?.offline_payment && activeStep === 2
      ? schema[3]?.validate
      : schema[activeStep]?.validate;
  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    getValues,
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  // We added one hidden state for the offline payment
  const steps = getSteps();
  const stepsCount = steps.length + 1;
  const values = getValues();
  console.log({ values });
  useEffect(() => {
    dispatch(getProgram());

    dispatch(getUsers({ role: "student", registration: 1 }));
  }, [activeStep]);

  useEffect(() => {
    dispatch(getSemester());
  }, [dispatch]);

  useEffect(() => {
    if (values?.semester) {
      setLoading(true);
      dispatch(getCourse(values?.semester))?.then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, values?.semester]);

  useEffect(() => {
    if (registrationData?.createdBy) {
      setValue("selectStudent", registrationData?.createdBy?.id);
    }
    if (registrationData?.courses?.length > 0) {
      setValue(
        "courses",
        registrationData?.courses?.map((course) => course.id) || []
      );
    }
    if (registrationData?.semesterId) {
      setValue("semester", registrationData?.semesterId?.id);
      setValue("semester_name", registrationData?.semesterId?.name);
    }
    if (registrationData?.programId) {
      setValue("programs", registrationData?.programId?.id);
      setValue("program_name", registrationData?.programId?.name);
    }
    if (registrationData?.offline_payment) {
      setValue("offline_payment", registrationData?.offline_payment);
    }
    if (registrationData?.last_step_completed) {
      setActiveStep(registrationData?.last_step_completed || 0);
    }
    if (registrationData?.invoiceId?.total_amount) {
      setValue("total_amount", registrationData?.invoiceId?.total_amount);
    }
    if (registrationData?.invoiceId?.totalTerms) {
      setValue("totalTerms", registrationData?.invoiceId?.totalTerms);
    }
    if (registrationData?.invoiceId?.paymentTerm) {
      setValue("paymentTerm", registrationData?.invoiceId?.paymentTerm);
    }
    if (
      registrationData?.invoiceId?.total_amount &&
      registrationData?.invoiceId?.paymentTerm
    ) {
      const payNowAmount = (
        registrationData?.invoiceId?.total_amount /
        (registrationData?.invoiceId?.totalTerms || 1)
      ).toFixed(2);
      setValue("payNow", payNowAmount);
    }
  }, [registrationData, setValue]);
  useEffect(() => {
    if (applicationData?.programId?.id && applicationData?.semesterId?.id) {
      setValue("programs", applicationData?.programId?.id);
    }
  }, [applicationData]);
  useEffect(() => {
    if (applicationSetting?.registrationSemester) {
      setValue("semester", applicationSetting?.registrationSemester);
    }
  }, [applicationSetting]);

  function onBack() {
    let step = activeStep - 1;
    if (activeStep === 3) {
      step = activeStep - 2;
    }
    if (activeStep === 2) {
      step = activeStep - 1;
    }
    setActiveStep(step);
  }

  function onOfflinePayment() {
    setLoading(true);
    setValue("offline_payment", true);
    let step = activeStep + 1;
    console.log({ activeStep, step });
    if (activeStep === 2 || activeStep === 3) {
      const {
        total_amount: totalAmount,
        offline_payment_receipt: offlinePaymentReceipt,
      } = values;
      const newData = {
        total_amount: totalAmount,
        step: activeStep == 2 ? activeStep + 1 : activeStep,
        id: registrationId,
        offline_payment: true,
        selectStudent: registrationData?.createdBy?.id,
      };
      dispatch(
        uploadFileRegister({
          key: "offline_payment_receipt_file",
          files: offlinePaymentReceipt,
          ...newData,
        })
      )
        .then((res) => {
          toasterSuccess("Success", "File as been submitted for review");
          step = activeStep + 1;
        })
        .then(() => {
          dispatch(getRegistration(registrationId))
            ?.then(() => {
              // setLoading(false);
            })
            .finally(() => {
              setLoading(false);
            });
        });
    }
    // (registrationData?.last_step_completed || 1) < 3
    //   ? activeStep + 1
    //   : registrationData?.last_step_completed;
    // if (activeStep <= 4) {
    //   setTimeout(() => {
    //     dispatch(getRegistration(registrationId));
    //     setActiveStep(step);
    //   }, [1000]);
    // }
  }
  console.log({ activeStep });
  function onSubmit(data) {
    if (activeStep === 0) {
      setLoading(true);
      const { courses, programs, semester, selectStudent } = data;
      const newData = {
        courses,
        programId: programs,
        semesterId: semester,
        step: activeStep + 1,
        id: registrationId,
        selectStudent,
      };
      dispatch(addRegistration(newData))?.then((action) => {
        setLoading(false);
        if (action.payload?.id && userType === "admin") {
          navigate(`/admission/registration/${action.payload?.id}`);
        }
      });
    }
    if (activeStep === 1) {
      setLoading(true);
      const {
        total_amount: totalAmount,
        pay_now: payNow,
        totalTerms,
        paymentTerm,
      } = data;
      const newData = {
        total_amount: totalAmount,
        step: activeStep + 1,
        id: registrationId,
        offline_payment: false,
        pay_now: payNow,
        totalTerms,
        paymentTerm,
        selectStudent: registrationData?.createdBy?.id,
      };
      setValue("offline_payment", false);
      dispatch(addRegistration(newData))?.then(() => {
        setLoading(false);
      });
    }
    if (activeStep === 2 || activeStep === 3) {
      const { fullName, cardNumber, expireDate, cvv } = data;
      const newData = {
        full_name: fullName,
        card_number: cardNumber,
        expire_date: moment(expireDate).format("YYYY/MM/DD"),
        cvv,
        step: activeStep === 2 ? activeStep + 2 : activeStep + 1,
        id: registrationId,
        selectStudent: registrationData?.createdBy?.id,
      };
      dispatch(addRegistration(newData));
    } else if (activeStep === 4) {
      // Active Step 7
      const newData = {
        id: registrationId,
        step: activeStep + 1,
        selectStudent: registrationData?.createdBy?.id,
      };
      dispatch(addRegistration(newData));
    }

    const step =
      (registrationData?.last_step_completed || 1) <= 4
        ? activeStep === 2
          ? activeStep + 2
          : activeStep + 1
        : registrationData?.last_step_completed;

    if (activeStep <= 4) {
      setTimeout(() => {
        dispatch(getRegistration(registrationId));
        setActiveStep(activeStep >= 4 ? 4 : step);
      }, [1000]);
    }
  }
  /**
   * Show Message if the requested products is not exists
   */
  const previewDate = moment(applicationSetting.registrationStartDate)
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  const endDate = moment(applicationSetting.registrationEndDate)
    .add(1, "day")
    .format("YYYY-MM-DD");

  const currentRegistrationDate = moment().isBetween(
    previewDate,
    endDate,
    "days"
  );

  if (!applicationSetting?.registrationStarted || !currentRegistrationDate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Registration not started yet wait for admin to start the registration
        </Typography>
        {/* <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/application"
          color="inherit"
        >
          Go to Registration Page
        </Button> */}
      </motion.div>
    );
  }

  if (userType !== "admin" && !applicationData?.is_approved) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Application needs to be submitted and approved before you can register
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/application"
          color="inherit"
        >
          Go to Registration Page
        </Button>
      </motion.div>
    );
  }

  if (_.isEmpty(form)) {
    return null;
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }
  const step2Data = {
    fieldName: {
      paymentType: "paymentType",
      fullName: "fullName",
      cardNumber: "cardNumber",
      expireDate: "expireDate",
      cvv: "cvv",
    },
    errorNames: {
      paymentType: !!errors?.paymentType,
      fullName: !!errors?.fullName,
      cardNumber: !!errors?.cardNumber,
      expireDate: !!errors?.expireDate,
      cvv: !!errors?.cvv,
    },
    errorMessage: {
      paymentType: !!errors?.paymentType?.message || "",
      fullName: errors?.fullName?.message || "",
      cardNumber: errors?.cardNumber?.message || "",
      expireDate: errors?.expireDate?.message || "",
      cvv: errors?.cvv?.message || "",
    },
  };
  const step1Data = {
    columns: ["Program", "Semester", "Selected Course"],
    rows: [{ id: 1, name: "Abc", def: "USA" }],
  };
  const step0Data = {
    setValue: (data) => setValue(data),
    tableData: step1Data,
    fieldName: {
      selectStudent: "selectStudent",
      programs: "programs",
      semester: "semester",
      courses: [],
      total_amount: null,
      cyberSecurityAnalyst: "cyberSecurityAnalyst.status",
      cyberSecurityAuditor: "cyberSecurityAuditor.status",
      cyberSecurityEngineer: "cyberSecurityEngineer.status",
      computerForensicsInvestigator: "computerForensicsInvestigator.status",
      computerForensicsTechnician: "computerForensicsTechnician.status",
      informationSecurityAnalyst: "informationSecurityAnalyst.status",
    },
    errorNames: {
      selectStudent: !!errors?.selectStudent,
      cyberSecurityAnalyst: {
        name: !!errors?.cyberSecurityAnalyst,
      },
      cyberSecurityAuditor: {
        name: !!errors?.cyberSecurityAuditor,
      },
      cyberSecurityEngineer: {
        name: !!errors?.cyberSecurityEngineer,
      },
      computerForensicsInvestigator: {
        name: !!errors?.computerForensicsInvestigator,
      },
      computerForensicsTechnician: {
        name: !!errors?.computerForensicsTechnician,
      },
      informationSecurityAnalyst: {
        name: !!errors?.computerForensicsTechnician,
      },
    },
    // {
    //   programs: !!errors?.programs,
    //   cyberSecurityAnalyst: !!errors?.cyberSecurityAnalyst,
    //   cyberSecurityAuditor: !!errors?.cyberSecurityAuditor,
    //   cyberSecurityEngineer: !!errors?.cyberSecurityEngineer,
    //   computerForensicsInvestigator: !!errors?.computerForensicsInvestigator,
    //   computerForensicsTechnician: !!errors?.computerForensicsTechnician,
    //   informationSecurityAnalyst: !!errors?.informationSecurityAnalyst,
    // },
    errorMessage: {
      selectStudent: errors?.selectStudent?.message || "",
      cyberSecurityAnalyst: {
        message: errors?.cyberSecurityAnalyst?.status?.message || "",
      },
      cyberSecurityAuditor: {
        message: errors?.cyberSecurityAuditor?.status?.message || "",
      },
      cyberSecurityEngineer: {
        message: errors?.cyberSecurityEngineer?.status?.message || "",
      },
      computerForensicsInvestigator: {
        message: errors?.computerForensicsInvestigator?.status?.message || "",
      },
      computerForensicsTechnician: {
        message: errors?.computerForensicsTechnician?.status?.message || "",
      },
      informationSecurityAnalyst: {
        message: errors?.informationSecurityAnalyst?.status?.message || "",
      },
    },
    // {
    //   programs: errors?.programs?.message || "",
    //   semester: errors?.semester?.message || "",
    //   cyberSecurityAnalyst: errors?.cyberSecurityAnalyst?.message || "",
    //   cyberSecurityAuditor: errors?.cyberSecurityAuditor?.message || "",
    //   cyberSecurityEngineer: errors?.cyberSecurityEngineer?.message || "",
    //   computerForensicsInvestigator:
    //     errors?.computerForensicsInvestigator?.message || "",
    //   computerForensicsTechnician:
    //     errors?.computerForensicsTechnician?.message || "",
    //   informationSecurityAnalyst:
    //     errors?.informationSecurityAnalyst?.message || "",
    // },
  };
  const step3Data = {
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
      emailAddress: "emailAddress",
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
      emailAddress: !!errors?.emailAddress,
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
      emailAddress: errors?.emailAddress?.message || "",
      phoneNumber: errors?.phoneNumber?.message || "",
      gender: errors?.gender?.message || "",
      countryOfResidence: errors?.countryOfResidence?.message || "",
      cityOfResidence: errors?.cityOfResidence?.message || "",
      nationality: errors?.nationality?.message || "",
      dateOfBirth: errors?.dateOfBirth?.message || "",
    },
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Step0
            control={control}
            fieldData={step0Data}
            values={values}
            setValue={setValue}
            userType={userType}
            users={users}
          />
        );
      case 1:
        return (
          <Step1
            control={control}
            fieldData={step1Data}
            values={values}
            setValue={setValue}
            registrationData={registrationData}
          />
        );
      case 2:
      case 3:
        return (
          <Step2
            control={control}
            fieldData={step2Data}
            values={values}
            user={user}
            userType={userType}
            registrationId={registrationData?.id}
            handleFileUpload={(file) => {
              setValue("offline_payment_receipt", file);
              // dispatch(
              //   uploadFileApplication({
              //     key: "offline_payment_receipt",
              //     files: file,
              //     id: applicationId,
              //     step: activeStep + 1,
              //   })
              // )
            }}
          />
        );
      case 4:
        return (
          <Step3
            control={control}
            fieldData={step3Data}
            values={values}
            setValue={setValue}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
      <div className={classes.root}>
        {registrationData?.comment &&
          (registrationData?.registration_status === "feedback" ||
            !registrationData?.isPaymentApprove) && (
            <Typography className={classes.textCenter}>
              <p>
                <strong>
                  Application Feedback: {registrationData?.comment}
                </strong>
              </p>
            </Typography>
          )}

        {registrationData?.id &&
        registrationData?.isPaymentApprove != null &&
        !registrationData?.isPaymentApprove &&
        !registrationData?.comment ? (
          <>
            <PaymentPending applicationData={registrationData} />
          </>
        ) : registrationData?.is_completed ? (
          <>
            <Success registrationData={registrationData} />
          </>
        ) : (
          <div>
            <Stepper
              activeStep={activeStep === 3 ? 2 : activeStep}
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === stepsCount ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div className="flex justify-end">
                      {activeStep > 0 && activeStep < 4 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={onBack}
                          type="button"
                        >
                          Back
                        </Button>
                      )}{" "}
                      {values?.paymentType === "offline" &&
                        (activeStep == 2 || activeStep === 3) && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={onOfflinePayment}
                            type="button"
                            disabled={
                              loading || !values?.offline_payment_receipt
                            }
                          >
                            Submit
                          </Button>
                        )}{" "}
                      {activeStep !== 2 && activeStep !== 3 && (
                        <>
                          {activeStep == 1 && (
                            <Button
                              variant="contained"
                              color="primary"
                              // type="submit"
                              onClick={() => {
                                window.location.reload();
                              }}
                              disabled={
                                activeStep === 0 &&
                                (!values?.courses ||
                                  values?.courses?.length <= 0)
                              }
                            >
                              Save & Pay Later
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="primary"
                            // onClick={handleSubmit(onSubmit)}
                            type="submit"
                            disabled={
                              activeStep === 0 &&
                              (!values?.courses || values?.courses?.length <= 0)
                            }
                          >
                            {activeStep === stepsCount - 1
                              ? "Finish"
                              : activeStep == 1
                              ? "Pay Now"
                              : "Next"}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
}

export default withRouter(StudentStepperForm);
