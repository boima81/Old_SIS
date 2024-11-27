import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import _ from "@lodash";
import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { getProgram, selectProgram } from "app/store/studentSlice";
import MainTextField from "../../dashboards/Shared/TextField";
import { createCourse, getCourse, selectCourse } from "../store/courseSlice";
import MainSelect from "../../dashboards/Shared/Select";
import { selectSemesters, getSemesters } from "../store/semestersSlice";
import RadioButton from "../../dashboards/Shared/Radio";

import MainCheckBox from "../../dashboards/Shared/Checkbox";
import {
  getInstructors,
  selectInstructorData,
} from "../store/instructorsSlice";
import { getSections } from "../store/sectionsSlice";

function CoursesAdd(props) {
  const [noProduct, setNoProduct] = useState(false);
  const course = useSelector(selectCourse);
  const programs = useSelector(selectProgram);
  const semesters = useSelector(selectSemesters);
  const instructions = useSelector(selectInstructorData);
  const [sections, setSections] = useState([]);
  // useSelector(selectSections);

  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const { courseId } = routeParams;
  useDeepCompareEffect(() => {
    function updateProductState() {
      if (courseId === "add") {
        /**
         * Create New Product data
         */
        dispatch(getCourse());
      } else {
        /**
         * Get Product data
         */
        dispatch(getCourse(courseId)).then((action) => {
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
  }, [dispatch, courseId]);

  const defaultValues = {
    course_id: "",
    course_no: "",
    name: "",
    category: "",
    course_credit: "",
    program: course?.program || "",
    semester: [],
    sections: "",
    schedule: "",
    mon_wed_fri: false,
    tue_thu_sat: false,
    tue_thu: false,
    online: false,
    time: "",
    last_time: "",
    classroom: "",
    instructor: "",
    creditType: "",
    price: 0,
  };
  const schema = yup.object().shape({
    course_id: yup.string().required("Course Id is required"),
    course_no: yup
      .number()
      .min(1, "Course number should be more than 0")
      .required("Course number is required"),
    name: yup.string().required("Course Name is required"),
    category: yup.string().required("You must select a category"),
    // course_credit: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .required("Credit hours required"),
    creditType: yup.string().required("Credit type is required"),
    price: yup.number().when("creditType", {
      is: (val) => val && val == 2,
      then: yup
        .number()
        .required("Enter amount")
        .min(1, "Minimum price must be 1"),
      otherwise: yup.number().notRequired(),
    }),
    course_credit: yup
      .number()
      .transform((value, originalValue) => {
        if (originalValue === "") return null;
        const parsed = parseFloat(originalValue);
        return Number.isNaN(parsed) ? null : parsed;
      })
      .when("creditType", {
        is: (val) => val && val == 1,
        then: yup
          .number()
          .transform((value, originalValue) => {
            if (originalValue === "") return null;
            const parsed = parseFloat(originalValue);
            return Number.isNaN(parsed) ? null : parsed;
          })
          .typeError("Course hours must be a number")
          .required("Credit hours required"),
        otherwise: yup.number().nullable(),
      }),
    program: yup.number().required("Program is required"),
    semester: yup.array().of(yup.number()).required("Semester is required"),
    sections: yup.string().required("Section is required"),
    // time: yup.string().test("not empty", "Time is required", function (value) {
    //   return !!value;
    // }),
    // last_time: yup
    //   .string()
    //   .when("time", {
    //     is: (time) => {
    //       return !!time;
    //     },
    //     then: yup.string().min(yup.ref("time"), "Last Time can't before Time"),
    //   })
    //   .nullable(),

    classroom: yup.string().required("Classroom is required"),
    instructor: yup.string().required("Instructor is required"),


  });
  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    getValues,
    formState,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  const values = getValues();

  const fieldData = {
    fieldName: {
      course_id: "course_id",
      course_no: "course_no",
      name: "name",
      category: "category",
      course_credit: "course_credit",
      program: "program",
      semester: "semester",
      sections: "sections",
      mon_wed_fri: "mon_wed_fri",
      tue_thu_sat: "tue_thu_sat",
      tue_thu: "tue_thu",
      online: "online",
      time: "time",
      last_time: "last_time",
      classroom: "classroom",
      instructor: "instructor",
      creditType: "creditType",
      price: "price",
    },
    errorName: {
      course_id: !!errors.course_id,
      course_no: !!errors.course_no,
      name: !!errors.name,
      category: !!errors.category,
      course_credit: !!errors.course_credit,
      program: !!errors.program,
      semester: !!errors.semester,
      sections: !!errors.sections,
      mon_wed_fri: !!errors.mon_wed_fri,
      tue_thu_sat: !!errors.tue_thu_sat,
      tue_thu: !!errors.tue_thu,
      online: !!errors.online,
      time: !!errors.time,
      last_time: !!errors.last_time,
      classroom: !!errors.classroom,
      instructor: !!errors.instructor,
      creditType: !!errors.creditType,
      price: !!errors.price,
    },
    errorMessage: {
      course_id: errors?.course_id?.message || "",
      course_no: errors?.course_no?.message || "",
      name: errors?.name?.message || "",
      category: errors?.category?.message || "",
      course_credit: errors?.course_credit?.message || "",
      program: errors?.program?.message || "",
      semester: errors?.semester?.message || "",
      sections: errors?.sections?.message || "",
      mon_wed_fri: errors?.mon_wed_fri?.message || "",
      tue_thu_sat: errors?.tue_thu_sat?.message || "",
      tue_thu: errors?.tue_thu?.message || "",
      online: errors?.online?.message || "",
      time: errors?.time?.message || "",
      last_time: errors?.last_time?.message || "",
      classroom: errors?.classroom?.message || "",
      instructor: errors?.instructor?.message || "",
      creditType: errors?.creditType?.message || "",
      price: errors?.price?.message || "",
    },
    radioList: [
      {
        id: 1,
        value: "required",
        label: "Required",
      },
      {
        id: 2,
        value: "elective",
        label: "Elective",
      },
    ],
  };

  useEffect(() => {
    dispatch(getProgram());
    dispatch(getSemesters({}));
    dispatch(getInstructors());
    dispatch(getSections()).then((action) => {
      if (action?.payload) {
        setSections(action.payload);
      }
    });
  }, []);
  useEffect(() => {
    if (!course) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...course,
      active: course?.active ? "Active" : "In Active",
      semester: course?.semesters?.map((semester) => semester?.id) || [],
      program: course?.program,
      mon_wed_fri: course?.schedule?.mon_wed_fri || false,
      tue_thu_sat: course?.schedule?.tue_thu_sat || false,
      tue_thu: course?.schedule?.tue_thu || false,
      online: course?.schedule?.online || false,
      course_no: course?.course_no || undefined,
      time: course?.time || undefined,
      last_time: course?.last_time || undefined,
      creditType: course?.creditType || undefined,
      price: course?.price || undefined,
    });
  }, [course, reset]);

  function onSubmit(data) {
    const newData = data;
    if (course?.id) {
      newData.id = course?.id;
    }
    dispatch(
      createCourse({ ...newData, active: data?.active === "Active" })
    ).then((res) => {
      if (res?.payload?.id) {
        props.navigate(`/academics/courses`);
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
          There is no such course
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/avademic/coures"
          color="inherit"
        >
          Go to Courses Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (course &&
      +routeParams?.courseId !== course?.id &&
      routeParams.courseId !== "add")
  ) {
    return <FuseLoading />;
  }
  return (
    <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-32">
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.course_id}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course Id"
                  className="md:w-1/2"
                  placeholder="Course Id"
                  id={fieldData?.fieldName?.course_id}
                  errorName={!!fieldData.errorName.course_id}
                  errorMessage={fieldData?.errorMessage?.course_id}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.course_no}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course No."
                  className="md:w-1/2"
                  type="number"
                  placeholder="Course No."
                  id={fieldData?.fieldName?.course_no}
                  errorName={!!fieldData.errorName.course_no}
                  errorMessage={fieldData?.errorMessage?.course_no}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.name}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Courses"
                  className="md:w-1/2"
                  placeholder="Courses"
                  id={fieldData?.fieldName?.name}
                  errorName={!!fieldData.errorName.name}
                  errorMessage={fieldData?.errorMessage?.name}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.category}
              render={({ field }) => (
                <RadioButton
                  data={field}
                  radioGroupName="Course category"
                  radioList={fieldData?.radioList}
                  errorMessage={fieldData?.errorMessage?.category}
                />
              )}
            />
          </div>
          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.creditType}
              render={({ field }) => (
                <MainSelect
                  data={field}
                  id={fieldData?.fieldName?.creditType}
                  label="Select credit type"
                  className="md:w-1/2"
                  options={[
                    {
                      id: 1,
                      value: 1,
                      label: "Credit",
                    },
                    {
                      id: 2,
                      value: 2,
                      label: "Non-Credit",
                    },
                  ]}
                  errorMessage={fieldData?.errorMessage?.creditType}
                />
              )}
            />
          </div>
          {form.creditType == 2 ? (
            <>
              <div className="space-y-32">
                <Controller
                  name={fieldData.fieldName.price}
                  control={control}
                  render={({ field }) => (
                    <MainTextField
                      data={field}
                      label="Price"
                      type="number"
                      className="md:w-1/2"
                      placeholder="Price"
                      id={fieldData?.fieldName?.price}
                      errorName={!!fieldData.errorName.price}
                      errorMessage={fieldData?.errorMessage?.price}
                    />
                  )}
                />
              </div>
            </>
          ) : (
            <div className="space-y-32">
              <Controller
                name={fieldData.fieldName.course_credit}
                control={control}
                render={({ field }) => (
                  <MainTextField
                    data={field}
                    label="Credit per hours"
                    placeholder="Credit per hours"
                    className="md:w-1/2"
                    type="number"
                    id={fieldData?.fieldName?.course_credit}
                    errorName={!!fieldData.errorName.course_credit}
                    errorMessage={fieldData?.errorMessage?.course_credit}
                  />
                )}
              />
            </div>
          )}



          <div className="space-y-32 max-w-3xl">
            <div className="space-y-32">
              <Controller
                control={control}
                name={fieldData?.fieldName?.program}
                render={({ field }) => (
                  <MainSelect
                    data={field}
                    id={fieldData?.fieldName?.program}
                    label="Program"
                    className="md:w-1/2"
                    options={programs?.map((program) => ({
                      id: program?.id,
                      value: program?.id,
                      label: program?.name,
                    }))}
                    errorMessage={fieldData?.errorMessage?.program}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-32 max-w-3xl">
            <div className="space-y-32">
              <Controller
                control={control}
                name={fieldData?.fieldName?.semester}
                render={({ field }) => (
                  <MainSelect
                    multiple
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
            </div>
          </div>

          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.sections}
              render={({ field }) => (
                <MainSelect
                  data={field}
                  id={fieldData?.fieldName?.sections}
                  label="Sections"
                  className="md:w-1/2"
                  options={sections?.map?.((section) => ({
                    id: section?.id,
                    value: section?.id,
                    label: section?.sectionNumber,
                  }))}
                  errorMessage={fieldData?.errorMessage?.sections}
                />
              )}
            />
          </div>
          <div className="">
            <h2>Schedule</h2>
            <Controller
              control={control}
              name={fieldData?.fieldName?.mon_wed_fri}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.mon_wed_fri}
                    data={field}
                    handleChange={(e) => {
                      setValue("mon_wed_fri", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.mon_wed_fri}
                    label="M/W/F"
                    checked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.tue_thu_sat}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.tue_thu_sat}
                    data={field}
                    handleChange={(e) => {
                      setValue("tue_thu_sat", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.tue_thu_sat}
                    label="T/TH/S"
                    checked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.tue_thu}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.tue_thu}
                    data={field}
                    handleChange={(e) => {
                      setValue("tue_thu", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.tue_thu}
                    label="T/TH"
                    checked={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.online}
              render={({ field }) => (
                <>
                  <MainCheckBox
                    id={fieldData?.fieldName?.online}
                    data={field}
                    handleChange={(e) => {
                      setValue("online", e.target.checked);
                    }}
                    errorMessage={fieldData?.errorMessage?.online}
                    label="Online"
                    checked={field.value}
                  />
                </>
              )}
            />
          </div>

          <div className="space-y-16">
            <Controller
              name={fieldData.fieldName.time}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course Start time"
                  placeholder="Course Start time"
                  className="md:w-1/2"
                  type="time"
                  id={fieldData?.fieldName?.time}
                  errorName={!!fieldData.errorName.time}
                  errorMessage={fieldData?.errorMessage?.time}
                  format="HH"
                />
              )}
            />
          </div>
          <div className="space-y-16">
            <Controller
              name={fieldData.fieldName.last_time}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Course End Time"
                  placeholder="Course End Time"
                  className="md:w-1/2"
                  type="time"
                  id={fieldData?.fieldName?.last_time}
                  errorName={!!fieldData.errorName.last_time}
                  errorMessage={fieldData?.errorMessage?.last_time}
                  min={values?.time}
                />
              )}
            />
          </div>

          <div className="space-y-32">
            <Controller
              name={fieldData.fieldName.classroom}
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Classroom"
                  placeholder="Classroom"
                  className="md:w-1/2"
                  id={fieldData?.fieldName?.classroom}
                  errorName={!!fieldData.errorName.classroom}
                  errorMessage={fieldData?.errorMessage?.classroom}
                />
              )}
            />
          </div>

          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.instructor}
              render={({ field }) => (
                <MainSelect
                  data={field}
                  id={fieldData?.fieldName?.instructor}
                  label="Instructor"
                  className="md:w-1/2"
                  options={instructions?.map((instruction) => ({
                    id: instruction?.id,
                    value: instruction?.id,
                    label: instruction?.userInformationId?.displayName,
                  }))}
                  errorMessage={fieldData?.errorMessage?.instructor}
                />
              )}
            />
          </div>

          <div className="flex gap-14">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/academics/courses")}
              type="button"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(CoursesAdd);
