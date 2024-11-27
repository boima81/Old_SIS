import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withReducer from "app/store/withReducer";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cardDateInputFormate,
  dateIosFormate,
} from "src/app/main/dashboards/Shared/utils";
import reducer from "../../store";
import {
  getApplication,
  selectApplication,
} from "../../store/applicationSlice";

import Details from "./Details";
import Header from "./Header";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function ApplicationDetails() {
  const { id } = useParams();
  const applications = useSelector(selectApplication);
  const dispatch = useDispatch();
  const [appData, setAppData] = useState({});
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  function getData() {
    dispatch(getApplication(id)).then(async (action) => {
      /**
       * If the requested product is not exist show message
       */
      if (Object.keys(await action.payload).length > 0) {
        setAppData(action.payload);
      }
    });
  }
  useEffect(() => {
    getData();
  }, []);
  // const data = [
  //   {
  //     id: 0,
  //     heading: "User details",
  //     data: [
  //       {
  //         firstName: appData?.userInformationId?.first_name || "",
  //       },
  //       {
  //         middleName: appData?.userInformationId?.middle_name || "",
  //       },
  //       {
  //         lastName: appData?.userInformationId?.last_name || "",
  //       },
  //       { emailAddress: appData?.userInformationId?.email || "" },
  //       {
  //         phoneNumber: appData?.userInformationId?.phone_number || "",
  //       },
  //       {
  //         phoneNumber_country:
  //           appData?.userInformationId?.phone_number_country_code || "",
  //       },
  //       {
  //         gender: appData?.userInformationId?.gender || "",
  //       },
  //       {
  //         countryOfResidence: appData?.userInformationId?.country || "",
  //       }, // convert to iso to name of country
  //       {
  //         cityOfResidence: appData?.userInformationId?.city || "",
  //       },
  //       {
  //         nationality: appData?.userInformationId?.nationality || "",
  //       },
  //       {
  //         dateOfBirth: appData?.userInformationId?.email || "",
  //       },
  //     ],
  //   },
  // ];
  console.log({ appData });
  console.log("appData?.nationalityFile--->>>", appData?.nationalityFile);
  const data = [
    {
      id: 0,
      heading: "Card Details",
      data: [
        {
          fullName: appData?.applicationFee?.full_name || "",
        },
        { cardNumber: appData?.applicationFee?.card_number || "" },
        {
          expireDate: appData?.applicationFee?.expire_date
            ? moment(appData?.applicationFee?.expire_date).format(
                cardDateInputFormate
              )
            : "",
        },
        {
          cvv: appData?.applicationFee?.cvv,
        },
      ],
    },
    {
      id: 2,
      heading: "Academic program",
      data: [
        { programs: appData?.programId?.name || "" },
        { semester: appData?.semesterId?.name || "" },
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
      data: [
        {
          profilePicture: appData?.photoURL,
        },
        {
          firstName: appData?.userInformationId?.first_name || "",
        },
        {
          middleName: appData?.userInformationId?.middle_name || "",
        },
        {
          lastName: appData?.userInformationId?.last_name || "",
        },
        { emailAddress: appData?.createdBy?.email || "" },
        {
          phoneNumber: appData?.userInformationId?.phone_number || "",
        },
        {
          phoneNumber_country:
            appData?.userInformationId?.phone_number_country_code || "",
        },
        {
          gender: appData?.userInformationId?.gender || "",
        },
        {
          countryOfResidence: appData?.userInformationId?.country || "",
        }, // convert to iso to name of country
        {
          cityOfResidence: appData?.userInformationId?.city || "",
        },
        {
          nationality: appData?.userInformationId?.nationality || "",
        },
        {
          nationalityId: appData?.nationalityFile?.map((data) => {
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
          dateOfBirth: appData?.userInformationId?.date_of_birth
            ? moment(appData?.userInformationId?.date_of_birth).format(
                dateIosFormate
              )
            : "",
        },
        {
          maritalStatus: appData?.userInformationId?.maritalStatus,
        },
        {
          physicalDisability: appData?.userInformationId?.physicalDisability,
          // ||
          // userType !== "admin"
          // ? user?.userInformationId?.physicalDisability
          // : "",
        },
        {
          kInUserFullName: appData?.userInformationId?.kInUserFullName,
        },
        {
          kInResidentialAddress:
            appData?.userInformationId?.kInResidentialAddress,
        },
        {
          kInRelationship: appData?.userInformationId?.kInRelationship,
        },
      ],
    },
    {
      id: 4,
      heading: "Transcript",
      data: [
        ...(appData?.transcriptFile?.map((transcriptFile) => ({
          transcript_uploadTranscript: transcriptFile?.fileId?.name
            ? {
                name: transcriptFile?.fileId?.name,
                url: transcriptFile?.fileId?.url,
              }
            : "",
        })) || []),

        // { transcript_uploadRecommendationLatter: "Recommendation image" },
        {
          transcript: appData?.recommendations?.map((transcriptData) => ({
            transcript_name: `${transcriptData?.first_name || ""} ${
              transcriptData?.last_name || ""
            }`,
            transcript_email_address: transcriptData?.email,
            transcript_phone_number: transcriptData?.phone_number,
          })) || [
            {
              transcript_name: "",
              transcript_email_address: "",
              transcript_phone_number: "",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      heading: "Goal Statement",
      data: [
        ...(appData?.goalFile?.map((goalFile) => ({
          goal_uploadGoal: goalFile?.fileId?.name
            ? {
                name: goalFile?.fileId?.name,
                url: goalFile?.fileId?.url,
              }
            : "",
        })) || []),
        { goal_goalStatement: appData?.goal_statement },
      ],
    },
    {
      id: 6,
      heading: "Resume/CV",
      data: [
        ...(appData?.resumeFile?.map((resumeFile) => ({
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
  console.log("appData---->>>", appData);
  return (
    <FusePageCarded
      header={<Header headerTitle="Application Detail" />}
      content={<Details data={data} showEditButton={false} />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("admission", reducer)(ApplicationDetails);
