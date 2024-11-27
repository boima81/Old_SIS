import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import clsx from "clsx";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/system";
import withRouter from "@fuse/core/withRouter";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MainTextField from "../../dashboards/Shared/TextField";
import HtmlEditor from "../../dashboards/Shared/HtmlEditor";
import {
  getSetting,
  selectApplicationSetting,
  uploadFile,
  uploadFileApplication,
} from "../store/applicationSettingSlice";
import MainDate from "../../dashboards/Shared/Date";
import MainSelect from "../../dashboards/Shared/Select";
import {
  getSemesters,
  selectSemesterSetting,
} from "../store/applicationSettingSemesterSlice";
import MainCheckBox from "../../dashboards/Shared/Checkbox";

function AppSettingForm(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const applicationSetting = useSelector(selectApplicationSetting);
  const semesters = useSelector(selectSemesterSetting);

  const defaultValues = {
    application_name: "",
    application_color: "",
    president_message: "",
    course_prefix: "",
    registration: false,
    registrationSemester: "",
    registrationStartDate: null,
    registrationEndDate: null,
  };

  useEffect(() => {
    dispatch(getSetting());
    dispatch(getSemesters({}));
  }, []);
  const schema = yup.object().shape({
    application_name: yup.string().required("Application name is required"),
    application_color: yup.string().required("Application color is required"),
    president_message: yup.string().required("Pesident message is required"),
    course_prefix: yup
      .string()
      .min(2, "Only 2 characters allow")
      .max(2, "Only 2 characters allow")
      .required("Course prefix is required"),
    privacy_policy: yup.string().required("Privacy policy is required"),
    services: yup.string().required("Services is required"),
    login_page_content: yup.string().required("Login Page Content is required"),
    registration_page_content: yup
      .string()
      .required("Register Page Content is required"),
    forgot_password_page_content: yup
      .string()
      .required("Forgot Password Page Content is required"),
    reset_page_content: yup
      .string()
      .required("Reset Password Page Content is required"),
  });
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    getValues,
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  const fieldData = {
    fieldName: {
      application_name: "application_name",
      application_color: "application_color",
      president_message: "president_message",
      course_prefix: "course_prefix",
      privacy_policy: "privacy_policy",
      services: "services",
      registration: "registration",
      registrationSemester: "registrationSemester",
      registrationStartDate: "registrationStartDate",
      registrationEndDate: "registrationEndDate",
      login_page_content: "login_page_content",
      registration_page_content: "registration_page_content",
      forgot_password_page_content: "forgot_password_page_content",
      reset_page_content: "reset_page_content",
    },
    errorName: {
      application_name: !!errors.application_name,
      application_color: !!errors.application_color,
      president_message: !!errors.president_message,
      course_prefix: !!errors.course_prefix,
      privacy_policy: !!errors.privacy_policy,
      services: !!errors.services,
      login_page_content: !!errors.login_page_content,
      registration_page_content: !!errors.registration_page_content,
      forgot_password_page_content: !!errors.forgot_password_page_content,
      reset_page_content: !!errors.forgot_password_page_content,
      registration: !!errors.registration,
      registrationSemester: !!errors.registrationSemester,
      registrationStartDate: !!errors.registrationStartDate,
      registrationEndDate: !!errors.registrationEndDate,
    },
    errorMessage: {
      application_name: errors?.application_name?.message || "",
      application_color: errors?.application_color?.message || "",
      president_message: errors?.president_message?.message || "",
      course_prefix: errors?.course_prefix?.message || "",
      privacy_policy: errors.privacy_policy?.message || "",
      services: errors.services?.message || "",
      login_page_content: errors.login_page_content?.message || "",
      registration_page_content:
        errors.registration_page_content?.message || "",
      forgot_password_page_content:
        errors.forgot_password_page_content?.message || "",
      reset_page_content: errors.forgot_password_page_content?.message || "",
      registration: errors.registration?.message || "",
      registrationSemester: errors.registrationSemester?.message || "",
      registrationStartDate: errors.registrationStartDate?.message || "",
      registrationEndDate: errors.registrationEndDate?.message || "",
    },
  };
  const images = watch("images");
  const favicon = watch("favicon_img");
  
  const url = images
    ? URL.createObjectURL(images)
    : applicationSetting?.logo?.url;

  const faviconUrl = favicon
    ? URL.createObjectURL(favicon)
    : applicationSetting?.favicon?.url;
  // applicationSetting?.logo?.url;
  // const url = images && window.URL.createObjectURL(images);

  useEffect(() => {
    if (!applicationSetting) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...applicationSetting,
      registration: applicationSetting?.registrationStarted,
    });
  }, [applicationSetting, reset]);

  async function onSubmit(data) {
    setLoading(true);
    delete data?.logo;
    const faviconData = {
      ...data,
      key: "favicon",
      files: favicon ? [favicon] : null,
    };
    let faviconFileUpload = {};
    if (favicon) {
      faviconFileUpload = await dispatch(uploadFile(faviconData));
      console.log({ faviconFileUpload });
    }
    let startDate = null
    let endDate = null
    if (data.registrationStartDate) {
      const dateConvert = moment(data.registrationStartDate).format("YYYY-MM-DD")
      console.log({ dateConvert })
      startDate = new Date(dateConvert).toISOString()
    }
    if (data.registrationEndDate) {
      endDate = new Date(moment(data.registrationEndDate).format("YYYY-MM-DD")).toISOString()
    }
    console.log({ startDate ,endDate})
    const newData = {
      ...data,
      registrationStartDate: startDate,
      registrationEndDate: endDate,
      registrationStarted: data?.registration,
      key: "logo",
      files: images ? [images] : null,
    };
    if (faviconFileUpload?.payload) {
      newData.favicon = faviconFileUpload?.payload;
    } else {
      newData.favicon = null;
    }
    dispatch(uploadFileApplication(newData))?.then(() => {
      setLoading(false);
    });
  }

  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            <div className="flex flex-col flex-1 gap-32">
              <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
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
                              alt="logo"
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
                          onChange(e.target.files[0]);
                        }}
                      />
                      <FuseSvgIcon size={32} color="action">
                        heroicons-outline:upload
                      </FuseSvgIcon>
                    </Box>
                  )}
                />
              </div>
            </div>
            <Controller
              name={fieldData.fieldName.application_name}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Application name"
                  placeholder="Application name"
                  id={fieldData?.fieldName?.application_name}
                  errorName={!!fieldData.errorName.application_name}
                  errorMessage={fieldData?.errorMessage?.application_name}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.application_color}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Application color"
                  type="color"
                  placeholder="Application color"
                  id={fieldData?.fieldName?.application_color}
                  errorName={!!fieldData.errorName.application_color}
                  errorMessage={fieldData?.errorMessage?.application_color}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name={fieldData?.fieldName?.president_message}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                placeholder="President Message"
                errorMessage={fieldData?.errorMessage?.president_message}
              />
            )}
          />
          <Controller
            name={fieldData.fieldName.course_prefix}
            control={control}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Application prefix"
                placeholder="Application prefix"
                id={fieldData?.fieldName?.course_prefix}
                errorName={!!fieldData.errorName.course_prefix}
                errorMessage={fieldData?.errorMessage?.course_prefix}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.login_page_content}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                placeholder="Login Page Content"
                errorMessage={fieldData?.errorMessage?.login_page_content}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.registration_page_content}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                placeholder="Register Page Content"
                errorMessage={
                  fieldData?.errorMessage?.registration_page_content
                }
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.forgot_password_page_content}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                placeholder="Forgot Password Page Content"
                errorMessage={
                  fieldData?.errorMessage?.forgot_password_page_content
                }
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.reset_page_content}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                placeholder="Reset Password Page Content"
                errorMessage={fieldData?.errorMessage?.reset_page_content}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.privacy_policy}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                className="editor-custom-height"
                placeholder="Privacy Policy"
                errorMessage={fieldData?.errorMessage?.privacy_policy}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.services}
            render={({ field }) => (
              <HtmlEditor
                data={field}
                className="editor-custom-height"
                placeholder="Services"
                errorMessage={fieldData?.errorMessage?.services}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.registration}
            render={({ field }) => (
              <>
                <MainCheckBox
                  id={fieldData?.fieldName?.registration}
                  data={field}
                  handleChange={(e) => {
                    setValue("registration", e.target.checked);
                  }}
                  errorMessage={fieldData?.errorMessage?.registration}
                  label="Registration Started"
                  checked={field.value}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name={fieldData?.fieldName?.registrationSemester}
            render={({ field }) => (
              <MainSelect
                data={field}
                id={fieldData?.fieldName?.registrationSemester}
                label="Semester"
                // className="md:w-1/2"
                options={semesters?.map((semester) => ({
                  id: semester?.id,
                  value: semester?.id,
                  label: semester?.name,
                }))}
                errorMessage={fieldData?.errorMessage?.registrationSemester}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData.fieldName.registrationStartDate}
            render={({ field }) => (
              <MainDate
                data={field}
                label="Registration Start Date"
                minDate={new Date()}
                id={fieldData?.fieldName?.registrationStartDate}
                errorName={!!fieldData.errorName.registrationStartDate}
                errorMessage={fieldData?.errorMessage?.registrationStartDate}
              />
            )}
          />

          <Controller
            control={control}
            name={fieldData.fieldName.registrationEndDate}
            render={({ field }) => (
              <MainDate
                data={field}
                label="Registration End Date"
                minDate={new Date()}
                id={fieldData?.fieldName?.registrationEndDate}
                errorName={!!fieldData.errorName.registrationEndDate}
                errorMessage={fieldData?.errorMessage?.registrationEndDate}
              />
            )}
          />

          <div className="flex flex-col flex-1 gap-32">
            <p>Favicon (512 X 512)</p>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
              {faviconUrl && (
                <>
                  <Controller
                    name="faviconImageId"
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
                            src={faviconUrl}
                            alt="Favicon"
                          />
                        </div>
                      </>
                    )}
                  />
                </>
              )}
              <Controller
                name="favicon_img"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? lighten(theme.palette.background.default, 0.4)
                          : lighten(theme.palette.background.default, 0.02),
                    }}
                    component="label"
                    htmlFor="button-file-favicon"
                    className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-file-favicon"
                      type="file"
                      onChange={async (e) => {
                        // setValue("favicon", e.target.files[0]);
                        field.onChange(e.target.files[0]);
                      }}
                    />
                    <FuseSvgIcon size={32} color="action">
                      heroicons-outline:upload
                    </FuseSvgIcon>
                  </Box>
                )}
              />
            </div>
          </div>
          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => props.navigate("/settings/application")}
              type="button"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(AppSettingForm);
