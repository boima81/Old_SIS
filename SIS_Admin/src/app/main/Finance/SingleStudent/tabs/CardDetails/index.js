import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import MainDate from "src/app/main/dashboards/Shared/Date";
import MainSelect from "src/app/main/dashboards/Shared/Select";
import MainTextField from "src/app/main/dashboards/Shared/TextField";

import { selectStudents } from "../../../store/studentsSlice";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

export default function CardDetails({
  fieldData,
  control,
  isFileUpload = false,
  hideStudentField = false,
}) {
  const students = useSelector(selectStudents);
  const [data, setData] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    setData(students);
  }, [students]);

  console.log({ students });
  return (
    <>
      {!hideStudentField && (
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
              options={data?.map((us) => ({
                label: us?.userInformationId?.displayName,
                value: us?.id,
              }))}
              errorMessage={fieldData?.errorMessage?.selectStudent}
            />
          )}
        />
      )}
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
      {isFileUpload && (
        <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box
                component="label"
                htmlFor="button-file"
                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              >
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={async (e) => {
                    // function readFileAsync() {
                    //   return new Promise((resolve, reject) => {
                    //     const file = e.target.files[0];
                    //     if (!file) {
                    //       return;
                    //     }
                    //     const reader = new FileReader();

                    //     reader.onload = () => {
                    //       resolve({
                    //         id: FuseUtils.generateGUID(),
                    //         url: `data:${file.type};base64,${btoa(
                    //           reader.result
                    //         )}`,
                    //         type: "image",
                    //       });
                    //     };

                    //     reader.onerror = reject;

                    //     reader.readAsBinaryString(file);
                    //   });
                    // }

                    // const newImage = await readFileAsync();
                    setAttachedFile(URL.createObjectURL(e.target.files[0]));
                    onChange(e.target.files[0]);
                  }}
                />
                <FuseSvgIcon size={32} color="action">
                  heroicons-outline:upload
                </FuseSvgIcon>
              </Box>
            )}
          />
          <img src={attachedFile} className="!h-[200px]" />
        </div>
      )}
    </>
  );
}
