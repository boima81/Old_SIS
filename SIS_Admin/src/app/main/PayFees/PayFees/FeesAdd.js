/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import withRouter from "@fuse/core/withRouter";
import { selectUser } from "app/store/userSlice";
import MainTextField from "../../dashboards/Shared/TextField";
import MainFileField from "../../dashboards/Shared/FileUploadInput";

import MainSelect from "../../dashboards/Shared/Select";
import {
  getSetting,
  selectBankInformationSetting,
} from "../../settings/store/bankInformationSettingSlice";
import FlutterWave from "../../dashboards/Shared/FlutterWave";
import {
  getBalanceFee,
  selectBalanceFee,
  uploadFileBalanceFee,
} from "../../Finance/store/balanceFeeSlice";
import { currencySymbol, toasterSuccess } from "../../dashboards/Shared/utils";
import Success from "./Success";

function FeesAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  // const program = useSelector(selectProgram);
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const bankInformation = useSelector(selectBankInformationSetting);
  const balanceFee = useSelector(selectBalanceFee);
  console.log({ balanceFee });
  const defaultValues = {
    paymentType: "",
    amountPay: null,
  };
  const schema = yup.object().shape({
    paymentType: yup.string().required("Payment Type name is required"),
    amountPay: yup.number().required("Amount Pay is required"),
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
  const values = getValues();
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  useEffect(() => {
    dispatch(getSetting());
    dispatch(getBalanceFee());
  }, []);
  const fieldData = {
    fieldName: {
      paymentType: "paymentType",
      amountPay: "amountPay",
      offline_payment_receipt_file: "offline_payment_receipt_file",
    },
    errorName: {
      paymentType: !!errors.paymentType,
      offline_payment_receipt_file: !!errors.offline_payment_receipt_file,
      amountPay: !!errors?.amountPay,
    },
    errorMessage: {
      paymentType: errors?.paymentType?.message || "",
      offline_payment_receipt_file:
        errors?.offline_payment_receipt_file?.message || "",
      amountPay: errors?.amountPay?.message,
    },
  };
  const balance =
    user?.registration?.invoiceId?.remainingBalance
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
    console.log({ data, values });
    setLoading(true);
    dispatch(
      uploadFileBalanceFee({
        key: "offline_payment_receipt_file",
        files: [values.offline_payment_receipt],
        amount: data?.amountPay,
      })
    ).then((res) => {
      setLoading(false);
      console.log({ res });
      if (res?.payload?.payload?.id) {
        props.navigate("/pay-fees");
        setTimeout(() => {
          window.location.reload();
        }, [1000]);
      }
      // if (res?.payload?.id) {
      // }
    });
  }

  let options = [];
  if (bankInformation?.offlinePayment) {
    options = [
      ...options,
      {
        id: "offline",
        value: "offline",
        label: "Offline",
      },
    ];
  }
  if (bankInformation?.onlinePayment) {
    options = [
      ...options,
      {
        id: "card",
        value: "card",
        label: "Debit/Credit card",
      },
    ];
  }

  const handleFileChange = (event) => {
    if (event?.target?.files) {
      setFileUpload(event.target.files[0]);
      setValue("offline_payment_receipt", event.target.files[0]);
    }
  };

  return (
    <>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
        {balanceFee?.length > 0 ? (
          <Success />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-32">
              {/* {!values?.offline_payment && ( */}
              <h3 style={{ color: "red" }}>Balance: {currencySymbol}{balance || 0}</h3>
              {/* )} */}

              <Controller
                control={control}
                name={fieldData?.fieldName?.amountPay}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Amount Pay"
                    placeholder="Amount Pay"
                    id={fieldData?.fieldName?.amountPay}
                    errorName={!!fieldData.errorName.amountPay}
                    errorMessage={fieldData?.errorMessage?.amountPay}
                  />
                )}
              />
              <Controller
                control={control}
                name={fieldData?.fieldName?.paymentType}
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    id={fieldData?.fieldName?.paymentType}
                    label="Payment Method"
                    options={options}
                    errorMessage={fieldData?.errorMessage?.paymentType}
                  />
                )}
              />

              {values.paymentType ? (
                values?.paymentType === "card" ? (
                  <FlutterWave
                    fieldData={fieldData}
                    control={control}
                    fees={balanceFee?.length > 0 ? 0 : values?.amountPay}
                    user={user}
                    paymentFrom="registration-balance"
                    registrationId={user?.registration?.id}
                    applicationId={user?.applicationId?.id}
                    handleSuccess={() => {
                      toasterSuccess(
                        "Success",
                        "We will received payment and check after sometime your balance"
                      );
                      setTimeout(() => {
                        window.location.reload();
                      }, [1000]);
                    }}
                  />
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="space-y-8">
                        <h1 className="text-align-center">Bank Details</h1>

                        <div className="space-y-4 justify-content-center">
                          <div className="flex">
                            <Typography variant="p">
                              <strong>Bank Name:- </strong>
                            </Typography>{" "}
                            <Typography variant="p">
                              {" "}
                              {bankInformation?.bankName}
                            </Typography>
                          </div>
                        </div>
                        <div className="space-y-4 justify-content-center">
                          <div className="flex">
                            <Typography variant="p">
                              <strong>Account Name:- </strong>
                            </Typography>{" "}
                            <Typography variant="p">
                              {bankInformation?.accountName}
                            </Typography>
                          </div>
                        </div>
                        <div className="space-y-4 justify-content-center">
                          <div className="flex">
                            <Typography variant="p">
                              <strong>Account Number:- </strong>
                            </Typography>{" "}
                            <Typography variant="p">
                              {bankInformation?.accountNumber}
                            </Typography>
                          </div>
                        </div>
                        <div className="space-y-4 justify-content-center">
                          <div className="flex">
                            <Typography variant="p">
                              <strong>Swift Code:- </strong>
                            </Typography>{" "}
                            <Typography variant="p">
                              {bankInformation?.swiftCode}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="space-y-12">
                        <h5 className=" font-bold">
                          Please bring the deposit receipt to the school
                          registration office after making the bank payment.
                        </h5>
                        <MainFileField handleChange={handleFileChange} />
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={
                            balanceFee?.length > 0 || balance <= 0 || loading
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </>
                )
              ) : null}
            </div>
          </form>
        )}
      </Paper>
    </>
  );
}

export default withRouter(FeesAdd);
