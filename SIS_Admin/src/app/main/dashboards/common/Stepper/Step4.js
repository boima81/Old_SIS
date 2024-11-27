import { Grid, Button, Divider, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import MainTextField from "../../Shared/TextField";
import MainPhoneInput from "../../Shared/PhoneInput";
import FileUpload from "../../Shared/FileUpload";

export default function Step4({
  fieldData,
  control,
  fields,
  append,
  remove,
  setValue,
  values,
}) {
  const addFriend = () => {
    // setIndexes((prevIndexes) => [...prevIndexes, counter]);
    // setCounter((prevCounter) => prevCounter + 1);
    append();
  };
  const removeFriend = (index) => {
    remove(index);
  };

  return (
    <div className="space-y-32">
      <Divider>
        <Chip label="Transcript" />
      </Divider>
      <div className="flex gap-20 items-center">
        <div className="whitespace-nowrap">Transcript Document</div>
        <Controller
          control={control}
          name={fieldData?.fieldName?.transcript_uploadTranscript}
          render={({ field }) => (
            <FileUpload
              values={values}
              data={field}
              errorMessage={
                fieldData?.errorMessage?.transcript_uploadTranscript
              }
              handleFileSubmit={() => {
                // fieldData?.setError({
                //   ...fieldData,
                //   errorMessage: {},
                // });
              }}
              maxFile={10}
            />
          )}
        />
      </div>
      <Divider>
        <Chip label="Recommendations" />
      </Divider>
      {fields
        .filter((field, index) => index <= 2)
        .map((data, index) => {
          const fieldName = `transcript[${index}]`;
          return (
            <>
              <fieldset key={fieldName}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`transcript.${index}.transcript_firstName`}
                      render={({ field }) => (
                        <MainTextField
                          data={field}
                          label="First Name"
                          placeholder="First Name"
                          id={`transcript.${index}.transcript_firstName`}
                          value={data.transcript_firstName}
                          // haneleChange={(e) => {
                          //   // update(index,{transcript_firstName:e.target.value});
                          //   setValue(
                          //     `transcript.0.transcript_firstName`,
                          //     e.target.value
                          //   );
                          // }}
                          errorName={
                            !!fieldData?.errorNames?.transcript?.[index]
                              ?.transcript_firstName
                          }
                          errorMessage={
                            fieldData?.errorMessage?.transcript?.[index]
                              ?.transcript_firstName
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`transcript.${index}.transcript_lastName`}
                      render={({ field }) => (
                        <MainTextField
                          data={field}
                          label="Last Name"
                          placeholder="Last Name"
                          id={`transcript.${index}.transcript_lastName`}
                          errorName={
                            !!fieldData?.errorNames?.transcript?.[index]
                              ?.transcript_lastName
                          }
                          errorMessage={
                            fieldData?.errorMessage?.transcript?.[index]
                              ?.transcript_lastName
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`transcript.${index}.transcript_emailAddress`}
                      render={({ field }) => (
                        <MainTextField
                          data={field}
                          label="Email"
                          placeholder="Email"
                          type="email"
                          id={`transcript.${index}.transcript_emailAddress`}
                          errorName={
                            !!fieldData?.errorNames?.transcript?.[index]
                              ?.transcript_emailAddress
                          }
                          errorMessage={
                            fieldData?.errorMessage?.transcript?.[index]
                              ?.transcript_emailAddress
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`transcript.${index}.transcript_phoneNumber`}
                      render={({ field }) => (
                        <MainPhoneInput
                          data={field}
                          placeholder="Phone number"
                          marginBottom="6rem"
                          name={`transcript.${index}.transcript_phoneNumber`}
                          errorName={
                            !!fieldData?.errorNames?.transcript?.[index]
                              ?.transcript_phoneNumber
                          }
                          errorMessage={
                            fieldData?.errorMessage?.transcript?.[index]
                              ?.transcript_phoneNumber
                          }
                          required
                          setValue={setValue}
                        />
                      )}
                    />
                  </Grid>
                  {fields.length > 1 && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          removeFriend(index);
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </fieldset>
            </>
          );
        })}
      <div className="flex justify-end w-full">
        {fields.length <= 2 && (
          <Button variant="contained" color="success" onClick={addFriend}>
            + Add
          </Button>
        )}
      </div>
    </div>
  );
}
