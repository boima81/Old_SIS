import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProgram, selectProgram } from "app/store/studentSlice";
import withRouter from "@fuse/core/withRouter";
import { motion } from "framer-motion";
import _ from "@lodash";

import FuseLoading from "@fuse/core/FuseLoading";
import { useDeepCompareEffect } from "@fuse/hooks";
import MainTextField from "../../dashboards/Shared/TextField";
import MainCheckBox from "../../dashboards/Shared/Checkbox";
import { getCourses, selectCourses } from "../store/coursesSlice";
import MainSelect from "../../dashboards/Shared/Select";
import {
  createSemester,
  getSemester,
  selectSemester,
} from "../store/semesterSlice";
import MainDate from "../../dashboards/Shared/Date";
import { dateDBFormate, dateFormate } from "../../dashboards/Shared/utils";
import moment from "moment";

function SemesterAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  const routeParams = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const semester = useSelector(selectSemester);

  const courses = useSelector(selectCourses);
  const programs = useSelector(selectProgram);

  const { semesterId } = routeParams;
  useDeepCompareEffect(() => {
    function updateProductState() {
      if (semesterId === "add") {
        /**
         * Create New Product data
         */
        dispatch(getSemester());
      } else {
        /**
         * Get Product data
         */
        dispatch(getSemester(semesterId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, semesterId]);

  useEffect(() => {
    dispatch(getCourses({}));
    dispatch(getProgram());
  }, [dispatch]);

  const defaultValues = {
    name: "",
    // programs: "",
    // courses: [],
  };
  const schema = yup.object().shape({
    name: yup.string().required("Semester is required"),
    startDate: yup
      .date()
      .typeError("The value must be a date (DD-MM-YYYY)")
      .required("You must enter a Start Date"),
    endDate: yup
      .date()
      .when(
        "startDate",
        (startDate, schemaEnd) => startDate && schemaEnd.min(startDate)
      )
      .typeError("The value must be a date (DD-MM-YYYY)")
      .required("You must enter a End Date"),
    // programs: yup.string().required("Program is required"),
    // semesterCreditPerHours: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .required("Credit hours required"),
    // courses: yup
    //   .array()
    //   .min(1, "Only 1 tags are allowed")
    //   .required("Provide at least one tag"),
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    getValues,
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  const values = getValues();
  console.log({ values });
  const fieldData = {
    fieldName: {
      name: "name",
      startDate: "startDate",
      endDate: "endDate",
    },
    errorName: {
      name: !!errors.name,
      startDate: !!errors.startDate,
      endDate: !!errors.endDate,
    },
    errorMessage: {
      name: errors?.name?.message || "",
      startDate: errors.startDate?.message || "",
      endDate: errors.endDate?.message || "",
    },
  };

  useEffect(() => {
    if (!semester) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    console.log({
      startDate: semester?.startDate,
      endDate: semester?.endDate,
    });
    reset({
      ...semester,
      startDate: semester?.startDate,
      endDate: semester?.endDate,
      programs: semester?.programs?.[0]?.id,
      courses: semester?.courses?.map((course) => course?.id),
      active: semester?.active ? "Active" : "In Active",
    });
  }, [semester, reset]);

  function onSubmit(data) {
    const newData = data;
    console.log({ newData });
    if (semester?.id) {
      newData.id = semester?.id;
    }
    dispatch(
      createSemester({
        ...newData,
        startDate: newData?.startDate,
        endDate: newData?.endDate,
        active: data?.active === "Active",
      })
    ).then((res) => {
      if (res) {
        props.navigate(`/academics/semesters`);
      }
    });
  }

  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such semester
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/academics/semesters"
          color="inherit"
        >
          Go to Semesters Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (semester &&
      +routeParams?.semesterId !== semester?.id &&
      routeParams.semesterId !== "add")
  ) {
    return <FuseLoading />;
  }

  return (
    <Paper className=" p-24 pb-10 sm:p-40 sm:pb-28 rounded-2xl h-full ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-16 max-w-3xl">
          <Controller
            name={fieldData.fieldName.name}
            control={control}
            render={({ field }) => (
              <MainTextField
                data={field}
                label="Semester"
                placeholder="Semester"
                id={fieldData?.fieldName?.name}
                errorName={!!fieldData.errorName.name}
                errorMessage={fieldData?.errorMessage?.name}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData.fieldName.startDate}
            render={({ field }) => (
              <MainDate
                data={field}
                label="Start Date"
                minDate={new Date()}
                id={fieldData?.fieldName?.startDate}
                errorName={!!fieldData.errorName.startDate}
                errorMessage={fieldData?.errorMessage?.startDate}
              />
            )}
          />
          <Controller
            control={control}
            name={fieldData.fieldName.endDate}
            render={({ field }) => (
              <MainDate
                data={field}
                label="End Date"
                minDate={new Date()}
                id={fieldData?.fieldName?.endDate}
                errorName={!!fieldData.errorName.endDate}
                errorMessage={fieldData?.errorMessage?.endDate}
              />
            )}
          />
          {/* <Controller
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
                }))}
                // options={programOptions}
                errorMessage={fieldData?.errorMessage?.programs}
              />
            )}
          />
          {courses?.map((course) => (
            <Controller
              control={control}
              name={`${course?.id}`}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    data={field}
                    // errorMessage={
                    //   fieldData?.errorMessage?.courses?.message
                    // }
                    label={course?.name}
                    id={course?.id}
                    checked={form?.courses?.includes(course?.id)}
                    handleChange={(e) => {
                      const checkedValues = form?.courses || [];

                      if (e.target.checked) {
                        setValue("courses", [...checkedValues, course?.id]);
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
          ))} */}
          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/academics/semesters")}
              type="button"
            >
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(SemesterAdd);
