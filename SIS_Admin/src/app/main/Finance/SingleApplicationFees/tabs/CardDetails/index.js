import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import MainDate from "src/app/main/dashboards/Shared/Date";
import MainSelect from "src/app/main/dashboards/Shared/Select";
import MainTextField from "src/app/main/dashboards/Shared/TextField";

import { selectStudents } from "../../../store/studentsSlice";

export default function CardDetails({ fieldData, control }) {
  const students = useSelector(selectStudents);

  return (
    <>
      <Controller
        control={control}
        name={fieldData?.fieldName?.selectStudent}
        render={({ field }) => (
          <MainSelect
            disabled
            data={field}
            id={fieldData?.fieldName?.selectStudent}
            label="Student"
            className="md:w-1/2"
            options={students?.map((us) => ({
              label: us?.userInformationId?.displayName,
              value: us?.id,
            }))}
            errorMessage={fieldData?.errorMessage?.selectStudent}
          />
        )}
      />
      <Controller
        control={control}
        name={fieldData?.fieldName?.amountDue}
        render={({ field }) => (
          <MainTextField
            type="number"
            data={field}
            label="Amount Due"
            disabled
            // id={fieldData?.fieldName?.amountDue}
            errorName={!!fieldData.errorNames.amountDue}
            errorMessage={fieldData?.errorMessage?.amountDue}
          />
        )}
      />

      <Controller
        control={control}
        name={fieldData?.fieldName?.balanceDue}
        render={({ field }) => (
          <MainTextField
            card
            data={field}
            type="number"
            label="Balance Due"
            disabled
            // id={fieldData?.fieldName?.amountDue}
            errorName={!!fieldData.errorNames.balanceDue}
            errorMessage={fieldData?.errorMessage?.balanceDue}
          />
        )}
      />
      <Controller
        control={control}
        name={fieldData?.fieldName?.ReceiptNumber}
        render={({ field }) => (
          <MainTextField
            data={field}
            label="Receipt Number"
            placeholder="Receipt Number"
            className="mt-6"
            id="fieldData?.fieldName?.ReceiptNumber"
            errorName={!!fieldData.errorNames.ReceiptNumber}
            errorMessage={fieldData?.errorMessage?.ReceiptNumber}
          />
        )}
      />
      <Controller
        control={control}
        name={fieldData?.fieldName?.amountPayingToday}
        render={({ field }) => (
          <MainTextField
            card
            data={field}
            type="number"
            label="Pay Amount"
            minDate={new Date()}
            // id={fieldData?.fieldName?.amountDue}
            errorName={!!fieldData.errorNames.amountPayingToday}
            errorMessage={fieldData?.errorMessage?.amountPayingToday}
          />
        )}
      />
    </>
  );
}
