import { Grid, Paper } from "@mui/material";
import moment from "moment";
import React from "react";
import ReviewWidgetAdmin from "src/app/main/dashboards/analytics/widgets/ReviewWidgetAdmin";
import ReviewWidgetApplicationAdmin from "src/app/main/dashboards/analytics/widgets/ReviewWidgetApplicationAdmin";

// const reviewData = [
//   {
//     id: 0,
//     heading: "Card Details",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [
//       {
//         fullName: applicationData?.applicationFee?.full_name || "",
//       },
//       { cardNumber: applicationData?.applicationFee?.card_number || "" },
//       {
//         expireDate: applicationData?.applicationFee?.expire_date
//           ? moment(applicationData?.applicationFee?.expire_date).format(
//               cardDateInputFormate
//             )
//           : "",
//       },
//       {
//         cvv: applicationData?.applicationFee?.cvv,
//       },
//     ],
//   },
//   {
//     id: 2,
//     heading: "Academic program",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [
//       { programs: applicationData?.programId?.name || "" },
//       { semester: applicationData?.semesterId?.name || "" },
//       // { cyberSecurityAnalyst: "cyberSecurityAnalyst" },
//       // { cyberSecurityAuditor: "cyberSecurityAuditor" },
//       // { cyberSecurityEngineer: "cyberSecurityEngineer" },
//       // { computerForensicsInvestigator: "computerForensicsInvestigator" },
//       // { computerForensicsTechnician: "computerForensicsTechnician" },
//       // { informationSecurityAnalyst: "informationSecurityAnalyst" },
//     ],
//   },
//   {
//     id: 3,
//     heading: "Personal Information",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [
//       {
//         firstName:
//           applicationData?.userInformationId?.first_name ||
//           user?.userInformationId?.first_name,
//       },
//       {
//         middleName:
//           applicationData?.userInformationId?.middle_name ||
//           user?.userInformationId?.middle_name,
//       },
//       {
//         lastName:
//           applicationData?.userInformationId?.last_name ||
//           user?.userInformationId?.last_name,
//       },
//       { emailAddress: user?.email },
//       {
//         phoneNumber:
//           applicationData?.userInformationId?.phone_number ||
//           user?.userInformationId?.phone_number,
//       },
//       {
//         phoneNumber_country:
//           applicationData?.userInformationId?.phone_number_country_code ||
//           user?.userInformationId?.phone_number_country_code,
//       },
//       {
//         gender:
//           applicationData?.userInformationId?.gender ||
//           user?.userInformationId?.gender,
//       },
//       {
//         countryOfResidence:
//           applicationData?.userInformationId?.country ||
//           user?.userInformationId?.country,
//       }, // convert to iso to name of country
//       {
//         cityOfResidence:
//           applicationData?.userInformationId?.city ||
//           user?.userInformationId?.city,
//       },
//       {
//         nationality:
//           applicationData?.userInformationId?.nationality ||
//           user?.userInformationId?.nationality,
//       },
//       {
//         dateOfBirth: applicationData?.userInformationId?.date_of_birth
//           ? moment(applicationData?.userInformationId?.date_of_birth).format(
//               dateIosFormate
//             )
//           : user?.userInformationId?.date_of_birth
//           ? moment(user?.userInformationId?.date_of_birth).format(
//               dateIosFormate
//             )
//           : "",
//       },
//     ],
//   },
//   {
//     id: 4,
//     heading: "Transcript",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [
//       { transcript_uploadTranscript: "Transcript Image" },
//       // { transcript_uploadRecommendationLatter: "Recommendation image" },
//       {
//         transcript: applicationData?.recommendations?.map((data) => ({
//           transcript_firstName: data?.first_name,
//           transcript_lastName: data?.last_name,
//           transcript_emailAddress: data?.email,
//           transcript_phoneNumber: data?.phone_number,
//           transcript_phoneNumber_country: data?.phone_number_country_code,
//         })) || [
//           {
//             transcript_firstName: "",
//             transcript_lastName: "",
//             transcript_emailAddress: "",
//             transcript_phoneNumber: "",
//             transcript_phoneNumber_country: "",
//             // transcript_uploadRecommendationLatter: "",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     heading: "Goal Statement",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [
//       { goal_uploadGoal: "Goal image" },
//       { goal_goalStatement: applicationData?.goal_statement },
//     ],
//   },
//   {
//     id: 6,
//     heading: "Resume/CV",
//     setEdit: (activeStep) => setActiveStep(activeStep.setEdit),
//     data: [{ resume_uploadResume: "Resume image" }],
//   },
// ];

export default function ApplicationDetail({ data, showEditButton }) {
  return (
    <>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
        <Grid container spacing={2}>
          <ReviewWidgetApplicationAdmin
            data={data}
            showEditButton={showEditButton}
            // handleEdit={() => {
            //   handleSetValue(data.id, data?.data || {});
            //   data.setEdit({ ...data, setEdit: data.id });
            // }}
          />
          {/* {reviewData?.map((data) => {
            return !data?.hide ? (
              <Grid item xs={6}>
                test
                <ReviewWidget
                  data={data}
                  handleEdit={() => {
                    handleSetValue(data.id, data?.data || {});
                    data.setEdit({ ...data, setEdit: data.id });
                  }}
                />
              </Grid>
            ) : null;
          })} */}
        </Grid>
      </Paper>
    </>
  );
}
