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
import MainTextField from "../../dashboards/Shared/TextField";
import HtmlEditor from "../../dashboards/Shared/HtmlEditor";

import MainCheckBox from "../../dashboards/Shared/Checkbox";
import {
  getSetting,
  saveSetting,
  selectBankInformationSetting,
} from "../store/bankInformationSettingSlice";

function BankInfoSettingForm(props) {
  const [loading, SetLoading] = useState(false);
  const dispatch = useDispatch();
  const bankInformationSetting = useSelector(selectBankInformationSetting);
  const defaultValues = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    swiftCode: "",
    offlinePayment: false,
    onlinePayment: false,
  };

  useEffect(() => {
    dispatch(getSetting());
  }, []);
  const schema = yup.object().shape({
    bankName: yup.string().required("Bank name is required"),
    accountName: yup.string().required("Account name is required"),
    accountNumber: yup.string().required("Account number is required"),
    swiftCode: yup.string().required("Swift code is required"),
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
      bankName: "bankName",
      accountName: "accountName",
      accountNumber: "accountNumber",
      swiftCode: "swiftCode",
      offlinePayment: "offlinePayment",
      onlinePayment: "onlinePayment",

    },
    errorName: {
      bankName: !!errors.bankName,
      accountName: !!errors.accountName,
      accountNumber: !!errors.accountNumber,
      swiftCode: !!errors.swiftCode,
      offlinePayment: !!errors.offlinePayment,
      onlinePayment: !!errors.onlinePayment
    },
    errorMessage: {
      bankName: errors?.bankName?.message || "",
      accountName: errors?.accountName?.message || "",
      accountNumber: errors?.accountNumber?.message || "",
      swiftCode: errors?.swiftCode?.message || "",
      offlinePayment: errors?.offlinePayment?.message || "",
      onlinePayment: !!errors.onlinePayment?.message || "",
    },
  };

  useEffect(() => {
    if (!bankInformationSetting) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...bankInformationSetting,
    });
  }, [bankInformationSetting, reset]);

  function onSubmit(data) {
    console.log("data---->>>", data);
    SetLoading(true);

    dispatch(saveSetting(data))?.then(() => {
      SetLoading(false);
    });
  }
  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            {/* It's for online payment disabled */}
            <Controller
              control={control}
              name={fieldData?.fieldName?.offlinePayment}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.offlinePayment}
                    data={field}
                    handleChange={(e) => {
                      setValue("offlinePayment", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.offlinePayment}
                    label="Offline payment"
                    checked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.onlinePayment}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.onlinePayment}
                    data={field}
                    handleChange={(e) => {
                      setValue("onlinePayment", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.onlinePayment}
                    label="Online payment"
                    checked={field.value}
                  />
                </>
              )}
            />
            <Controller
              name={fieldData.fieldName.bankName}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Bank name"
                  placeholder="Bank name"
                  id={fieldData?.fieldName?.bankName}
                  errorName={!!fieldData.errorName.bankName}
                  errorMessage={fieldData?.errorMessage?.bankName}
                />
              )}
            />
            <Controller
              name={fieldData.fieldName.accountName}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Account name"
                  placeholder="Account name"
                  id={fieldData?.fieldName?.accountName}
                  errorName={!!fieldData.errorName.accountName}
                  errorMessage={fieldData?.errorMessage?.accountName}
                />
              )}
            />
            <Controller
              name={fieldData.fieldName.accountNumber}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Account number"
                  placeholder="Account number"
                  id={fieldData?.fieldName?.accountNumber}
                  errorName={!!fieldData.errorName.accountNumber}
                  errorMessage={fieldData?.errorMessage?.accountNumber}
                />
              )}
            />
            <Controller
              name={fieldData.fieldName.swiftCode}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Swift code"
                  placeholder="Swift code"
                  id={fieldData?.fieldName?.swiftCode}
                  errorName={!!fieldData.errorName.swiftCode}
                  errorMessage={fieldData?.errorMessage?.swiftCode}
                />
              )}
            />
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
              {loading ? "Loading ..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(BankInfoSettingForm);
