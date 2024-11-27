import { Controller } from "react-hook-form";
import MainDate from "../Date";
import MainTextField from "../TextField";

const universities = ["Makut", "KNU", "BPUT", "CU", "BU"];

export default function CardDetails({ fieldData, control }) {
  return (
    <>
      <Controller
        control={control}
        name={fieldData?.fieldName?.fullName}
        render={({ field }) => (
          <MainTextField
            data={field}
            label="Full Name"
            placeholder="Full Name"
            className="mt-6"
            id="fieldData?.fieldName?.fullName"
            errorName={!!fieldData.errorNames.fullName}
            errorMessage={fieldData?.errorMessage?.fullName}
          />
        )}
      />

      <Controller
        control={control}
        name={fieldData?.fieldName?.cardNumber}
        render={({ field }) => (
          <MainTextField
            data={field}
            label="Card Number"
            placeholder="Card Number"
            type="number"
            id={fieldData?.fieldName?.cardNumber}
            errorName={!!fieldData.errorNames.cardNumber}
            errorMessage={fieldData?.errorMessage?.cardNumber}
          />
        )}
      />
      <div className="flex gap-32">
        <Controller
          control={control}
          name={fieldData?.fieldName?.expireDate}
          render={({ field }) => (
            <MainDate
              card
              data={field}
              label="Expire Date"
              minDate={new Date()}
              // id={fieldData?.fieldName?.expireDate}
              errorName={!!fieldData.errorNames.expireDate}
              errorMessage={fieldData?.errorMessage?.expireDate}
            />
          )}
        />

        <Controller
          name={fieldData?.fieldName?.cvv}
          control={control}
          render={({ field }) => (
            <MainTextField
              data={field}
              label="CVV"
              placeholder="CVV"
              type="number"
              id={fieldData?.fieldName?.cvv}
              errorName={!!fieldData.errorNames.cvv}
              errorMessage={fieldData?.errorMessage?.cvv}
            />
          )}
        />
      </div>
    </>
  );
}
