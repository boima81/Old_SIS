/* eslint-disable no-shadow */
import { Typography } from "@mui/material";
import { selectCourse } from "app/store/courseSlice";
import { selectSemester } from "app/store/semesterSlice";
import { selectProgram } from "app/store/studentSlice";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MainSelect from "../../Shared/Select";
// import { selectProgram } from "../../analytics/store/studentSlice";
// import { getSemester, selectSemester } from "../../analytics/store/semester";
import { apiToValues } from "../../Shared/utils";
import CourseTable from "../CourseList/CourseTable";

export default function Step0({
  users,
  fieldData,
  control,
  values,
  setValue,
  userType,
}) {
  const dispatch = useDispatch();

  const programs = useSelector(selectProgram);
  const semesters = useSelector(selectSemester);
  const course = useSelector(selectCourse);
  const courses = course?.courses;
  const [showRows, setShowRows] = useState([]);
  const tableData = {
    columns: ["Course ID", "Course", "Credit", "Fees per credit", "Total Fees"],
  };
  const courseAmount = course?.allFees?.courseFee?.amount;
  const checkBoxHandle = (coursesData, coursesValue) => {
    const newTableDta = apiToValues(
      coursesData,
      coursesValue,
      course?.allFees?.courseFee?.amount
    );
    setShowRows(newTableDta?.data || []);
  };
  useEffect(() => {
    checkBoxHandle(courses, values?.courses);
  }, [courses, values?.courses]);

  return (
    <div className="space-y-32">
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
      <Controller
        control={control}
        name={fieldData?.fieldName?.programs}
        render={({ field }) => (
          <MainSelect
            data={field}
            id={fieldData?.fieldName?.programs}
            label="Program"
            // options={programOptions}
            options={programs?.map((program) => ({
              id: program?.id,
              value: program?.id,
              label: program?.name,
              semester: program?.semester,
            }))}
            errorMessage={fieldData?.errorMessage?.programs}
            disabled={userType !== "admin"}
          />
        )}
      />
      <Controller
        control={control}
        name={fieldData?.fieldName?.semester}
        render={({ field }) => (
          <MainSelect
            data={field}
            id={fieldData?.fieldName?.semester}
            label="Semester"
            // options={semesterOptions}
            options={semesters?.map((semester) => ({
              id: semester?.id,
              value: semester?.id,
              label: semester?.name,
            }))}
            errorMessage={fieldData?.errorMessage?.semester}
            disabled={userType !== "admin"}
          />
        )}
      />
      <div>
        <Typography className="text-16 sm:text-20 truncate font-semibold">
          Select courses for semester
        </Typography>
        <div className="">
          {/* <div> */}
          {/* {courses?.length > 0 && (
            <Grid container spacing={2} className="mx-16 mt-10">
              {courses?.map((course) => (
                <Grid xs={6}>
                  <Controller
                    control={control}
                    name={`${course?.id}`}
                    render={({ field }) => (
                      <>
                        <MainCheckBox
                          data={field}
                          errorMessage={
                            fieldData?.errorMessage?.cyberSecurityAnalyst
                              ?.message
                          }
                          label={course?.name}
                          id={course?.id}
                          checked={values?.courses?.includes(course?.id)}
                          handleChange={(e) => {
                            const checkedValues = values?.courses || [];
                            if (e.target.checked) {
                              setValue("courses", [
                                ...checkedValues,
                                course?.id,
                              ]);
                            } else {
                              const newChecked = checkedValues?.filter(
                                (data) => course?.id !== data
                              );
                              setValue("courses", newChecked);
                            }
                          }}
                        />
                      </>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          )} */}

          <CourseTable
            data={courses}
            checked={values?.courses}
            setValue={(values) => setValue("courses", values || [])}
            courseAmount={courseAmount}
          />

          {/* <Controller
              control={control}
              name={fieldData?.fieldName?.cyberSecurityAuditor}
              render={({ field }) => (
                <MainCheckBox
                  data={field}
                  errorMessage={
                    fieldData?.errorMessage?.cyberSecurityAuditor?.message
                  }
                  label={"Cybersecurity Auditor"}
                  checked={field.value}
                />
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.cyberSecurityEngineer}
              render={({ field }) => (
                <MainCheckBox
                  data={field}
                  errorMessage={
                    fieldData?.errorMessage?.cyberSecurityEngineer?.message
                  }
                  label={"Cybersecurity Engineer"}
                  checked={field.value}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name={fieldData?.fieldName?.computerForensicsInvestigator}
              render={({ field }) => (
                <MainCheckBox
                  data={field}
                  errorMessage={
                    fieldData?.errorMessage?.computerForensicsInvestigator
                      ?.message
                  }
                  label="Computer Forensics Investigator"
                  checked={field.value}
                />
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.computerForensicsTechnician}
              render={({ field }) => (
                <MainCheckBox
                  data={field}
                  errorMessage={
                    fieldData?.errorMessage?.computerForensicsTechnician
                      ?.message
                  }
                  label="Computer Forensics Technician"
                  checked={field.value}
                />
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.informationSecurityAnalyst}
              render={({ field }) => (
                <MainCheckBox
                  data={field}
                  errorMessage={
                    fieldData?.errorMessage?.informationSecurityAnalyst?.message
                  }
                  label="Information Security Analyst"
                  checked={field.value}
                />
              )}
            /> */}
          {/* </div> */}
        </div>
      </div>
      {/* <TableWidget
          columns={tableData.columns}
          rows={showRows}
          heading="Heading"
          subHeading="Sub Heading"
        /> */}
    </div>
  );
}
