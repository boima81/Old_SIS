import { Controller } from "react-hook-form";
import FileUpload from "../../Shared/FileUpload";

export default function Step6({ fieldData, control, values }) {
  return (
    <div className="space-y-32">
      <p>
        <strong>Note:</strong>
        This section is not required for undergraduate programs
      </p>
      <div className="flex gap-20 items-center">
        <div className="whitespace-nowrap">Upload your resume/CV</div>
        <Controller
          control={control}
          name={fieldData?.fieldName?.resume_uploadResume}
          render={({ field }) => (
            <FileUpload
              values={values}
              data={field}
              errorMessage={fieldData?.errorMessage?.resume_uploadResume}
              maxFile={1}
              handleFileSubmit={() => {
                fieldData?.setError({
                  ...fieldData,
                  errorMessage: {},
                });
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
