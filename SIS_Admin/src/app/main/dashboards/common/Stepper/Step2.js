import { selectProgram } from "app/store/studentSlice";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MainSelect from "../../Shared/Select";
// import { selectProgram } from "../../analytics/store/studentSlice";
import { getSemester, selectSemester } from "../../analytics/store/semester";

export default function Step2({ fieldData, control, values }) {
  const dispatch = useDispatch();
  const programs = useSelector(selectProgram);

  const semesters = useSelector(selectSemester);

  useEffect(() => {
    dispatch(getSemester());
  }, [dispatch]);

  return (
    <div className="space-y-32">
      <Controller
        control={control}
        name={fieldData?.fieldName?.programs}
        render={({ field }) => (
          <MainSelect
            data={field}
            id={fieldData?.fieldName?.programs}
            label="Program"
            options={programs?.map((program) => ({
              id: program?.id,
              value: program?.id,
              label: program?.name,
              semester: program?.semester,
            }))}
            // options={programOptions}
            errorMessage={fieldData?.errorMessage?.programs}
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
            options={semesters?.map((semester) => ({
              id: semester?.id,
              value: semester?.id,
              label: semester?.name,
            }))}
            // options={semesterOptions}
            errorMessage={fieldData?.errorMessage?.semester}
          />
        )}
      />
      {/* <div>
        <Typography className="text-16 sm:text-20 truncate font-semibold">
          {"Select courses for semester 1"}
        </Typography>
        <div className="flex gap-32">
          <div>
            <Controller
              control={control}
              name={fieldData?.fieldName?.cyberSecurityAnalyst}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.cyberSecurityAnalyst}
                    data={field}
                    errorMessage={fieldData?.errorMessage?.cyberSecurityAnalyst}
                    label={"Cybersecurity Analyst"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.cyberSecurityAuditor}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.cyberSecurityAuditor}
                    data={field}
                    errorMessage={fieldData?.errorMessage?.cyberSecurityAuditor}
                    label={"Cybersecurity Auditor"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.cyberSecurityEngineer}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.cyberSecurityEngineer}
                    data={field}
                    errorMessage={
                      fieldData?.errorMessage?.cyberSecurityEngineer
                    }
                    label={"Cybersecurity Engineer"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name={fieldData?.fieldName?.computerForensicsInvestigator}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.computerForensicsInvestigator}
                    data={field}
                    errorMessage={
                      fieldData?.errorMessage?.computerForensicsInvestigator
                    }
                    label={"Computer Forensics Investigator"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.computerForensicsTechnician}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.computerForensicsTechnician}
                    data={field}
                    errorMessage={
                      fieldData?.errorMessage?.computerForensicsTechnician
                    }
                    label={"Computer Forensics Technician"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.informationSecurityAnalyst}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.informationSecurityAnalyst}
                    data={field}
                    errorMessage={
                      fieldData?.errorMessage?.informationSecurityAnalyst
                    }
                    label={"Information Security Analyst"}
                    defaultChecked={field.value}
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
      <TableWidget
        columns={fieldData.tableData.columns}
        rows={fieldData.tableData.rows}
        heading={"Heading"}
        subHeading={"Sub Heading"}
      /> */}
    </div>
  );
}
