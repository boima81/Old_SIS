import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import _ from "@lodash";

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import MainTextField from "../../dashboards/Shared/TextField";
import RadioButton from "../../dashboards/Shared/Radio";

function GradAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  // const program = useSelector(selectProgram);
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const { programId } = routeParams;
  // useDeepCompareEffect(() => {
  //   function updateProductState() {
  //     if (programId === "add") {
  //       /**
  //        * Create New Product data
  //        */
  //       // dispatch(newUser());
  //     } else {
  //       /**
  //        * Get Product data
  //        */
  //       dispatch(getProgram(programId)).then((action) => {
  //         /**
  //          * If the requested product is not exist show message
  //          */
  //         if (!action.payload) {
  //           setNoProduct(true);
  //         }
  //       });
  //     }
  //   }

  //   updateProductState();
  // }, [dispatch, programId]);

  const defaultValues = {
    feesName: "",
    feesAmount: "",
  };
  const schema = yup.object().shape({
    feesName: yup.string().required("Grad name is required"),
    feesAmount: yup.string().required("Grad amount is required"),
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
      feesName: "feesName",
      feesAmount: "feesAmount",
    },
    errorName: {
      feesName: !!errors.feesName,
      feesAmount: !!errors.feesAmount,
    },
    errorMessage: {
      feesName: errors?.feesName?.message || "",
      feesAmount: errors?.feesAmount?.message || "",
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
    console.log({ data });
    //   const newData = data;
    //   if (program?.id) {
    //     newData.id = program?.id;
    //   }
    //   dispatch(
    //     createProgram({ ...newData, active: data?.active === "Active" })
    //   ).then((res) => {
    //     if (res) {
    //       props.navigate(`/academics/programs`);
    //     }
    //   });
    // }

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
  }
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
              name={fieldData.fieldName.feesName}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Grad name"
                  className="md:w-1/2"
                  placeholder="Grad name"
                  id={fieldData?.fieldName?.feesName}
                  errorName={!!fieldData.errorName.feesName}
                  errorMessage={fieldData?.errorMessage?.feesName}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.feesAmount}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Grad amount"
                  className="md:w-1/2"
                  type="number"
                  placeholder="Grad amount"
                  id={fieldData?.fieldName?.feesAmount}
                  errorName={!!fieldData.errorName.feesAmount}
                  errorMessage={fieldData?.errorMessage?.feesAmount}
                />
              )}
            />
          </div>
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
              onClick={() => navigate("/grad")}
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

export default withRouter(GradAdd);
