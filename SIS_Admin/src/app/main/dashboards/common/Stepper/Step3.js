/* eslint-disable no-nested-ternary */
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Box, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { lighten } from "@mui/system";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { selectUser } from "app/store/userSlice";

import { useSelector } from "react-redux";
import MainDate from "../../Shared/Date";
import MainPhoneInput from "../../Shared/PhoneInput";
import RadioButton from "../../Shared/Radio";
import MainSelect from "../../Shared/Select";
import MainTextField from "../../Shared/TextField";
import { getAllCountry, maritalStatusOptions } from "../../Shared/utils";
import FileUpload from "../../Shared/FileUpload";

export default function Step3({
  fieldData,
  control,
  setValue,
  values,
  userType,
  nationalityId,
}) {
  const [country, setCountry] = useState();
  const user = useSelector(selectUser);

  function getData() {
    setCountry(getAllCountry());
  }
  useEffect(() => {
    getData();
  }, []);
  const images = values?.images;
  const url = images
    ? URL.createObjectURL(images)
    : userType !== "admin"
    ? user?.avatarFile?.url
    : "" || "";
  console.log({ errorMessage: fieldData?.errorMessage });
  return (
    <div className="space-y-32">
      <div className="flex gap-32">
        <div className="flex flex-col flex-1 gap-32">
          <Controller
            control={control}
            name={fieldData?.fieldName?.apply_scholarship}
            render={({ field }) => (
              <RadioButton
                data={field}
                radioGroupName="Are you interested in applying for scholarship?"
                radioList={fieldData?.radioListScholarship}
                errorMessage={fieldData?.errorMessage?.apply_scholarship}
              />
            )}
          />
          <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
           

            {url && (
              <Controller
                name="featuredImageId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <>
                    <div
                      // onClick={() => onChange(media.id)}
                      // onKeyDown={() => onChange(media.id)}
                      role="button"
                      className={clsx(
                        "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg"
                      )}
                    >
                      <img
                        className="max-w-none w-auto h-full"
                        src={url}
                        alt="product"
                      />
                    </div>
                  </>
                )}
              />
            )}
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
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

                      onChange(e.target.files[0]);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                </Box>
              )}
            />
          </div>
          <Controller
            control={control}
            name={fieldData?.fieldName?.firstName}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="First Name"
                placeholder="First Name"
                id={fieldData?.fieldName?.firstName}
                errorName={!!fieldData.errorNames.firstName}
                errorMessage={fieldData?.errorMessage?.firstName}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.middleName}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Middle Name"
                placeholder="Middle Name"
                id={fieldData?.fieldName?.middleName}
                errorName={!!fieldData.errorNames.middleName}
                errorMessage={fieldData?.errorMessage?.middleName}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.lastName}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Last Name"
                placeholder="Last Name"
                id={fieldData?.fieldName?.lastName}
                errorName={!!fieldData.errorNames.lastName}
                errorMessage={fieldData?.errorMessage?.lastName}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.emailAddress}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Email"
                placeholder="Email"
                type="email"
                id={fieldData?.fieldName?.emailAddress}
                errorName={!!fieldData.errorNames.emailAddress}
                errorMessage={fieldData?.errorMessage?.emailAddress}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.gender}
            render={({ field }) => (
              <RadioButton
                data={field}
                radioGroupName="Gender"
                radioList={fieldData?.radioList}
                errorMessage={fieldData?.errorMessage?.gender}
              />
            )}
          />
        </div>
        <div className="flex flex-col flex-1 gap-32">
          <Controller
            control={control}
            name={fieldData?.fieldName?.phoneNumber}
            render={({ field }) => (
              <MainPhoneInput
                data={field}
                placeholder="Phone number"
                errorName={!!fieldData.errorNames.phoneNumber}
                errorMessage={fieldData?.errorMessage?.phoneNumber}
                required
                setValue={setValue}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.countryOfResidence}
            render={({ field }) => (
              <MainSelect
                data={field}
                label="Country of residence"
                placeholder="Country of residence"
                options={country}
                id={fieldData?.fieldName?.countryOfResidence}
                errorMessage={fieldData?.errorMessage?.countryOfResidence}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.cityOfResidence}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="City of residence"
                placeholder="City of residence"
                id={fieldData?.fieldName?.cityOfResidence}
                errorName={!!fieldData.errorNames.cityOfResidence}
                errorMessage={fieldData?.errorMessage?.cityOfResidence}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.nationality}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Nationality"
                placeholder="Nationality"
                id={fieldData?.fieldName?.nationality}
                errorName={!!fieldData.errorNames.nationality}
                errorMessage={fieldData?.errorMessage?.nationality}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.dateOfBirth}
            render={({ field }) => (
              <MainDate
                data={field}
                label="Date of birth"
                maxDate={new Date()}
                id={fieldData?.fieldName?.dateOfBirth}
                errorName={!!fieldData.errorNames.dateOfBirth}
                errorMessage={fieldData?.errorMessage?.dateOfBirth}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.maritalStatus}
            render={({ field }) => (
              <MainSelect
                data={field}
                label="Marital Status"
                placeholder="Marital Status"
                options={maritalStatusOptions}
                id={fieldData?.fieldName?.maritalStatus}
                errorMessage={fieldData?.errorMessage?.maritalStatus}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.physicalDisability}
            render={({ field }) => (
              <RadioButton
                data={field}
                radioGroupName="Have you any physical disability?"
                radioList={fieldData?.radioListPhysicalDisability}
                errorMessage={fieldData?.errorMessage?.physicalDisability}
              />
            )}
          />
        </div>
      </div>
      <div>
        <h2 className="text-center">NEXT – OF – KIN</h2>
      </div>
      <div className="flex gap-32">
        <div className="flex flex-col flex-1 gap-32">
          <Controller
            control={control}
            name={fieldData?.fieldName?.kInUserFullName}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Name"
                placeholder="Name"
                id={fieldData?.fieldName?.kInUserFullName}
                errorName={!!fieldData.errorNames.kInUserFullName}
                errorMessage={fieldData?.errorMessage?.kInUserFullName}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData?.fieldName?.kInResidentialAddress}
            render={({ field }) => (
              <MainTextField
                data={field}
                multiline
                label="Residential Address"
                placeholder="Residential Address"
                id={fieldData?.fieldName?.kInResidentialAddress}
                errorName={!!fieldData.errorNames.kInResidentialAddress}
                errorMessage={fieldData?.errorMessage?.kInResidentialAddress}
              />
            )}
          />
        </div>
        <div className="flex flex-col flex-1 gap-32">
          <Controller
            control={control}
            name={fieldData?.fieldName?.kInRelationship}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Relationship"
                placeholder="Relationship"
                id={fieldData?.fieldName?.kInRelationship}
                errorName={!!fieldData.errorNames.kInRelationship}
                errorMessage={fieldData?.errorMessage?.kInRelationship}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-32 items-center">
        <div className="flex flex-col flex-1 gap-32">
          <div className="whitespace-nowrap">Upload your Nationality ID</div>
          <Controller
            control={control}
            name={fieldData?.fieldName?.nationality_upload}
            render={({ field }) => (
              <>
                <FileUpload
                  values={nationalityId}
                  data={field}
                  errorMessage={fieldData?.errorMessage?.nationality_upload}
                  handleFileSubmit={(file) => {
                    // fieldData?.setError({
                    //   // ...fieldData,
                    //   errorMessage: {},
                    // });
                  }}
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
