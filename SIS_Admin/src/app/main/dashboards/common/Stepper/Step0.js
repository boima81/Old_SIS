/* eslint-disable no-nested-ternary */
import { Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSetting,
  selectBankInformationSetting,
} from "src/app/main/settings/store/bankInformationSettingSlice";
import MainTextField from "../../Shared/FileUploadInput";
import FlutterWave from "../../Shared/FlutterWave";
import MainSelect from "../../Shared/Select";
import { currencySymbol } from "../../Shared/utils";

export default function Step0({
  values,
  fieldData,
  control,
  userType,
  users,
  user,
  handleFileUpload,
}) {
  const dispatch = useDispatch();
  const bankInformation = useSelector(selectBankInformationSetting);
  useEffect(() => {
    dispatch(getSetting());
  }, []);
  const [fileUpload, setFileUpload] = useState();
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
  if (userType !== "admin" && bankInformation?.onlinePayment) {
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
      handleFileUpload([event.target.files[0]]);
    }
  };

  return (
    <div className="space-y-32">
      {/* {!values?.offline_payment && ( */}
      <h3 style={{ color: "red" }}>
        Application Fees: {currencySymbol}{user?.applicationFee?.applicationAmount}
      </h3>

      <b style={{ color: "red" }}>
        Please pay this fee before beginning the application process
      </b>
      {/* )} */}
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
      {userType === "admin" && (
        <Controller
          control={control}
          name={fieldData?.fieldName?.selectStudent}
          render={({ field }) => (
            <MainSelect
              data={field}
              id={fieldData?.fieldName?.selectStudent}
              label="Select Student"
              options={users?.map((us) => ({
                label: us?.userInformationId?.displayName,
                value: us?.id,
              }))}
              errorMessage={fieldData?.errorMessage?.selectStudent}
            />
          )}
        />
      )}
      {values?.paymentType ? (
        values?.paymentType === "card" ? (
          <FlutterWave
            fieldData={fieldData}
            control={control}
            fees={user?.applicationFee?.applicationAmount}
            user={user}
            paymentFrom="application"
            handleSuccess={() => {
              // toasterSuccess(
              //   "Success",
              //   "We will received payment and check after sometime your balance"
              // );
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
                  Please upload deposit receipt here after making bank deposit
                  or transfer
                </h5>
                <MainTextField handleChange={handleFileChange} />
                {/* <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  Submit
                </Button> */}
              </div>
            </div>
          </>
        )
      ) : null}
    </div>
  );
}
