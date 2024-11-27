import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import withRouter from "@fuse/core/withRouter";
import { selectProgram } from "app/store/studentSlice";
import { useDeepCompareEffect } from "@fuse/hooks";
import MainTextField from "../../dashboards/Shared/TextField";
import {
  createUpdateCourseFees,
  getSingleCourseFee,
  selectCourseFee,
} from "../store/courseFeeSlice";

function CourseAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  const courseFee = useSelector(selectCourseFee);

  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      dispatch(getSingleCourseFee()).then((action) => {
        /**
         * If the requested product is not exist show message
         */
        if (!action.payload) {
          setNoProduct(true);
        }
      });
    }

    updateProductState();
  }, [dispatch]);

  const defaultValues = {
    name: "",
    amount: "",
    applicationAmount: "",
  };
  const schema = yup.object().shape({
    name: yup.string().required("Course name is required"),
    amount: yup.string().required("Course amount is required"),
    applicationAmount: yup
      .string()
      .required("Application Fee Amount is required"),
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
      name: "name",
      amount: "amount",
      applicationAmount: "applicationAmount",
    },
    errorName: {
      name: !!errors.name,
      amount: !!errors.amount,
      applicationAmount: !!errors.applicationAmount,
    },
    errorMessage: {
      name: errors?.name?.message || "",
      amount: errors?.amount?.message || "",
      applicationAmount: errors?.applicationAmount?.message || "",
    },
  };

  useEffect(() => {
    if (!courseFee) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...courseFee,
    });
  }, [courseFee, reset]);

  function onSubmit(data) {
    dispatch(createUpdateCourseFees({ ...data })).then((res) => {
      if (res) {
        // props.navigate(`/academics/programs`);
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

  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.name}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course Credit"
                  className="md:w-1/2"
                  placeholder="Course Credit"
                  id={fieldData?.fieldName?.name}
                  errorName={!!fieldData.errorName.name}
                  errorMessage={fieldData?.errorMessage?.name}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.amount}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course amount"
                  className="md:w-1/2"
                  type="number"
                  placeholder="Course amount"
                  id={fieldData?.fieldName?.amount}
                  errorName={!!fieldData.errorName.amount}
                  errorMessage={fieldData?.errorMessage?.amount}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.applicationAmount}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Application Fee amount"
                  className="md:w-1/2"
                  type="number"
                  placeholder="Application Fee amount"
                  id={fieldData?.fieldName?.applicationAmount}
                  errorName={!!fieldData.errorName.applicationAmount}
                  errorMessage={fieldData?.errorMessage?.applicationAmount}
                />
              )}
            />
          </div>

          <div className="flex gap-14">
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/finance/course")}
              type="button"
            >
              Back
            </Button> */}
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

export default withRouter(CourseAdd);
