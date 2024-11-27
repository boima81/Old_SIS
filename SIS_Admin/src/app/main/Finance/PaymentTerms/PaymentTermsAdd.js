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
import {
  createUpdatePaymentTerms,
  getPaymentTerm,
  selectPaymentTerm,
} from "../store/paymentTermSlice";

function PaymentTermsAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  // const program = useSelector(selectProgram);
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const paymentTermData = useSelector(selectPaymentTerm);

  const { paymentTermsId } = routeParams;
  useDeepCompareEffect(() => {
    function updateFeeState() {
      if (paymentTermsId === "add") {
        /**
         * Create New Product data
         */
        // dispatch(newUser());
      } else {
        /**
         * Get Product data
         */
        dispatch(getPaymentTerm(paymentTermsId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateFeeState();
  }, [dispatch, paymentTermsId]);

  const defaultValues = {
    term: "",
    termName: "",
  };
  const schema = yup.object().shape({
    termName: yup.string().required("Payment term Name is required"),
    term: yup.number().required("Payment term Number is required"),
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
    if (!paymentTermData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...paymentTermData,
    });
  }, [paymentTermData, reset]);

  const fieldData = {
    fieldName: {
      termName: "termName",
      term: "term",
    },
    errorName: {
      termName: !!errors.termName,
      term: !!errors.term,
    },
    errorMessage: {
      term: errors?.term?.message || "",
      termName: errors?.termName?.message || "",
    },
  };

  function onSubmit(data) {
    dispatch(createUpdatePaymentTerms({ ...data })).then((res) => {
      if (res?.payload?.id) {
        props.navigate(`/finance/payment-terms`);
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
          There is no such Payment Terms
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/finance/payment-terms"
          color="inherit"
        >
          Go to Payment Terms
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (paymentTermData &&
      +routeParams?.paymentTermsId !== paymentTermData?.id &&
      routeParams.paymentTermsId !== "add")
  ) {
    return <FuseLoading />;
  }

  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.termName}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Payment term name"
                  className="md:w-1/2"
                  placeholder="Payment term name"
                  id={fieldData?.fieldName?.termName}
                  errorName={!!fieldData.errorName.termName}
                  errorMessage={fieldData?.errorMessage?.termName}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.term}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Payment Term Number"
                  className="md:w-1/2"
                  type="number"
                  placeholder="Payment term Number"
                  id={fieldData?.fieldName?.term}
                  errorName={!!fieldData.errorName.term}
                  errorMessage={fieldData?.errorMessage?.term}
                />
              )}
            />
          </div>

          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/finance/payment-terms")}
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

export default withRouter(PaymentTermsAdd);
