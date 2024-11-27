import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";

import withRouter from "@fuse/core/withRouter";
import MainTextField from "../../dashboards/Shared/TextField";
import HtmlEditor from "../../dashboards/Shared/HtmlEditor";
import { getEmail, saveEmail, selectEmail } from "../store/emailSlice";

function EmailAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  // const program = useSelector(selectProgram);
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const emailData = useSelector(selectEmail);

  const { emailId } = routeParams;
  useDeepCompareEffect(() => {
    function updateEmailState() {
      if (emailId === "add") {
        /**
         * Create New Product data
         */
        dispatch(getEmail());
      } else {
        /**
         * Get Product data
         */
        dispatch(getEmail(emailId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateEmailState();
  }, [dispatch, emailId]);

  const defaultValues = {
    title: "",
    subject: "",
    html: "",
    key: "",
    header: "",
  };
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    subject: yup.string().required("Subject is required"),
    html: yup.string().required("Body text is required"),
    key: yup.string().required("Key is required"),
    header: yup.string().required("Header is required"),
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
  useEffect(() => {
    if (!emailData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...emailData?.email,
    });
  }, [emailData, reset]);
  console.log("emailData.email.title--->>", emailData?.email?.title);
  const fieldData = {
    fieldName: {
      title: "title",
      subject: "subject",
      html: "html",
      key: "key",
      header: "header",
    },
    errorName: {
      title: !!errors.title,
      subject: !!errors.subject,
      html: !!errors.html,
      key: !!errors.key,
      header: !!errors.header,
    },
    errorMessage: {
      title: errors?.title?.message || "",
      subject: errors?.subject?.message || "",
      html: errors?.html?.message || "",
      key: errors?.key?.message || "",
      header: errors?.header?.message || "",
    },
  };

  // useEffect(() => {
  //   if (!program) {
  //     return;
  //   }
  //   /**
  //    * Reset the form on product state changes
  //    */
  //   reset({
  //     ...program,
  //     active: program?.active ? "Active" : "In Active",
  //   });
  // }, [program, reset]);

  function onSubmit(data) {
    dispatch(saveEmail({ ...data })).then((res) => {
      if (res?.payload?.id) {
        props.navigate(`/settings/email`);
      }
    });
  }

  // if (noProduct) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There is no such programs
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/avademic/programs"
  //         color="inherit"
  //       >
  //         Go to Programs Page
  //       </Button>
  //     </motion.div>
  //   );

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (program &&
  //     +routeParams?.programId !== program?.id &&
  //     routeParams.programId !== "new")
  // ) {
  //   return <FuseLoading />;
  // }

  const radioList = [
    {
      id: 1,
      value: "Active",
      label: "Active",
    },
    {
      id: 2,
      value: "In Active",
      label: "In Active",
    },
  ];

  const message = [
    {
      id: 1,
      text: "phone",
    },
    {
      id: 2,
      text: "email",
    },
    {
      id: 3,
      text: "company",
    },
    {
      id: 4,
      text: "address",
    },
    {
      id: 5,
      text: "name",
    },
    {
      id: 6,
      text: "last_name",
    },
    {
      id: 7,
      text: "first_name",
    },
    {
      id: 8,
      text: "student_name",
    },
    {
      id: 9,
      text: "student_id",
    },
    {
      id: 10,
      text: "program",
    },
    {
      id: 11,
      text: "semester",
    },
  ];

  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.title}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Title"
                  className="md:w-1/2"
                  placeholder="Title"
                  id={fieldData?.fieldName?.title}
                  errorName={!!fieldData.errorName.title}
                  errorMessage={fieldData?.errorMessage?.title}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.subject}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Subject"
                  className="md:w-1/2"
                  placeholder="Subject"
                  id={fieldData?.fieldName?.subject}
                  errorName={!!fieldData.errorName.subject}
                  errorMessage={fieldData?.errorMessage?.subject}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-10 flex-wrap">
              {message.map((data) => {
                return (
                  <div className="border border-gray-900 p-5">
                    {`<%${data.text}%>`}
                  </div>
                );
              })}
            </div>
            <Controller
              control={control}
              name={fieldData?.fieldName?.html}
              render={({ field }) => (
                <HtmlEditor
                  data={field}
                  placeholder="Email body text"
                  errorMessage={fieldData?.errorMessage?.html}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.key}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Key"
                  className="md:w-1/2"
                  placeholder="Key"
                  id={fieldData?.fieldName?.key}
                  errorName={!!fieldData.errorName.key}
                  errorMessage={fieldData?.errorMessage?.key}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.header}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Header"
                  className="md:w-1/2"
                  placeholder="Header"
                  id={fieldData?.fieldName?.header}
                  errorName={!!fieldData.errorName.header}
                  errorMessage={fieldData?.errorMessage?.header}
                />
              )}
            />
          </div>
          {/* <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.amount}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Fees amount"
                  className="md:w-1/2"
                  type="number"
                  placeholder="Fees amount"
                  id={fieldData?.fieldName?.amount}
                  errorName={!!fieldData.errorName.amount}
                  errorMessage={fieldData?.errorMessage?.amount}
                />
              )}
            />
          </div> */}
          {/* <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.active}
              render={({ field }) => (
                <RadioButton
                  className="md:w-1/2"
                  data={field}
                  radioGroupName="Active"
                  radioList={radioList}
                  errorMessage={fieldData?.errorMessage?.active}
                />
              )}
            />
          </div> */}

          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/settings/email")}
              type="button"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(EmailAdd);
