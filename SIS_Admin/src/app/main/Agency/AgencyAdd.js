/* eslint-disable no-nested-ternary */
import { useDeepCompareEffect } from "@fuse/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import withRouter from "@fuse/core/withRouter";
import MainTextField from "../dashboards/Shared/TextField";
import { createAgency, getAgency, selectAgency } from "./store/agencySlice";
import RadioButton from "../dashboards/Shared/Radio";

function AgencyAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  const program = useSelector(selectAgency);
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const { agencyId } = routeParams;
  console.log({ agencyId });
  const defaultValues = {
    name: "",
    isActive: "Active",
  };
  const schema = yup.object().shape({
    name: yup.string().required("Agency is required"),
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

  useDeepCompareEffect(() => {
    function updateProductState() {
      if (agencyId === "add") {
        /**
         * Create New Product data
         */
      } else {
        /**
         * Get Product data
         */
        dispatch(getAgency(agencyId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, agencyId]);
  const fieldData = {
    fieldName: {
      name: "name",
      isActive: "isActive",
    },
    errorName: {
      name: !!errors.name,
      isActive: !!errors.isActive,
    },
    errorMessage: {
      name: errors?.name?.message || "",
      isActive: errors?.name?.message || "",
    },
  };

  useEffect(() => {
    if (!program) {
      reset({});
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...program,
      isActive: program?.id
        ? !program?.isActive
          ? "In Active"
          : "Active"
        : "Active",
    });
  }, [program, reset]);

  function onSubmit(data) {
    const newData = data;
    if (program?.id) {
      newData.id = program?.id;
    }
    dispatch(
      createAgency({ ...newData, isActive: data?.isActive === "Active" })
    ).then((res) => {
      if (res) {
        props.navigate(`/agency`);
      }
    });
  }

  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such referral
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/academics/programs"
          color="inherit"
        >
          Go to Referral Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (program &&
  //     +routeParams?.agencyId !== program?.id &&
  //     routeParams.agencyId !== "add")
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
                  label="Referral"
                  className="md:w-1/2"
                  placeholder="Referral"
                  id={fieldData?.fieldName?.name}
                  errorName={!!fieldData.errorName.name}
                  errorMessage={fieldData?.errorMessage?.name}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.isActive}
              render={({ field }) => (
                <RadioButton
                  className="md:w-1/2"
                  data={field}
                  radioGroupName="Active"
                  radioList={radioList}
                  errorMessage={fieldData?.errorMessage?.isActive}
                />
              )}
            />
          </div>

          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/referral")}
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

export default withRouter(AgencyAdd);
