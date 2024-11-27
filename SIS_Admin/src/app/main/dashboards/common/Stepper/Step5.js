import { Controller } from "react-hook-form";
import HtmlEditor from "../../Shared/HtmlEditor";
import FileUpload from "../../Shared/FileUpload";

export default function Step5({ fieldData, control, values }) {
  return (
    <div className="space-y-32">
      <div className="flex gap-20 items-center">
        <div className="whitespace-nowrap">Upload your goal statement</div>
        <Controller
          control={control}
          name={fieldData?.fieldName?.goal_uploadGoal}
          render={({ field }) => (
            <>
              <FileUpload
                values={values}
                data={field}
                errorMessage={fieldData?.errorMessage?.goal_uploadGoal}
                handleFileSubmit={(file) => {
                  console.log({ file })
                  // fieldData.setError({
                  //   ...fieldData,
                  //   errorMessage: {},
                  // });
                }}
              />
              {/* // <MainTextField */}
              {/* //   data={field} 
            //   placeholder="Transcript document"
            //   type="file"
            //   id={fieldData?.fieldName?.goal_uploadGoal}
            //   errorName={!!fieldData?.errorNames?.goal_uploadGoal}
            //   errorMessage={fieldData?.errorMessage?.goal_uploadGoal} */}
              {/* // /> */}
            </>
          )}
        />
      </div>
      <Controller
        control={control}
        name={fieldData?.fieldName?.goal_goalStatement}
        render={({ field }) => (
          <HtmlEditor
            data={field}
            placeholder="Goal statement"
            errorMessage={fieldData?.errorMessage?.goal_goalStatement}
          />
        )}
      />
    </div>
  );
}
