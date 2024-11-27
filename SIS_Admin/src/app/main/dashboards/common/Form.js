/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import _ from "@lodash";
import JwtService from "src/app/auth/services/jwtService";

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { getSemester } from "app/store/semesterSlice";
import { getProgram } from "app/store/studentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUsers, selectUsers } from "../../settings/store/usersSlice";
import {
  analyticsSteps,
  cardDateInputFormate,
  dateIosFormate,
  toasterSuccess,
} from "../Shared/utils";
import PaymentPending from "./Stepper/PaymentPending";
import Step0 from "./Stepper/Step0";
import Step1 from "./Stepper/Step1";
import Step2 from "./Stepper/Step2";
import Step3 from "./Stepper/Step3";
import Step4 from "./Stepper/Step4";
import Step5 from "./Stepper/Step5";
import Step6 from "./Stepper/Step6";
import Step7 from "./Stepper/Step7";
import Success from "./Stepper/Success";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

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

function StepperForm({
  userType,
  selectUser,
  addApplication,
  getApplication,
  selectApplication,
  uploadFileApplication,
  adminApplicationId = null,
  navigate,
}) {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplication);
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(
    userType === "admin" ? 0 : user?.applicationId?.last_step_completed || 0
  );
  const defaultValues = {
    //= ==========step0===========
    0: {
      selectStudent: null,
      paymentType: "",
    },
    1: {},
    //= ==========step2===========
    2: {
      programs: "",
      semester: "",
      cyberSecurityAnalyst: true,
      cyberSecurityAuditor: false,
      cyberSecurityEngineer: true,
      computerForensicsInvestigator: false,
      computerForensicsTechnician: true,
      informationSecurityAnalyst: false,
    },
    //= ==========step3===========
    3: {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      phoneNumber_country: "+234",
      gender: "",
      countryOfResidence: "",
      cityOfResidence: "",
      nationality: "",
      dateOfBirth: "",
      maritalStatus: "",
      physicalDisability: false,
      apply_scholarship: false,
      kInUserFullName: "",
      kInRelationship: "",
      kInResidentialAddress: "",
      nationality_upload: "",
    },
    //= ==========step4===========
    4: {
      transcript_uploadTranscript: "",
      transcript: [
        {
          transcript_firstName: "",
          transcript_lastName: "",
          transcript_emailAddress: "",
          transcript_phoneNumber: "",
          transcript_phoneNumber_country: "",
          // transcript_uploadRecommendationLatter: "",
        },
      ],
      // transcript_firstName: [{ firstName: "" }],
      // transcript_lastName: "",
      // transcript_emailAddress: "",
      // transcript_phoneNumber: "",
      // transcript_uploadRecommendationLatter: "",
    },
    //= ==========step5===========
    5: {
      goal_uploadGoal: [],
      goal_goalStatement: "",
    },
    //= ==========step6===========
    6: {
      resume_uploadResume: "",
    },
  };
  const formSchema = {
    transcript_firstName: yup.string().required("First name required"),
  };
  useEffect(() => {
    dispatch(getUsers({ role: "student", application: 1 }));
  }, []);

  let schema = {
    0: {
      //= ==========step0===========
      validate: yup.object().shape({
        selectStudent:
          userType === "admin"
            ? yup.string().required("You must select one student")
            : "",
        paymentType: yup.string().required("Select Payment Type"),
        // fullName: yup.string().required("You must enter a full name"),
        // cardNumber: yup
        //   .string()
        //   .test(
        //     "test-number",
        //     "Card Number is invalid",
        //     (value) => valid.number(value).isValid
        //   )
        //   .required("You must enter a card number"),
        // expireDate: yup
        //   .date()
        //   .typeError("The value must be a date (MM/YYYY)")
        //   .required("You must enter a expire date"),
        // cvv: yup
        //   .string()
        //   .max(3, "Enter valid cvv")
        //   .required("You must enter a cvv"),
      }),
    },
    1: {
      validate: yup.object().shape({}),
    },
    //= ==========step2===========
    2: {
      validate: yup.object().shape({
        programs: yup.string().required("You must select a program"),
        semester: yup.string().required("You must select a semester"),
      }),
    },
    //= ==========step3===========
    3: {
      validate: yup.object().shape({
        firstName: yup.string().required("You must enter a first name "),
        middleName: yup.string(),
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
            "Phone number is invalid normal",
            (value, testContext, values) => {
              const InputValue = value?.replace(
                `+${
                  testContext.parent?.phoneNumber_country?.replace("+", "") ||
                  "234"
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
          .typeError("The value must be a date (MM-DD-YYYY)")
          .required("You must enter a date of birth"),
        maritalStatus: yup.string().required("You must enter a Marital Status"),
        physicalDisability: yup
          .boolean()
          .required("You must select at-least one"),
        apply_scholarship: yup
          .boolean()
          .required("You must select at-least one"),
        kInUserFullName: yup.string().required("You must enter a name"),
        kInRelationship: yup.string().required("You must enter a relationship"),
        kInResidentialAddress: yup
          .string()
          .required("You must enter a residential address"),
        nationality_upload: yup
          .mixed()
          .test(
            "fileSize",
            "Upload Nationality Documents required",
            (value) => {
              console.log({ value });
              if (!value) {
                return false; // attachment is optional
              }
              return true;
            }
          ),
        // .required("Upload Nationality Documents"),
      }),
    },
    //= ==========step4===========
    4: {
      validate: yup.object().shape({
        transcript_uploadTranscript: yup
          .mixed()
          .test("fileSize", "Upload Transcript file required", (value) => {
            console.log({ value });
            if (!value) {
              return false; // attachment is optional
            }
            return true;
          }),
        transcript: yup.array().of(
          yup.object().shape({
            transcript_firstName: yup
              .string()
              .required("You must enter first name"),
            transcript_lastName: yup
              .string()
              .required("You must enter last name"),
            transcript_emailAddress: yup
              .string()
              .email("You must enter a valid email")
              // .typeError("Enter valid email")
              .required("You must enter email"),
            transcript_phoneNumber: yup
              .string()
              // .matches(phoneRegExp, "Phone number is not valid")
              .test(
                "test-number",
                "Phone number is invalid transctip",
                (value, testContext, values) => {
                  const InputValue = value.replace(
                    `+${
                      testContext?.parent?.transcript_phoneNumber_country ||
                      "234"
                    }`,
                    ""
                  );
                  if (InputValue?.length >= 8 && InputValue?.length <= 10) {
                    return true;
                  }
                  return false;
                }
              )
              .required("You must enter phone number"),
            // transcript_uploadRecommendationLatter: yup
            //   .mixed()
            //   .required("Upload document"),
          })
        ),
      }),
    },
    //= ==========step5===========
    5: {
      validate: yup.object().shape({
        goal_uploadGoal: yup.mixed(),
        // .required("Upload document"),
        goal_goalStatement: yup
          .string("You must enter goal statement")
          .required("Goal statement required")
          .when("goal_uploadGoal", (goalUploadGoal, field) => {
            return !goalUploadGoal
              ? field.required("You must enter goal statement")
              : field;
          }),
      }),
    },
    //= ==========step6===========
    6: {
      validate: yup.object().shape({
        resume_uploadResume: yup.mixed(),
      }),
    },
    7: {
      validate: yup.object().shape({}),
    },
  };
  const applicationData = applications;
  console.log({ applicationData });
  const defaultValue =
    applicationData?.offline_payment && activeStep === 0
      ? defaultValues[1]
      : defaultValues[activeStep];
  schema =
    applicationData?.offline_payment && activeStep === 0
      ? schema[1]?.validate
      : schema[activeStep]?.validate;

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
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "transcript",
    });
  const { isValid, dirtyFields, errors } = formState;
  const values = getValues();
  console.log({ values });
  const form = watch();
  const applicationId =
    adminApplicationId ||
    (userType !== "admin"
      ? applications?.ids?.[0] || user?.applicationId?.id
      : null);

  useEffect(() => {
    dispatch(getApplication(applicationId));
  }, [applicationId]);

  useEffect(() => {
    dispatch(getProgram());
    dispatch(getSemester());
  }, []);

  const handleSetValue = (activeStepId, datas) => {
    if (user?.applicationFee?.applicationAmount) {
      setValue("application_fee", user?.applicationFee?.applicationAmount);
    }
    if (activeStepId === 0 && userType === "admin") {
      setValue("selectStudent", applicationData?.selectStudent);
    }
    if (activeStepId === 0) {
      setValue("offline_payment", applicationData?.offline_payment);
    }
    if (activeStepId === 4) {
      const newRecommendation = applicationData?.recommendations?.map(
        (data) => ({
          transcript_firstName: data?.first_name,
          transcript_lastName: data?.last_name,
          transcript_emailAddress: data?.email,
          transcript_phoneNumber: data?.phone_number,
          transcript_phoneNumber_country: data?.phone_number_country_code,
          id: data?.id,
        })
      );
      setValue("transcript", newRecommendation);
    } else {
      datas?.forEach?.((data) => {
        const [key, value] = Object.entries?.(data)?.[0];
        if (key === "expireDate") {
          setValue(key, moment(value, "MM/YYYY").format("YYYY-MM-DD"));
        } else if (key === "programs") {
          setValue(key, applicationData?.programId?.id);
        } else if (key === "semester") {
          setValue(key, applicationData?.semesterId?.id);
        } else if (key === "dateOfBirth" && activeStepId === 3) {
          setValue(
            key,
            value ? moment(value, dateIosFormate).format("YYYY-MM-DD") : null
          );
        } else {
          setValue(key, value);
        }
      });
    }
    setValue(
      "resume_uploadResume",
      applicationData?.resumeFile?.[0]?.fileId?.url
    );
    setValue(
      "goal_uploadGoal",
      applicationData?.goalFile?.map((goal) => goal?.fileId?.url)
    );
    setValue(
      "transcript_uploadTranscript",
      applicationData?.transcriptFile?.map?.(
        (transcript) => transcript?.fileId?.url
      )
    );
    setValue(
      "nationality_upload",
      applicationData?.nationalityFile?.length > 0
        ? applicationData?.nationalityFile?.map?.(
            (nationality) => nationality?.fileId?.url
          )
        : ""
    );
  };

  const reviewData = [
    {
      id: 0,
      heading: "Card Details",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        {
          fullName: applicationData?.applicationFee?.full_name || "",
        },
        { cardNumber: applicationData?.applicationFee?.card_number || "" },
        {
          expireDate: applicationData?.applicationFee?.expire_date
            ? moment(applicationData?.applicationFee?.expire_date).format(
                cardDateInputFormate
              )
            : "",
        },
        {
          cvv: applicationData?.applicationFee?.cvv,
        },
      ],
    },
    {
      id: 2,
      heading: "Academic program",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        { programs: applicationData?.programId?.name || "" },
        { semester: applicationData?.semesterId?.name || "" },
        // { cyberSecurityAnalyst: "cyberSecurityAnalyst" },
        // { cyberSecurityAuditor: "cyberSecurityAuditor" },
        // { cyberSecurityEngineer: "cyberSecurityEngineer" },
        // { computerForensicsInvestigator: "computerForensicsInvestigator" },
        // { computerForensicsTechnician: "computerForensicsTechnician" },
        // { informationSecurityAnalyst: "informationSecurityAnalyst" },
      ],
    },
    {
      id: 3,
      heading: "Personal Information",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        {
          profilePicture: applicationData?.photoURL,
        },
        {
          firstName:
            applicationData?.userInformationId?.first_name ||
            (userType !== "admin" ? user?.userInformationId?.first_name : ""),
        },
        {
          middleName:
            applicationData?.userInformationId?.middle_name ||
            (userType !== "admin" ? user?.userInformationId?.middle_name : ""),
        },
        {
          lastName:
            applicationData?.userInformationId?.last_name ||
            (userType !== "admin" ? user?.userInformationId?.last_name : ""),
        },
        {
          emailAddress:
            applicationData?.createdBy?.email ||
            (userType !== "admin" ? user?.email : ""),
        },
        {
          phoneNumber:
            applicationData?.userInformationId?.phone_number ||
            (userType !== "admin" ? user?.userInformationId?.phone_number : ""),
        },
        {
          phoneNumber_country:
            applicationData?.userInformationId?.phone_number_country_code ||
            (userType !== "admin"
              ? user?.userInformationId?.phone_number_country_code
              : ""),
        },
        {
          gender:
            applicationData?.userInformationId?.gender ||
            (userType !== "admin" ? user?.userInformationId?.gender : ""),
        },
        {
          countryOfResidence:
            applicationData?.userInformationId?.country ||
            (userType !== "admin" ? user?.userInformationId?.country : ""),
        }, // convert to iso to name of country
        {
          cityOfResidence:
            applicationData?.userInformationId?.city ||
            (userType !== "admin" ? user?.userInformationId?.city : ""),
        },
        {
          nationality:
            applicationData?.userInformationId?.nationality ||
            (userType !== "admin" ? user?.userInformationId?.nationality : ""),
        },
        {
          nationalityId: applicationData?.nationalityFile?.map((data) => {
            return (
              <>
                <a
                  href={data?.fileId?.url}
                  className="!no-underline !bg-transparent !border-none"
                  target="_blank"
                >
                  <div className="flex content-center">
                    {data?.fileId?.name}
                    <FuseSvgIcon size={20} color="action">
                      download
                    </FuseSvgIcon>
                  </div>
                </a>
              </>
            );
          }),
        },
        {
          dateOfBirth: applicationData?.userInformationId?.date_of_birth
            ? moment(applicationData?.userInformationId?.date_of_birth).format(
                dateIosFormate
              )
            : userType !== "admin"
            ? user?.userInformationId?.date_of_birth
              ? moment(user?.userInformationId?.date_of_birth).format(
                  dateIosFormate
                )
              : ""
            : "",
        },
        {
          maritalStatus:
            applicationData?.userInformationId?.maritalStatus ||
            (userType !== "admin"
              ? user?.userInformationId?.maritalStatus
              : ""),
        },
        {
          physicalDisability:
            applicationData?.userInformationId?.physicalDisability,
          // ||
          // userType !== "admin"
          // ? user?.userInformationId?.physicalDisability
          // : "",
        },
        {
          apply_scholarship: applicationData?.apply_scholarship,
        },
        {
          kInUserFullName:
            applicationData?.userInformationId?.kInUserFullName ||
            (userType !== "admin"
              ? user?.userInformationId?.kInUserFullName
              : ""),
        },
        {
          kInResidentialAddress:
            applicationData?.userInformationId?.kInResidentialAddress ||
            (userType !== "admin"
              ? user?.userInformationId?.kInResidentialAddress
              : ""),
        },
        {
          kInRelationship:
            applicationData?.userInformationId?.kInRelationship ||
            (userType !== "admin"
              ? user?.userInformationId?.kInRelationship
              : ""),
        },
      ],
    },
    {
      id: 4,
      heading: "Transcript",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        ...(applicationData?.transcriptFile?.map((transcriptFile) => ({
          transcript_uploadTranscript: transcriptFile?.fileId?.name
            ? {
                name: transcriptFile?.fileId?.name,
                url: transcriptFile?.fileId?.url,
              }
            : "",
        })) || []),
        // { transcript_uploadRecommendationLatter: "Recommendation image" },
        {
          transcript: applicationData?.recommendations?.map((data) => ({
            transcript_firstName: data?.first_name,
            transcript_lastName: data?.last_name,
            transcript_emailAddress: data?.email,
            transcript_phoneNumber: data?.phone_number,
            transcript_phoneNumber_country: data?.phone_number_country_code,
          })) || [
            {
              transcript_firstName: "",
              transcript_lastName: "",
              transcript_emailAddress: "",
              transcript_phoneNumber: "",
              transcript_phoneNumber_country: "",
              // transcript_uploadRecommendationLatter: "",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      heading: "Goal Statement",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        ...(applicationData?.goalFile?.map((goalFile) => ({
          goal_uploadGoal: goalFile?.fileId?.name
            ? {
                name: goalFile?.fileId?.name,
                url: goalFile?.fileId?.url,
              }
            : "",
        })) || []),
        { goal_goalStatement: applicationData?.goal_statement },
      ],
    },
    {
      id: 6,
      heading: "Resume/CV",
      setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
      data: [
        ...(applicationData?.resumeFile?.map((resumeFile) => ({
          resume_uploadResume: resumeFile?.fileId?.name
            ? {
                name: resumeFile?.fileId?.name,
                url: resumeFile?.fileId?.url,
              }
            : "",
        })) || []),
      ],
    },
  ];

  useEffect(() => {
    // userType === "admin" &&
    if (applicationData) {
      console.log({ applicationData });
      const step = applicationData?.last_step_completed || activeStep || 0;
      const newData = reviewData?.filter((data) => data?.id === step)?.[0];
      handleSetValue(step, newData?.data || {});
      setActiveStep(step);
    }
  }, [applicationData]);
  function onBack() {
    const step =
      activeStep === 0
        ? activeStep
        : activeStep === 1
        ? 0
        : activeStep === 2
        ? activeStep - 2
        : activeStep - 1;
    if (step === 0 && values?.offline_payment) {
      setValue("offline_payment", false);
    }
    const newData = reviewData?.filter((data) => data?.id === step)?.[0];
    handleSetValue(step, newData?.data || {});
    setActiveStep(step);
  }

  useEffect(() => {
    if (activeStep === 0) {
      setValue("offline_payment", applicationData?.offline_payment);
    }
    if (activeStep === 3) {
      const newData = reviewData?.filter(
        (data) => data?.id === activeStep
      )?.[0];
      handleSetValue(activeStep, newData?.data || {});
    }
    if (activeStep === 4) {
      let newRecommendation = applicationData?.recommendations?.map((data) => ({
        transcript_firstName: data?.first_name,
        transcript_lastName: data?.last_name,
        transcript_emailAddress: data?.email,
        transcript_phoneNumber: data?.phone_number,
        transcript_phoneNumber_country: data?.phone_number_country_code,

        id: data?.id,
      }));
      if (newRecommendation?.length <= 0) {
        newRecommendation = [
          {
            transcript_firstName: "",
            transcript_lastName: "",
            transcript_emailAddress: "",
            transcript_phoneNumber: "",
            transcript_phoneNumber_country: "+234",
          },
        ];
      }
      setValue("transcript", newRecommendation);
    }
  }, [activeStep, applicationData]);

  function onlinePayment() {
    setValue("offline_payment", false);
    if (activeStep === 0) {
      let step = activeStep;
      const { selectStudent } = values;
      const newData = {
        selectStudent,
        step: activeStep,
        id: applicationId,
        offline_payment: false,
      };
      dispatch(addApplication(newData));
      step = activeStep;
      if (activeStep <= 7) {
        setTimeout(() => {
          dispatch(getApplication(applicationId));
          setActiveStep(step);
        }, [1000]);
      }
    }
  }
  function onOfflinePayment() {
    setLoading(true);
    setValue("offline_payment", true);
    let step = activeStep;
    if (activeStep === 0) {
      const { selectStudent, offline_payment_receipt: offlinePaymentReceipt } =
        values;
      const newData = {
        selectStudent,
        step: activeStep,
        id: applicationId,
        offline_payment: true,
        application_fee: user?.applicationFee?.applicationAmount,
        offline_payment_receipt: offlinePaymentReceipt,
      };
      dispatch(
        uploadFileApplication({
          key: "offline_payment_receipt_file",
          files: offlinePaymentReceipt,
          ...newData,
        })
      )
        .then((res) => {
          console.log({ res });
          toasterSuccess("Success", "File as been submitted for review");
          if (res.payload?.id && userType === "admin") {
            // window.location.href = `/admission/application/${res.payload?.id}`;
            navigate(`/admission/application/${res.payload?.id}`);
          }
        })
        .then(() => {
          // setLoading(false);
          dispatch(getApplication(applicationId))
            .then(() => {
              setLoading(false);
            })
            .finally(() => {
              setLoading(false);
            });
        });
      step = activeStep;
    }
    // (registrationData?.last_step_completed || 1) < 3
    //   ? activeStep + 1
    //   : registrationData?.last_step_completed;
    if (activeStep <= 7) {
      setTimeout(() => {
        dispatch(getApplication(applicationId));
        setActiveStep(step + 2);
      }, [1000]);
    }
  }

  async function onSubmit(data) {
    console.log({ step: activeStep });

    if (activeStep === 0) {
      const {
        fullName,
        cardNumber,
        expireDate,
        cvv,
        selectStudent,
        offline_payment: offlinePayment,
        offline_payment_receipt: offlinePaymentReceipt,
      } = data;
      setLoading(true);
      const newData = {
        offline_payment: offlinePayment,
        full_name: fullName,
        card_number: cardNumber,
        expire_date: expireDate
          ? moment(expireDate).format("YYYY/MM/DD")
          : null,
        cvv,
        step: activeStep + 2,
        id: applicationId,
        selectStudent,
      };
      console.log({ step: activeStep });
      dispatch(
        uploadFileApplication({
          key: "offline_payment_receipt_file",
          files: offlinePaymentReceipt,
          ...newData,
        })
      ).then((res) => {
        setLoading(false);
        if (res.payload?.id && userType === "admin") {
          navigate(`/admission/application/${res.payload?.id}`);
        }
        dispatch(getApplication(applicationId))?.then(() => {
          setActiveStep(activeStep + 2);
        });
      });
    } else if (activeStep === 1) {
      setLoading(true);

      const newData = {
        step: activeStep + 1,
        id: applicationId,
      };
      dispatch(addApplication(newData)).then((action) => {
        if (action.payload) {
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setActiveStep(step);
            });
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });

      // Exam
    } else if (activeStep === 2) {
      setLoading(true);
      const { programs, semester } = data;
      const newData = {
        programId: programs,
        semesterId: semester,
        id: applicationId,
        step: activeStep + 1,
      };
      dispatch(addApplication(newData)).then((action) => {
        setLoading(false);
        if (action.payload) {
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setActiveStep(step);
              setLoading(false);
            });
          }
        } else {
          setLoading(false);
        }
      });
    } else if (activeStep === 3) {
      setLoading(true);
      const {
        firstName,
        middleName,
        lastName,
        emailAddress: email,
        phoneNumber,
        phoneNumber_country: phoneNumberCountry,
        gender,
        countryOfResidence,
        cityOfResidence,
        nationality,
        dateOfBirth,
        images,
        maritalStatus,
        physicalDisability,
        apply_scholarship: applyScholarship,
        kInUserFullName,
        kInResidentialAddress,
        kInRelationship,
      } = data;
      let avatarFile = null;
      if (images) {
        avatarFile = await JwtService.uploadUserAvatar(images);
      }
      dispatch(
        uploadFileApplication({
          key: "nationalityFile",
          files: data?.nationality_upload,
          id: applicationId,
          step: activeStep + 1,
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          phoneNumberCountry,
          gender,
          country: countryOfResidence,
          city: cityOfResidence,
          nationality,
          date_of_birth: dateOfBirth
            ? moment(dateOfBirth).format("YYYY/MM/DD")
            : null,
          avatarFile,
          maritalStatus,
          physicalDisability,
          apply_scholarship: applyScholarship,
          kInUserFullName,
          kInResidentialAddress,
          kInRelationship,
        })
      )?.then((actionFileUpload) => {
        if (actionFileUpload.payload) {
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setActiveStep(step);
              setLoading(false);
            });
          }
        } else {
          setLoading(false);
        }
      });

      // console.log({ avatarFile });
      // dispatch(
      //   addApplication({
      //     firstName,
      //     middleName,
      //     lastName,
      //     email,
      //     phoneNumber,
      //     phoneNumberCountry,
      //     gender,
      //     country: countryOfResidence,
      //     city: cityOfResidence,
      //     nationality,
      //     date_of_birth: dateOfBirth
      //       ? moment(dateOfBirth).format("YYYY/MM/DD")
      //       : null,
      //     id: applicationId,
      //     step: activeStep + 1,
      //     avatarFile,
      //     maritalStatus,
      //     physicalDisability,
      //     kInUserFullName,
      //     kInResidentialAddress,
      //     kInRelationship,
      //   })
      // ).then((action) => {
      //   if (action.payload?.id) {
      //     const step =
      //       (applicationData?.last_step_completed || 1) < 7
      //         ? activeStep === 0
      //           ? activeStep + 2
      //           : activeStep + 1
      //         : applicationData?.last_step_completed;
      //     if (activeStep <= 7) {
      //       dispatch(getApplication(applicationId))?.then(() => {
      //         setActiveStep(step);
      //         setLoading(false);
      //       });
      //     }
      //   } else {
      //     setLoading(false);
      //   }
      // });
    } else if (activeStep === 4) {
      setLoading(true);
      dispatch(
        uploadFileApplication({
          key: "transcript",
          files: data?.transcript_uploadTranscript,
          id: applicationId,
          step: activeStep + 1,
          recommendation: data?.transcript,
        })
      )?.then((actionFileUpload) => {
        if (actionFileUpload.payload) {
          // const newData = {
          //   recommendation: data?.transcript,
          //   id: applicationId,
          //   step: activeStep + 1,
          // };
          // dispatch(addApplication(newData)).then((action) => {
          //   if (action.payload) {
          //     const step =
          //       (applicationData?.last_step_completed || 1) < 7
          //         ? activeStep === 0
          //           ? activeStep + 2
          //           : activeStep + 1
          //         : applicationData?.last_step_completed;
          //     if (activeStep <= 7) {
          //       dispatch(getApplication(applicationId))?.then(() => {
          //         setLoading(false);
          //         setActiveStep(step);
          //       });
          //     }
          //   } else {
          //     setLoading(false);
          //   }
          // });
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setLoading(false);
              setActiveStep(step);
            });
          }
        } else {
          setLoading(false);
        }
      });
    } else if (activeStep === 5) {
      // Active Step 5
      setLoading(true);
      dispatch(
        uploadFileApplication({
          key: "goal",
          files: data?.goal_uploadGoal,
          goal_statement: data?.goal_goalStatement,
          id: applicationId,
          step: activeStep + 1,
        })
      ).then((actionFile) => {
        if (actionFile.payload) {
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setActiveStep(step);
              setLoading(false);
            });
          }
        } else {
          setLoading(false);
        }
        // setActiveStep(activeStep + 1);
      });
    } else if (activeStep === 6) {
      // Active Step 6
      setLoading(true);
      dispatch(
        uploadFileApplication({
          key: "csv",
          files: data?.resume_uploadResume || [],
          id: applicationId,
          step: activeStep + 1,
        })
      ).then((actionFile) => {
        if (actionFile.payload) {
          const step =
            (applicationData?.last_step_completed || 1) < 7
              ? activeStep === 0
                ? activeStep + 2
                : activeStep + 1
              : applicationData?.last_step_completed;
          if (activeStep <= 7) {
            dispatch(getApplication(applicationId))?.then(() => {
              setActiveStep(step);
              setLoading(false);
            });
          }
        } else {
          setLoading(false);
        }
      });
    } else if (activeStep === 7) {
      // Active Step 7
      setLoading(true);
      const newData = { id: applicationId, step: activeStep + 1 };
      dispatch(addApplication(newData)).then((action) => {
        if (action.payload) {
          if (activeStep <= 7) {
            const step =
              (applicationData?.last_step_completed || 1) < 7
                ? activeStep === 0
                  ? activeStep + 2
                  : activeStep + 1
                : applicationData?.last_step_completed;

            dispatch(getApplication(applicationId)).then(() => {
              setLoading(false);
              setActiveStep(step);
            });
          }
        } else {
          setLoading(false);
        }
      });
    }
    // const step =
    //   (applicationData?.last_step_completed || 1) < 7
    //     ? activeStep === 0
    //       ? activeStep + 2
    //       : activeStep + 1
    //     : applicationData?.last_step_completed;
    // if (activeStep <= 7) {
    //   setTimeout(() => {
    //     dispatch(getApplication(applicationId));
    //     setActiveStep(step);
    //   }, [1000]);
    // }
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
  const steps = analyticsSteps();
  console.log({ errors });
  const step0Data = {
    fieldName: {
      selectStudent: "selectStudent",
      paymentType: "paymentType",
      // fullName: "fullName",
      // cardNumber: "cardNumber",
      // expireDate: "expireDate",
      // cvv: "cvv",
    },
    errorNames: {
      selectStudent: !!errors?.selectStudent,
      paymentType: !!errors?.paymentType,
      // fullName: !!errors?.fullName,
      // cardNumber: !!errors?.cardNumber,
      // expireDate: !!errors?.expireDate,
      // cvv: !!errors?.cvv,
    },
    errorMessage: {
      selectStudent: errors?.selectStudent?.message || "",
      paymentType: !!errors?.paymentType,
      // fullName: errors?.fullName?.message || "",
      // cardNumber: errors?.cardNumber?.message || "",
      // expireDate: errors?.expireDate?.message || "",
      // cvv: errors?.cvv?.message || "",
    },
  };
  const step1Data = {
    columns: ["id", "name", "address"],
    rows: [{ id: 1, name: "Abc", def: "USA" }],
  };
  const step2Data = {
    tableData: step1Data,
    fieldName: {
      programs: "programs",
      semester: "semester",
      cyberSecurityAnalyst: "cyberSecurityAnalyst",
      cyberSecurityAuditor: "cyberSecurityAuditor",
      cyberSecurityEngineer: "cyberSecurityEngineer",
      computerForensicsInvestigator: "computerForensicsInvestigator",
      computerForensicsTechnician: "computerForensicsTechnician",
      informationSecurityAnalyst: "informationSecurityAnalyst",
    },
    errorNames: {
      programs: !!errors?.programs,
      cyberSecurityAnalyst: !!errors?.cyberSecurityAnalyst,
      cyberSecurityAuditor: !!errors?.cyberSecurityAuditor,
      cyberSecurityEngineer: !!errors?.cyberSecurityEngineer,
      computerForensicsInvestigator: !!errors?.computerForensicsInvestigator,
      computerForensicsTechnician: !!errors?.computerForensicsTechnician,
      informationSecurityAnalyst: !!errors?.informationSecurityAnalyst,
    },
    errorMessage: {
      programs: errors?.programs?.message || "",
      semester: errors?.semester?.message || "",
      cyberSecurityAnalyst: errors?.cyberSecurityAnalyst?.message || "",
      cyberSecurityAuditor: errors?.cyberSecurityAuditor?.message || "",
      cyberSecurityEngineer: errors?.cyberSecurityEngineer?.message || "",
      computerForensicsInvestigator:
        errors?.computerForensicsInvestigator?.message || "",
      computerForensicsTechnician:
        errors?.computerForensicsTechnician?.message || "",
      informationSecurityAnalyst:
        errors?.informationSecurityAnalyst?.message || "",
    },
  };
  const step3Data = {
    setError: (error) => setError(error),
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
    radioListPhysicalDisability: [
      {
        id: 1,
        value: true,
        label: "Yes",
      },
      {
        id: 2,
        value: false,
        label: "No",
      },
    ],
    radioListScholarship: [
      {
        id: 1,
        value: true,
        label: "Yes",
      },
      {
        id: 2,
        value: false,
        label: "No",
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
      maritalStatus: "maritalStatus",
      physicalDisability: "physicalDisability",
      apply_scholarship: "apply_scholarship",
      kInUserFullName: "kInUserFullName",
      kInRelationship: "kInRelationship",
      kInResidentialAddress: "kInResidentialAddress",
      nationality_upload: "nationality_upload",
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
      maritalStatus: !!errors?.maritalStatus,
      physicalDisability: !!errors?.physicalDisability,
      apply_scholarship: !!errors?.apply_scholarship,
      kInUserFullName: !!errors?.kInUserFullName,
      kInRelationship: !!errors?.kInRelationship,
      kInResidentialAddress: !!errors?.kInResidentialAddress,
      nationality_upload: !!errors?.nationality_upload,
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
      maritalStatus: errors?.maritalStatus?.message || "",
      physicalDisability: errors?.physicalDisability?.message || "",
      apply_scholarship: errors?.apply_scholarship?.message || "",
      kInUserFullName: errors?.kInUserFullName?.message || "",
      kInRelationship: errors?.kInRelationship?.message || "",
      kInResidentialAddress: errors?.kInResidentialAddress?.message || "",
      nationality_upload: errors?.nationality_upload?.message || "",
    },
  };
  const step4Data = {
    setError: (error) => setError(error),
    setValue: (data) => setValue(data),
    fieldName: {
      transcript_uploadTranscript: "transcript_uploadTranscript",
      transcript_firstName: "transcript_firstName",
      transcript_lastName: "transcript_lastName",
      transcript_emailAddress: "transcript_emailAddress",
      transcript_phoneNumber: "transcript_phoneNumber",
      transcript_phoneNumber_country: "transcript_phoneNumber_country",
      transcript_uploadRecommendationLatter:
        "transcript_uploadRecommendationLatter",
    },
    errorNames: {
      transcript_uploadTranscript: !!errors?.transcript_uploadTranscript,
      transcript: [
        ...(errors?.transcript?.map?.((error) => ({
          transcript_firstName: !!error?.transcript_firstName,
          transcript_lastName: !!error?.transcript_lastName,
          transcript_emailAddress: error?.transcript_emailAddress,
          transcript_phoneNumber: !!error?.transcript_phoneNumber,
          transcript_phoneNumber_country: "",
        })) || []),
      ],

      // transcript_uploadRecommendationLatter:
      //   !!errors?.transcript?.transcript_uploadRecommendationLatter,
    },
    errorMessage: {
      transcript_uploadTranscript:
        errors?.transcript_uploadTranscript?.message || "",
      transcript: [
        ...(errors?.transcript?.map?.((error) => ({
          transcript_firstName: error?.transcript_firstName?.message || "",
          transcript_lastName: error?.transcript_lastName?.message || "",
          transcript_emailAddress:
            error?.transcript_emailAddress?.message || "",
          transcript_phoneNumber: error?.transcript_phoneNumber?.message || "",
          transcript_phoneNumber_country: "",
        })) || []),
      ],
    },
  };
  const step5Data = {
    setError: (error) => setError(error),
    fieldName: {
      goal_uploadGoal: "goal_uploadGoal",
      goal_goalStatement: "goal_goalStatement",
    },
    errorNames: {
      goal_uploadGoal: !!errors?.goal_uploadGoal,
      goal_goalStatement: !!errors?.goal_goalStatement,
    },
    errorMessage: {
      goal_uploadGoal: errors?.goal_uploadGoal?.message || "",
      goal_goalStatement: errors?.goal_goalStatement?.message || "",
    },
  };
  const step6Data = {
    setError: (error) => setError(error),
    fieldName: {
      resume_uploadResume: "resume_uploadResume",
    },
    errorNames: {
      resume_uploadResume: !!errors?.resume_uploadResume,
    },
    errorMessage: {
      resume_uploadResume: errors?.resume_uploadResume?.message || "",
    },
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Step0
            users={users}
            control={control}
            fieldData={step0Data}
            userType={userType}
            values={values}
            user={user}
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
      case 1:
        return <Step1 control={control} fieldData={step1Data} />;
      case 2:
        return (
          <Step2 control={control} fieldData={step2Data} values={values} />
        );
      case 3:
        return (
          <Step3
            control={control}
            setValue={setValue}
            fieldData={step3Data}
            values={values}
            userType={userType}
            nationalityId={applicationData?.nationalityFile || []}
          />
        );
      case 4:
        return (
          <Step4
            control={control}
            fieldData={step4Data}
            fields={fields}
            append={() =>
              append({
                transcript_firstName: "",
                transcript_lastName: "",
                transcript_emailAddress: "",
                transcript_phoneNumber: "",
                transcript_phoneNumber_country: "",
              })
            }
            remove={(index) => remove(index)}
            setValue={setValue}
            values={applicationData?.transcriptFile}
          />
        );
      case 5:
        return (
          <Step5
            control={control}
            fieldData={step5Data}
            values={applicationData?.goalFile}
          />
        );
      case 6:
        return (
          <Step6
            control={control}
            fieldData={step6Data}
            values={applicationData?.resumeFile}
          />
        );
      case 7:
        return <Step7 fieldData={reviewData} handleSetValue={handleSetValue} />;
      default:
        return "Unknown stepIndex";
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
      <div className={classes.root}>
        {/* userType !== "admin" && */}
        {applicationData?.comment &&
          (applicationData?.application_status === "feedback" ||
            !applicationData?.isPaymentApprove) && (
            <Typography className={classes.textCenter}>
              <p>
                <strong>
                  Application Feedback: {applicationData?.comment}
                </strong>
              </p>
            </Typography>
          )}

        {applicationData?.id &&
        applicationData?.isPaymentApprove != null &&
        !applicationData?.isPaymentApprove &&
        !applicationData?.comment ? (
          <>
            <PaymentPending applicationData={applicationData} />
          </>
        ) : applicationData?.is_completed ? (
          <>
            <Success applicationData={applicationData} />
          </>
        ) : (
          <>
            <Stepper
              activeStep={activeStep > 0 ? activeStep - 1 : activeStep}
              alternativeLabel
            >
              {steps.map((label) =>
                label ? (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ) : null
              )}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
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
                      {activeStep > 1 && activeStep < 7 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={onBack}
                          type="button"
                        >
                          Back
                        </Button>
                      )}
                      {activeStep === 0 &&
                        values?.paymentType === "offline" && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={onlinePayment}
                            type="button"
                          >
                            Back
                          </Button>
                        )}{" "}
                      {activeStep === 0 &&
                        values?.paymentType === "offline" && (
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
                      {activeStep > 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={handleSubmit(onSubmit)}
                          type="submit"
                        >
                          {activeStep === steps.length - 1
                            ? "Finish"
                            : "Save & Next"}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </Paper>
  );
}
export default withRouter(StepperForm);
