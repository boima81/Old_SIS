/* eslint-disable no-nested-ternary */
import { Button, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSetting,
  selectBankInformationSetting,
} from "src/app/main/settings/store/bankInformationSettingSlice";
import { useEffect, useState } from "react";
import MainSelect from "../../Shared/Select";
import FlutterWave from "../../Shared/FlutterWave";
import MainTextField from "../../Shared/FileUploadInput";

export default function Step2({
  fieldData,
  control,
  values,
  user,
  userType,
  registrationId,
  handleFileUpload,
}) {
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState();

  const bankInformation = useSelector(selectBankInformationSetting);
  useEffect(() => {
    dispatch(getSetting());
  }, []);
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
  // const handleUpload = () => {
  //   if (fileUpload) {
  //     handleFileUpload([fileUpload]);
  //   }
  // };
  return (
    <>
      {values?.payNow && (
        <h3 className="mb-5" style={{ color: "red" }}>
          Payable Amount: ${values.payNow}
        </h3>
      )}
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
      <div className="space-y-32 ">
        {values?.paymentType ? (
          values?.paymentType === "card" ? (
            <FlutterWave
              fieldData={fieldData}
              control={control}
              fees={values?.payNow || values?.payNow}
              user={user}
              paymentFrom="registration"
              registrationId={registrationId}
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
                    Please bring the deposit receipt to the school registration
                    office after making the bank payment.
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
    </>
  );
}
